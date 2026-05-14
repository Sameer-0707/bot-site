(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/DigitalRain.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DigitalRain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function DigitalRain(param) {
    let { intensity = 1.0 } = param;
    _s();
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    // Create a texture with numbers 0-9 in a row (1x10 grid)
    const texture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DigitalRain.useMemo[texture]": ()=>{
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
            for(let i = 0; i < 10; i++){
                ctx.fillText(i.toString(), 51.2 + i * 102.4, 64);
            }
            const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            tex.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            tex.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            return tex;
        }
    }["DigitalRain.useMemo[texture]"], []);
    const count = 15000; // Extreme density for "infinity" effect
    const charIndices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DigitalRain.useMemo[charIndices]": ()=>{
            const indices = new Float32Array(count);
            for(let i = 0; i < count; i++){
                indices[i] = Math.floor(Math.random() * 10);
            }
            return indices;
        }
    }["DigitalRain.useMemo[charIndices]"], [
        count
    ]);
    const positions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DigitalRain.useMemo[positions]": ()=>{
            const pos = new Float32Array(count * 3);
            for(let i = 0; i < count; i++){
                pos[i * 3] = (Math.random() - 0.5) * 80; // X (wider)
                pos[i * 3 + 1] = Math.random() * 80 - 40; // Y (taller)
                pos[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z (deeper)
            }
            return pos;
        }
    }["DigitalRain.useMemo[positions]"], [
        count
    ]);
    const speeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DigitalRain.useMemo[speeds]": ()=>{
            const s = new Float32Array(count);
            for(let i = 0; i < s.length; i++){
                s[i] = 0.02 + Math.random() * 0.05; // Much slower base speed
            }
            return s;
        }
    }["DigitalRain.useMemo[speeds]"], [
        count
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "DigitalRain.useFrame": (state, delta)=>{
            if (!pointsRef.current) return;
            const posAttr = pointsRef.current.geometry.attributes.position;
            const positions = posAttr.array;
            // Slow, steady speed multiplier even when hacking
            const speedMultiplier = intensity > 1.0 ? 1.5 : 1.0;
            for(let i = 0; i < count; i++){
                positions[i * 3 + 1] -= speeds[i] * speedMultiplier;
                if (positions[i * 3 + 1] < -40) {
                    positions[i * 3 + 1] = 40;
                    positions[i * 3] = (Math.random() - 0.5) * 80;
                }
            }
            posAttr.needsUpdate = true;
            // Update intensity uniform
            pointsRef.current.material.uniforms.uIntensity.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(pointsRef.current.material.uniforms.uIntensity.value, intensity, 0.05 // Slower transition for smoother theme change
            );
        }
    }["DigitalRain.useFrame"]);
    const shaderMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DigitalRain.useMemo[shaderMaterial]": ()=>{
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                uniforms: {
                    uTexture: {
                        value: texture
                    },
                    uColor: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#88bbff")
                    },
                    uHackingColor: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#000000")
                    },
                    uIntensity: {
                        value: intensity
                    },
                    uTime: {
                        value: 0
                    }
                },
                vertexShader: "\n        attribute float charIndex;\n        varying float vCharIndex;\n        varying float vOpacity;\n        uniform float uIntensity;\n        \n        void main() {\n          vCharIndex = charIndex;\n          // Increased base opacity for dark theme visibility\n          vOpacity = 0.35 + (uIntensity - 1.0) * 0.5;\n          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n          // Slightly larger particles in dark theme\n          gl_PointSize = (18.0 + (uIntensity - 1.0) * 20.0) * (1.0 / -mvPosition.z);\n          gl_Position = projectionMatrix * mvPosition;\n        }\n      ",
                fragmentShader: "\n        uniform sampler2D uTexture;\n        uniform vec3 uColor;\n        uniform vec3 uHackingColor;\n        uniform float uIntensity;\n        varying float vCharIndex;\n        varying float vOpacity;\n        \n        void main() {\n          vec2 uv = gl_PointCoord;\n          uv.x = (uv.x + vCharIndex) / 10.0;\n          \n          vec4 texColor = texture2D(uTexture, uv);\n          if (texColor.a < 0.1) discard;\n          \n          vec3 finalColor = mix(uColor, uHackingColor, clamp(uIntensity - 1.0, 0.0, 1.0));\n          // Higher alpha for better visibility in both themes\n          float alpha = texColor.a * (0.25 + clamp(uIntensity - 1.0, 0.0, 0.75));\n          \n          gl_FragColor = vec4(finalColor, alpha);\n        }\n      ",
                transparent: true,
                blending: intensity > 1.0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NormalBlending"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false
            });
        }
    }["DigitalRain.useMemo[shaderMaterial]"], [
        texture,
        intensity > 1.0
    ]); // Re-memoize when blending changes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        material: shaderMaterial,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferGeometry", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                    attach: "attributes-position",
                    count: count,
                    array: positions,
                    itemSize: 3
                }, void 0, false, {
                    fileName: "[project]/src/components/DigitalRain.jsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                    attach: "attributes-charIndex",
                    count: count,
                    array: charIndices,
                    itemSize: 1
                }, void 0, false, {
                    fileName: "[project]/src/components/DigitalRain.jsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/DigitalRain.jsx",
            lineNumber: 141,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/DigitalRain.jsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s(DigitalRain, "+8LnNG5leMxFTfcXSB/fVLgE5XE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = DigitalRain;
var _c;
__turbopack_context__.k.register(_c, "DigitalRain");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DigitalRain.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/DigitalRain.jsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-client] (ecmascript) <export D as useFrame>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFrame",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["D"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_132af2d7._.js.map