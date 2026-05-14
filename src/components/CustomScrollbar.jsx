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
    <div className="fixed right-4 top-1/2 -translate-y-1/2 h-[40vh] w-1.5 z-[100] flex flex-col items-center select-none">
      {/* Track Background - Draggable */}
      <div 
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className={`absolute inset-0 bg-white/5 rounded-full border border-white/5 w-full overflow-hidden backdrop-blur-[1px] cursor-pointer pointer-events-auto group hover:bg-white/10 transition-colors ${isDragging ? "bg-white/15" : ""}`}
      >
        {/* The Energy Fill Bar */}
        <div 
          className="absolute top-0 left-0 w-full rounded-full origin-top pointer-events-none"
          style={{ 
            height: `${scrollProgress * 100}%`,
            background: `linear-gradient(to bottom, ${currentColor}22, ${currentColor})`,
            boxShadow: (isScrolling || isDragging) ? `0 0 20px ${currentColor}` : `0 0 5px ${currentColor}`,
            transition: "box-shadow 0.3s ease" 
          }}
        >
            {/* The "Energy Light Head" */}
            <div 
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-transform duration-200 ${(isScrolling || isDragging) ? "scale-110" : "scale-100"}`}
                style={{
                    backgroundColor: '#fff',
                    boxShadow: `0 0 10px 2px #fff, 0 0 25px 6px ${currentColor}`,
                }}
            >
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
            </div>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30" />
        </div>
      </div>
      
      {/* Enhanced side energy sparks during scroll */}
      {(isScrolling || isDragging) && (
        <div 
          className="absolute w-full pointer-events-none"
          style={{ top: `${scrollProgress * 100}%` }}
        >
           <div className="absolute -right-2 w-1 h-4 bg-white/30 blur-[1px] animate-pulse" />
           <div className="absolute -left-2 w-1 h-4 bg-white/30 blur-[1px] animate-pulse" />
        </div>
      )}
    </div>
  );
}






