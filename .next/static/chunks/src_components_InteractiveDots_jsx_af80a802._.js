(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/InteractiveDots.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const InteractiveDots = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s((param, ref)=>{
    let { isHacking = false } = param;
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const shocksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "InteractiveDots.useImperativeHandle": ()=>({
                triggerShock (x, y) {
                    let isBig = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                    createShock(x, y, isBig);
                }
            })
    }["InteractiveDots.useImperativeHandle"]);
    const createShock = function(x, y) {
        let isBig = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        const shock = {
            x,
            y,
            life: 1.0,
            isBig,
            arcs: Array.from({
                length: isBig ? 12 : 6
            }, ()=>({
                    angle: Math.random() * Math.PI * 2,
                    length: (isBig ? 100 : 30) + Math.random() * (isBig ? 250 : 50),
                    segments: isBig ? 8 : 4,
                    displacement: isBig ? 40 : 15
                }))
        };
        shocksRef.current.push(shock);
    };
    const drawLightning = (ctx, x1, y1, angle, length, segments, displacement, opacity)=>{
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        let curX = x1;
        let curY = y1;
        for(let i = 1; i <= segments; i++){
            const nextX = x1 + Math.cos(angle) * (length * (i / segments)) + (Math.random() - 0.5) * displacement;
            const nextY = y1 + Math.sin(angle) * (length * (i / segments)) + (Math.random() - 0.5) * displacement;
            ctx.lineTo(nextX, nextY);
            curX = nextX;
            curY = nextY;
        }
        // Change lightning color based on hacking
        const strokeColor = isHacking ? "rgba(0, 100, 255, ".concat(opacity, ")") : "rgba(136, 187, 255, ".concat(opacity, ")");
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2 * opacity;
        ctx.stroke();
        // Core white line
        ctx.strokeStyle = "rgba(255, 255, 255, ".concat(opacity * 0.8, ")");
        ctx.lineWidth = 0.5 * opacity;
        ctx.stroke();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InteractiveDots.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            let animationFrameId;
            const resize = {
                "InteractiveDots.useEffect.resize": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["InteractiveDots.useEffect.resize"];
            const handleMouseMove = {
                "InteractiveDots.useEffect.handleMouseMove": (e)=>{
                    mouseRef.current.x = e.clientX;
                    mouseRef.current.y = e.clientY;
                }
            }["InteractiveDots.useEffect.handleMouseMove"];
            const handleWindowClick = {
                "InteractiveDots.useEffect.handleWindowClick": (e)=>{
                    createShock(e.clientX, e.clientY, false);
                }
            }["InteractiveDots.useEffect.handleWindowClick"];
            window.addEventListener("resize", resize);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mousedown", handleWindowClick);
            resize();
            const dotSpacing = 35; // Slightly wider for cleaner look
            const dotRadius = 1.0;
            const proximityRadius = 180;
            const render = {
                "InteractiveDots.useEffect.render": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const columns = Math.ceil(canvas.width / dotSpacing);
                    const rows = Math.ceil(canvas.height / dotSpacing);
                    // Colors for theme
                    const baseDotColor = isHacking ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.15)";
                    const activeDotColor = isHacking ? "rgba(0, 100, 255, " : "rgba(136, 187, 255, ";
                    // 1. Draw Dots
                    ctx.shadowBlur = 0;
                    for(let i = 0; i <= columns; i++){
                        for(let j = 0; j <= rows; j++){
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
                                const shiftX = dx / distance * factor * -3;
                                const shiftY = dy / distance * factor * -3;
                                ctx.fillStyle = "".concat(activeDotColor).concat(opacity, ")");
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
                    shocksRef.current.forEach({
                        "InteractiveDots.useEffect.render": (shock, sIdx)=>{
                            ctx.save();
                            ctx.shadowBlur = isHacking ? 5 : 15;
                            ctx.shadowColor = isHacking ? "#0064ff" : "#88bbff";
                            shock.arcs.forEach({
                                "InteractiveDots.useEffect.render": (arc)=>{
                                    drawLightning(ctx, shock.x, shock.y, arc.angle, arc.length, arc.segments, arc.displacement, shock.life);
                                }
                            }["InteractiveDots.useEffect.render"]);
                            ctx.restore();
                            shock.life -= 0.05; // Fade out
                        }
                    }["InteractiveDots.useEffect.render"]);
                    shocksRef.current = shocksRef.current.filter({
                        "InteractiveDots.useEffect.render": (s)=>s.life > 0
                    }["InteractiveDots.useEffect.render"]);
                    animationFrameId = requestAnimationFrame(render);
                }
            }["InteractiveDots.useEffect.render"];
            render();
            return ({
                "InteractiveDots.useEffect": ()=>{
                    window.removeEventListener("resize", resize);
                    window.removeEventListener("mousemove", handleMouseMove);
                    window.removeEventListener("mousedown", handleWindowClick);
                    cancelAnimationFrame(animationFrameId);
                }
            })["InteractiveDots.useEffect"];
        }
    }["InteractiveDots.useEffect"], [
        isHacking
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "fixed top-0 left-0 w-full h-full pointer-events-none z-20",
        style: {
            mixBlendMode: isHacking ? "multiply" : "screen"
        }
    }, void 0, false, {
        fileName: "[project]/src/components/InteractiveDots.jsx",
        lineNumber: 160,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "9sMmfjHF5zMY1B0WKVPPopzZhWY=")), "9sMmfjHF5zMY1B0WKVPPopzZhWY=");
_c1 = InteractiveDots;
InteractiveDots.displayName = "InteractiveDots";
const __TURBOPACK__default__export__ = InteractiveDots;
var _c, _c1;
__turbopack_context__.k.register(_c, "InteractiveDots$forwardRef");
__turbopack_context__.k.register(_c1, "InteractiveDots");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/InteractiveDots.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/InteractiveDots.jsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_InteractiveDots_jsx_af80a802._.js.map