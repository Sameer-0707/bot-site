"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollTimeout = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        
        setIsScrolling(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      }
    });

    return () => st.kill();
  }, []);

  const updateScroll = (clientY) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let progress = (clientY - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));
    
    if (window.lenis) {
      window.lenis.scrollTo(progress * (document.documentElement.scrollHeight - window.innerHeight), {
        immediate: isDragging, // Instant jump when dragging
        duration: isDragging ? 0 : 1.2
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateScroll(e.clientY);
    
    const handleMouseMove = (moveEvent) => {
      updateScroll(moveEvent.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const getProgressColor = () => {
    const r = Math.round(136 + (255 - 136) * scrollProgress);
    const g = Math.round(187 + (136 - 187) * scrollProgress);
    const b = Math.round(255 + (204 - 255) * scrollProgress);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const currentColor = getProgressColor();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 h-[35vh] w-3 z-[100] flex flex-col items-center select-none">
      {/* Track Background - Draggable */}
      <div 
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className={`absolute inset-0 bg-white/5 rounded-full border border-white/10 w-full overflow-hidden backdrop-blur-[2px] cursor-pointer pointer-events-auto group hover:bg-white/10 transition-colors ${isDragging ? "bg-white/20" : ""}`}
      >
        {/* The Energy Fill Bar */}
        <div 
          className="absolute top-0 left-0 w-full rounded-full origin-top pointer-events-none"
          style={{ 
            height: `${scrollProgress * 100}%`,
            background: `linear-gradient(to bottom, ${currentColor}33, ${currentColor})`,
            boxShadow: (isScrolling || isDragging) ? `0 0 30px ${currentColor}` : `0 0 10px ${currentColor}`,
            transition: "box-shadow 0.3s ease" 
          }}
        >
            {/* The "Energy Light Head" */}
            <div 
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full transition-transform duration-200 ${(isScrolling || isDragging) ? "scale-125" : "scale-100"}`}
                style={{
                    backgroundColor: '#fff',
                    boxShadow: `0 0 20px 4px #fff, 0 0 40px 10px ${currentColor}`,
                }}
            >
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-70" />
            </div>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
        </div>
      </div>
      
      {/* Enhanced side energy sparks during scroll */}
      {(isScrolling || isDragging) && (
        <div 
          className="absolute w-full pointer-events-none"
          style={{ top: `${scrollProgress * 100}%` }}
        >
           <div className="absolute -right-4 w-1.5 h-6 bg-white/40 blur-[1.5px] animate-pulse" />
           <div className="absolute -left-4 w-1.5 h-6 bg-white/40 blur-[1.5px] animate-pulse" />
        </div>
      )}
    </div>
  );
}






