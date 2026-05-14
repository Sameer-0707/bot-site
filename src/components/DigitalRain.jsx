"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DigitalRain({ intensity = 1.0 }) {
  const pointsRef = useRef();

  // Create a texture with numbers 0-9 in a row (1x10 grid)
  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024; 
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "bold 90px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    for (let i = 0; i < 10; i++) {
        ctx.fillText(i.toString(), 51.2 + i * 102.4, 64);
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, []);

  const count = 15000; // Extreme density for "infinity" effect
  
  const charIndices = useMemo(() => {
    const indices = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        indices[i] = Math.floor(Math.random() * 10);
    }
    return indices;
  }, [count]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;     // X (wider)
      pos[i * 3 + 1] = Math.random() * 80 - 40;    // Y (taller)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z (deeper)
    }
    return pos;
  }, [count]);

  const speeds = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < s.length; i++) {
      s[i] = 0.02 + Math.random() * 0.05; // Much slower base speed
    }
    return s;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const positions = posAttr.array;
    
    // Slow, steady speed multiplier even when hacking
    const speedMultiplier = intensity > 1.0 ? 1.5 : 1.0;

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= speeds[i] * speedMultiplier;
      if (positions[i * 3 + 1] < -40) {
        positions[i * 3 + 1] = 40;
        positions[i * 3] = (Math.random() - 0.5) * 80;
      }
    }
    posAttr.needsUpdate = true;
    
    // Update intensity uniform
    pointsRef.current.material.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      pointsRef.current.material.uniforms.uIntensity.value,
      intensity,
      0.05 // Slower transition for smoother theme change
    );
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uColor: { value: new THREE.Color("#88bbff") },
        uHackingColor: { value: new THREE.Color("#000000") }, // Black for light theme contrast
        uIntensity: { value: intensity },
        uTime: { value: 0 }
      },
      vertexShader: `
        attribute float charIndex;
        varying float vCharIndex;
        varying float vOpacity;
        uniform float uIntensity;
        
        void main() {
          vCharIndex = charIndex;
          // Increased base opacity for dark theme visibility
          vOpacity = 0.35 + (uIntensity - 1.0) * 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Slightly larger particles in dark theme
          gl_PointSize = (18.0 + (uIntensity - 1.0) * 20.0) * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec3 uColor;
        uniform vec3 uHackingColor;
        uniform float uIntensity;
        varying float vCharIndex;
        varying float vOpacity;
        
        void main() {
          vec2 uv = gl_PointCoord;
          uv.x = (uv.x + vCharIndex) / 10.0;
          
          vec4 texColor = texture2D(uTexture, uv);
          if (texColor.a < 0.1) discard;
          
          vec3 finalColor = mix(uColor, uHackingColor, clamp(uIntensity - 1.0, 0.0, 1.0));
          // Higher alpha for better visibility in both themes
          float alpha = texColor.a * (0.25 + clamp(uIntensity - 1.0, 0.0, 0.75));
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: intensity > 1.0 ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [texture, intensity > 1.0]); // Re-memoize when blending changes

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-charIndex"
          count={count}
          array={charIndices}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
}

