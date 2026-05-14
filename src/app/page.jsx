"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { MoveRight, Sparkles, Zap, Shield, Globe, Menu, X } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });
const InteractiveDots = dynamic(() => import("@/components/InteractiveDots"), { ssr: false });
const CustomScrollbar = dynamic(() => import("@/components/CustomScrollbar"), { ssr: false });
const DigitalRain = dynamic(() => import("@/components/DigitalRain"), { ssr: false });


gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [currentAction, setCurrentAction] = useState({ value: "idle", type: "gltf" });
  const [entered, setEntered] = useState(false);
  const [introAnimating, setIntroAnimating] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isHacking, setIsHacking] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const characterGroupRef = useRef();
  const mainContentRef = useRef();
  const introScreenRef = useRef();
  const dotsRef = useRef();


  // Initialize smooth scrolling
  useEffect(() => {
    if (!entered) return;

    const lenis = new Lenis({
      duration: 2.0, 
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.lenis = lenis;

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, [entered]);

  // Handle Entrance Animation
  const handleEnter = () => {
    if (introAnimating || entered) return;
    setIntroAnimating(true);

    setCurrentAction({ value: "run", type: "gltf" });

    if (dotsRef.current) {
        dotsRef.current.triggerShock(window.innerWidth / 2, window.innerHeight / 2, true);
    }

    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentAction({ value: "idle", type: "gltf" });
        setEntered(true);
      }
    });

    tl.to(introScreenRef.current, {
      opacity: 0,
      duration: 0.8,
      pointerEvents: "none",
      ease: "power2.out"
    }, 0);

    // Dynamic positioning based on screen size
    gsap.set(characterGroupRef.current.position, { x: isMobile ? 0 : -2.0, y: -1.0, z: isMobile ? -1 : 0 });

    tl.to(characterGroupRef.current.position, {
      x: isMobile ? 0 : 1.5,
      z: isMobile ? 1.5 : 0,
      duration: 2.5,
      ease: "power1.inOut"
    }, 0);

    tl.to(characterGroupRef.current.rotation, {
      y: isMobile ? 0 : -0.5,
      duration: 0.8,
      ease: "power2.inOut"
    }, 1.7);

    tl.to(mainContentRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.5,
      ease: "power3.inOut"
    }, 1.5);
  };

  // Setup Scroll Animations
  useEffect(() => {
    if (!entered || !characterGroupRef.current) return;

    const isMobile = window.innerWidth < 768;

    // Section 2: Features
    ScrollTrigger.create({
      trigger: "#section-features",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onEnter: () => setCurrentAction({ value: "run", type: "gltf" }),
      onLeaveBack: () => setCurrentAction({ value: "idle", type: "gltf" }),
      animation: gsap.fromTo(characterGroupRef.current.position,
        { x: isMobile ? 0 : 1.5, y: -1.0, z: isMobile ? 1.5 : 0 },
        { x: isMobile ? 0 : -1.5, y: -1.0, z: isMobile ? 0 : 0, ease: "power1.inOut" }
      )
    });

    ScrollTrigger.create({
      trigger: "#section-features",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      animation: gsap.fromTo(characterGroupRef.current.rotation,
        { y: isMobile ? 0 : -0.5 },
        { y: isMobile ? 0 : -1.5, ease: "power1.inOut" }
      )
    });

    // Section 3: Performance
    ScrollTrigger.create({
      trigger: "#section-performance",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      animation: gsap.fromTo(characterGroupRef.current.position,
        { x: isMobile ? 0 : -1.5, y: -1.0, z: isMobile ? 0 : 0 },
        { x: isMobile ? 0 : 1.5, y: -1.0, z: isMobile ? 1.5 : 0, ease: "power1.inOut" }
      )
    });

    ScrollTrigger.create({
      trigger: "#section-performance",
      start: "top bottom",
      end: "top center",
      scrub: 1,
      animation: gsap.fromTo(characterGroupRef.current.rotation,
        { y: isMobile ? 0 : -1.5 },
        { y: isMobile ? 0 : 1.5, ease: "power1.inOut" }
      )
    });

    ScrollTrigger.create({
      trigger: "#section-performance",
      start: "top center",
      end: "top top",
      scrub: 1,
      animation: gsap.fromTo(characterGroupRef.current.rotation,
        { y: isMobile ? 0 : 1.5 },
        { y: isMobile ? 0 : -0.5, ease: "power1.inOut" }
      )
    });

    ScrollTrigger.create({
      trigger: "#section-performance",
      start: "top center",
      onEnter: () => setCurrentAction({ value: "/ShakingHands.fbx", type: "fbx" }),
      onLeaveBack: () => setCurrentAction({ value: "run", type: "gltf" }),
    });

    // Section 4: Footer
    ScrollTrigger.create({
      trigger: "#section-footer",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      animation: gsap.fromTo(characterGroupRef.current.position,
        { x: isMobile ? 0 : 1.5, y: -1.0, z: isMobile ? 1.5 : 0 },
        { x: 0, y: -1.0, z: 1.5, ease: "power1.inOut" }
      )
    });

    ScrollTrigger.create({
      trigger: "#section-footer",
      start: "top bottom",
      end: "top center",
      scrub: 1,
      animation: gsap.fromTo(characterGroupRef.current.rotation,
        { y: isMobile ? 0 : -0.5 },
        { y: isMobile ? 0 : -1.5, ease: "power1.inOut" }
      )
    });

    ScrollTrigger.create({
      trigger: "#section-footer",
      start: "top center",
      end: "top top",
      scrub: 1,
      animation: gsap.fromTo(characterGroupRef.current.rotation,
        { y: isMobile ? 0 : -1.5 },
        { y: 0, ease: "power1.inOut" }
      )
    });

    ScrollTrigger.create({
      trigger: "#section-footer",
      start: "top center",
      onEnter: () => setCurrentAction({ value: "/ShakingHands.fbx", type: "fbx" }),
      onLeaveBack: () => setCurrentAction({ value: "/ShakingHands.fbx", type: "fbx" }),
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [entered]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const toggleHack = () => {
    setIsHacking(!isHacking);
  };

  const navLinks = [
    { name: "Home", href: "#section-hero" },
    { name: "Features", href: "#section-features" },
    { name: "Performance", href: "#section-performance" },
  ];

  return (
    <div className={`relative w-full min-h-screen text-white overflow-x-hidden ${!entered ? "h-screen overflow-hidden" : ""} ${isHacking ? "hacking-active" : ""}`}>
      <div className="bg-mesh"></div>
      <div className="bg-noise"></div>
      <InteractiveDots ref={dotsRef} isHacking={isHacking} />
      <CursorGlow />
      {entered && <CustomScrollbar />}

      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0.5, 4.5], fov: typeof window !== "undefined" && window.innerWidth < 768 ? 65 : 50 }}>
          <Scene action={currentAction} characterRef={characterGroupRef} isHacking={isHacking} />
          {entered && <DigitalRain intensity={isHacking ? 2.5 : 1.0} />}
        </Canvas>
      </div>

      {/* Intro Screen */}
      {!entered && (
        <div
          ref={introScreenRef}
          className="absolute inset-0 z-50 flex items-center justify-center md:justify-end px-6 md:px-20 bg-gradient-to-b md:bg-gradient-to-l from-black via-black/80 to-transparent"
        >
          <div className="max-w-2xl text-center md:text-right flex flex-col items-center md:items-end">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white to-[#88bbff]">
              Welcome to the Future
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Experience the next generation of interactive web design. A fully scroll-driven 3D journey awaits.
            </p>
            <button
              onClick={handleEnter}
              className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-full overflow-hidden transition-transform hover:scale-105 cursor-pointer pointer-events-auto"
            >
              <span className="relative z-10">Enter Experience</span>
              <MoveRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#88bbff] to-[#ff88cc] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      )}

      {/* Main Website Content */}
      <div
        ref={mainContentRef}
        className="relative z-10 w-full pointer-events-auto"
        style={{ clipPath: "circle(0% at 50% 50%)" }} 
      >
        {/* Header */}
        <header className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 mix-blend-difference">
          <div className="text-xl md:text-2xl font-black uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-5 h-5 md:w-6 h-6 text-[#ff88cc]" />
            DEXTER<span className="text-[#88bbff]">HACK</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 font-semibold tracking-wide uppercase text-sm items-center">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-[#88bbff] transition-colors cursor-pointer">{link.name}</a>
            ))}
            <button 
              onClick={toggleHack}
              className={`px-4 py-2 border-2 rounded-lg font-black transition-all duration-300 ${isHacking ? "bg-green-500 border-green-500 text-black scale-110" : "bg-transparent border-[#ff88cc] text-[#ff88cc] hover:bg-[#ff88cc] hover:text-black"}`}
            >
              {isHacking ? "HACKING..." : "ACTIVATE HACK"}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 bg-black transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden flex flex-col items-center justify-center gap-8`}>
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-black uppercase tracking-tighter hover:text-[#88bbff] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => { toggleHack(); setIsMenuOpen(false); }}
            className={`px-8 py-4 border-2 rounded-lg font-black transition-all duration-300 ${isHacking ? "bg-green-500 border-green-500 text-black scale-110" : "bg-transparent border-[#ff88cc] text-[#ff88cc]"}`}
          >
            {isHacking ? "HACKING..." : "ACTIVATE HACK"}
          </button>
        </div>

        {/* Hero Section */}
        <section id="section-hero" className="w-full h-screen flex items-center justify-center md:justify-start px-6 md:px-20 relative">
          <div className="max-w-2xl mt-20 text-center md:text-left">
            <h2 className="text-5xl md:text-[5rem] leading-[0.9] font-black uppercase tracking-tighter mb-6">
              Interactive <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#88bbff] to-[#ff88cc]">3D Web</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-md border-l-0 md:border-l-4 border-[#88bbff] md:pl-6 mx-auto md:mx-0">
              Scroll down to explore the immersive 3D world. Watch as the character reacts and moves seamlessly through the environment.
            </p>
          </div>

          <div className="absolute bottom-10 left-1/2 md:left-20 -translate-x-1/2 md:translate-x-0 animate-bounce flex flex-col items-center gap-2 text-gray-400 font-semibold tracking-widest uppercase text-xs">
            Scroll to Explore
            <div className="w-[2px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="section-features" className="w-full h-screen flex items-center justify-center md:justify-end px-6 md:px-20 relative bg-gradient-to-b from-transparent to-black/50">
          <div className="max-w-xl text-center md:text-right">
            <div className="flex justify-center md:justify-end mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Sparkles className="w-8 h-8 text-[#ff88cc]" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Dynamic <br /> Responses
            </h2>
            <div className="flex flex-col gap-6 mx-auto md:ml-auto max-w-md">
              <p className="text-lg md:text-xl text-gray-300 border-r-0 md:border-r-4 border-[#ff88cc] md:pr-6">
                Our advanced neural processing unit allows for real-time skeletal adaptation. Watch as the X-1 model transitions between complex locomotion states with zero latency.
              </p>
              <div className="flex justify-center md:justify-end gap-4">
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-2xl md:text-3xl font-black text-[#ff88cc]">0.02ms</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500">Latency</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10"></div>
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-2xl md:text-3xl font-black text-[#ff88cc]">120Hz</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500">Refresh</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section id="section-performance" className="w-full h-screen flex items-center justify-center md:justify-start px-6 md:px-20 relative">
          <div className="max-w-xl text-center md:text-left">
            <div className="mb-6 flex justify-center md:justify-start">
              <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Shield className="w-8 h-8 text-[#88bbff]" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Highly <br /> Optimized
            </h2>
            <p className="text-lg md:text-xl text-gray-300 border-l-0 md:border-l-4 border-[#88bbff] md:pl-6">
              Built with Next.js, React Three Fiber, and Lenis. We ensure smooth 60fps animations by offloading heavy lifting and employing intelligent rendering strategies.
            </p>
          </div>
        </section>

        {/* Footer Section */}
        <section id="section-footer" className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 relative bg-gradient-to-t from-[#0a0f1e] to-transparent overflow-hidden">
          {/* Left Content */}
          <div className="z-10 max-w-md text-center md:text-left mb-12 md:mb-0">
            <Globe className="w-12 h-12 md:w-16 h-16 text-[#88bbff] mb-6 md:mb-8 mx-auto md:mx-0" />
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 md:mb-8">
              Ready to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#88bbff] to-[#ff88cc]">Build?</span>
            </h2>
            <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform cursor-pointer">
              Get Started Now
            </button>
          </div>

          {/* Center Space for Robot (Hidden on very small mobile if needed, or just let it exist) */}
          <div className="flex-1 md:block"></div>

          {/* Right Content */}
          <div className="z-10 max-w-md text-center md:text-right flex flex-col items-center md:items-end">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-gray-300">
              Join the <br /> Revolution
            </h3>
            <p className="text-base md:text-lg text-gray-400 mb-8 border-r-0 md:border-r-4 border-[#ff88cc] md:pr-6">
              Subscribe to our newsletter for the latest updates on interactive 3D web technologies and next-generation frameworks.
            </p>
            {subscribed ? (
              <div className="px-8 py-4 bg-green-500/20 border border-green-500/50 rounded-2xl text-green-400 font-bold animate-pulse">
                WELCOME TO THE REVOLUTION!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white outline-none focus:border-[#ff88cc] transition-colors flex-1"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#ff88cc] text-black font-bold rounded-full uppercase text-sm hover:scale-105 transition-transform active:scale-95 whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 font-medium text-[10px] md:text-xs tracking-widest uppercase w-full text-center">
            © 2026 DexterHack. All rights reserved.
          </div>
        </section>

      </div>
    </div>
  );
}
