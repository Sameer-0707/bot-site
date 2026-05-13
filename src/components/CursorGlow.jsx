"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const moveGlow = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(glow, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-20"
      style={{
        background: "radial-gradient(circle, rgba(136, 187, 255, 0.1) 0%, rgba(255, 136, 204, 0.05) 30%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}
