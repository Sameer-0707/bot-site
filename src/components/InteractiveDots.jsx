"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const InteractiveDots = forwardRef(({ isHacking = false }, ref) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shocksRef = useRef([]);

  useImperativeHandle(ref, () => ({
    triggerShock(x, y, isBig = false) {
      createShock(x, y, isBig);
    }
  }));

  const createShock = (x, y, isBig = false) => {
    const shock = {
      x, y,
      life: 1.0,
      isBig,
      arcs: Array.from({ length: isBig ? 12 : 6 }, () => ({
        angle: Math.random() * Math.PI * 2,
        length: (isBig ? 100 : 30) + Math.random() * (isBig ? 250 : 50),
        segments: isBig ? 8 : 4,
        displacement: isBig ? 40 : 15
      }))
    };
    shocksRef.current.push(shock);
  };

  const drawLightning = (ctx, x1, y1, angle, length, segments, displacement, opacity) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    let curX = x1;
    let curY = y1;
    
    for (let i = 1; i <= segments; i++) {
      const nextX = x1 + Math.cos(angle) * (length * (i / segments)) + (Math.random() - 0.5) * displacement;
      const nextY = y1 + Math.sin(angle) * (length * (i / segments)) + (Math.random() - 0.5) * displacement;
      ctx.lineTo(nextX, nextY);
      curX = nextX;
      curY = nextY;
    }
    
    // Change lightning color based on hacking
    const strokeColor = isHacking ? `rgba(0, 100, 255, ${opacity})` : `rgba(136, 187, 255, ${opacity})`;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2 * opacity;
    ctx.stroke();
    
    // Core white line
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
    ctx.lineWidth = 0.5 * opacity;
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleWindowClick = (e) => {
        createShock(e.clientX, e.clientY, false);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleWindowClick);
    resize();

    const dotSpacing = 35; // Slightly wider for cleaner look
    const dotRadius = 1.0;
    const proximityRadius = 180;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const columns = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      // Colors for theme
      const baseDotColor = isHacking ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.15)";
      const activeDotColor = isHacking ? "rgba(0, 100, 255, " : "rgba(136, 187, 255, ";

      // 1. Draw Dots
      ctx.shadowBlur = 0;
      for (let i = 0; i <= columns; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let currentRadius = dotRadius;
          
          if (distance < proximityRadius) {
            const factor = 1 - distance / proximityRadius;
            currentRadius = dotRadius + factor * 1.5;
            const opacity = isHacking ? 0.2 + factor * 0.5 : 0.15 + factor * 0.6;
            
            const shiftX = (dx / distance) * factor * -3;
            const shiftY = (dy / distance) * factor * -3;
            
            ctx.fillStyle = `${activeDotColor}${opacity})`;
            ctx.beginPath();
            ctx.arc(x + shiftX, y + shiftY, currentRadius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = baseDotColor;
            ctx.beginPath();
            ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Draw Shocks
      shocksRef.current.forEach((shock, sIdx) => {
        ctx.save();
        ctx.shadowBlur = isHacking ? 5 : 15;
        ctx.shadowColor = isHacking ? "#0064ff" : "#88bbff";
        
        shock.arcs.forEach(arc => {
            drawLightning(ctx, shock.x, shock.y, arc.angle, arc.length, arc.segments, arc.displacement, shock.life);
        });
        
        ctx.restore();
        shock.life -= 0.05; // Fade out
      });
      shocksRef.current = shocksRef.current.filter(s => s.life > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleWindowClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHacking]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-20"
      style={{ mixBlendMode: isHacking ? "multiply" : "screen" }}
    />
  );
});

InteractiveDots.displayName = "InteractiveDots";

export default InteractiveDots;

