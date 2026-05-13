"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DigitalRain() {
  const pointsRef = useRef();

  // Create a texture with numbers 0-9 in a row (1x10 grid)
  const texture = useMemo(() => {
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

  const count = 1200;
  
  // Custom attribute to store which character (0-9) each point uses
  const charIndices = useMemo(() => {
    const indices = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        indices[i] = Math.floor(Math.random() * 10);
    }
    return indices;
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;     // X
      pos[i * 3 + 1] = Math.random() * 20 - 10;    // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z
    }
    return pos;
  }, []);

  const speeds = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < s.length; i++) {
      s[i] = 0.01 + Math.random() * 0.04;
    }
    return s;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const positions = posAttr.array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= speeds[i];
      if (positions[i * 3 + 1] < -10) {
        positions[i * 3 + 1] = 10;
        positions[i * 3] = (Math.random() - 0.5) * 40;
      }
    }
    posAttr.needsUpdate = true;
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uColor: { value: new THREE.Color("#88bbff") },
        uOpacity: { value: 0.5 }
      },
      vertexShader: `
        attribute float charIndex;
        varying float vCharIndex;
        void main() {
          vCharIndex = charIndex;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 25.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vCharIndex;
        void main() {
          // gl_PointCoord goes from 0 to 1
          vec2 uv = gl_PointCoord;
          // Shift X based on charIndex (0-9)
          uv.x = (uv.x + vCharIndex) / 10.0;
          
          vec4 texColor = texture2D(uTexture, uv);
          if (texColor.a < 0.1) discard;
          
          gl_FragColor = vec4(uColor, texColor.a * uOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [texture]);

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

