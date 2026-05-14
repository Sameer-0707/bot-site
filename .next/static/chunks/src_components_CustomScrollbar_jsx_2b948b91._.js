(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/CustomScrollbar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomScrollbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CustomScrollbar() {
    _s();
    const [scrollProgress, setScrollProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isScrolling, setIsScrolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const trackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomScrollbar.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
            const st = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                start: 0,
                end: "max",
                onUpdate: {
                    "CustomScrollbar.useEffect.st": (self)=>{
                        setScrollProgress(self.progress);
                        setIsScrolling(true);
                        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                        scrollTimeout.current = setTimeout({
                            "CustomScrollbar.useEffect.st": ()=>{
                                setIsScrolling(false);
                            }
                        }["CustomScrollbar.useEffect.st"], 150);
                    }
                }["CustomScrollbar.useEffect.st"]
            });
            return ({
                "CustomScrollbar.useEffect": ()=>st.kill()
            })["CustomScrollbar.useEffect"];
        }
    }["CustomScrollbar.useEffect"], []);
    const updateScroll = (clientY)=>{
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        let progress = (clientY - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));
        if (window.lenis) {
            window.lenis.scrollTo(progress * (document.documentElement.scrollHeight - window.innerHeight), {
                immediate: isDragging,
                duration: isDragging ? 0 : 1.2
            });
        }
    };
    const handleMouseDown = (e)=>{
        setIsDragging(true);
        updateScroll(e.clientY);
        const handleMouseMove = (moveEvent)=>{
            updateScroll(moveEvent.clientY);
        };
        const handleMouseUp = ()=>{
            setIsDragging(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };
    const getProgressColor = ()=>{
        const r = Math.round(136 + (255 - 136) * scrollProgress);
        const g = Math.round(187 + (136 - 187) * scrollProgress);
        const b = Math.round(255 + (204 - 255) * scrollProgress);
        return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
    };
    const currentColor = getProgressColor();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-4 top-1/2 -translate-y-1/2 h-[40vh] w-1.5 z-[100] flex flex-col items-center select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: trackRef,
                onMouseDown: handleMouseDown,
                className: "absolute inset-0 bg-white/5 rounded-full border border-white/5 w-full overflow-hidden backdrop-blur-[1px] cursor-pointer pointer-events-auto group hover:bg-white/10 transition-colors ".concat(isDragging ? "bg-white/15" : ""),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 left-0 w-full rounded-full origin-top pointer-events-none",
                    style: {
                        height: "".concat(scrollProgress * 100, "%"),
                        background: "linear-gradient(to bottom, ".concat(currentColor, "22, ").concat(currentColor, ")"),
                        boxShadow: isScrolling || isDragging ? "0 0 20px ".concat(currentColor) : "0 0 5px ".concat(currentColor),
                        transition: "box-shadow 0.3s ease"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-transform duration-200 ".concat(isScrolling || isDragging ? "scale-110" : "scale-100"),
                            style: {
                                backgroundColor: '#fff',
                                boxShadow: "0 0 10px 2px #fff, 0 0 25px 6px ".concat(currentColor)
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-white rounded-full animate-ping opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CustomScrollbar.jsx",
                                lineNumber: 101,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/CustomScrollbar.jsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CustomScrollbar.jsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CustomScrollbar.jsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CustomScrollbar.jsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            (isScrolling || isDragging) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute w-full pointer-events-none",
                style: {
                    top: "".concat(scrollProgress * 100, "%")
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -right-2 w-1 h-4 bg-white/30 blur-[1px] animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CustomScrollbar.jsx",
                        lineNumber: 114,
                        columnNumber: 12
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -left-2 w-1 h-4 bg-white/30 blur-[1px] animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CustomScrollbar.jsx",
                        lineNumber: 115,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CustomScrollbar.jsx",
                lineNumber: 110,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CustomScrollbar.jsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(CustomScrollbar, "cHb7ywtj+vGk1Oke5EUKiE6XSPk=");
_c = CustomScrollbar;
var _c;
__turbopack_context__.k.register(_c, "CustomScrollbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CustomScrollbar.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/CustomScrollbar.jsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_CustomScrollbar_jsx_2b948b91._.js.map