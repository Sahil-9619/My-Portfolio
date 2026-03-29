"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionTemplate,
  useTransform,
  useSpring,
  MotionValue
} from "framer-motion";
import {
  Terminal, Database, LayoutTemplate, Menu, Globe, Clock, Zap,
  ArrowUpRight
} from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Pointer from "../components/Pointer";
import { useMouse } from "../hooks/useMouse";


type Props = {
  scrollProgress: MotionValue<number>;
};

export default function App({ scrollProgress }: Props) {


  const [clickHue, setClickHue] = useState(190);
  const [time, setTime] = useState("");
  const { mouseX, mouseY } = useMouse();

  const { scrollY, scrollYProgress } = useScroll();


  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);



  const cardX = useSpring(
    useTransform(mouseX, [0, 1000], [-20, 20]),
    { stiffness: 100, damping: 20 }
  );

  const cardY = useSpring(
    useTransform(mouseY, [0, 800], [-20, 20]),
    { stiffness: 100, damping: 20 }
  );

  // Scroll Progress Scale
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parallax / Scroll Logic

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const heroY = useTransform(scrollY, [0, 800], [0, 100]);

  // Reduced sensitivity tilt springs
  const heroRotateX = useSpring(0, { stiffness: 35, damping: 20 });
  const heroRotateY = useSpring(0, { stiffness: 35, damping: 20 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Divide by 0.5 to get percentage, then multiply by a smaller factor for low sensitivity
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;

    // Multipliers lowered from 20 to 12 for professional weight
    heroRotateY.set(xPct * 12);
    heroRotateX.set(yPct * -12);
  };

  const handleHeroMouseLeave = () => {
    heroRotateX.set(0);
    heroRotateY.set(0);
  };



  const bgGradient = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, hsla(${clickHue}, 70%, 50%, 0.1), transparent 80%)`;

  // Staggered Animation Variants for Bento Grid
  const bentoContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const bentoItem = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent-soft)] font-sans  will-change-scroll cursor-none">
      <Pointer />
      {/* --- NOISE TEXTURE OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

      {/* --- SCROLL PROGRESS BAR --- */}
      <motion.div

        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[var(--accent)] z-[999] origin-left"
        style={{ scaleX }}
      />


      {/* --- HERO SECTION --- */}
      <motion.section
        style={{

          opacity,

        }}

        className="sticky top-0 h-screen w-full flex items-center justify-center  bg-[var(--bg)] z-0 pt-24"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        onClick={() => setClickHue(prev => (prev + 45) % 360)}
      >
        {/* AMBIENT BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
          <motion.div className="absolute inset-0" style={{ background: bgGradient }} />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16 will-change-transform"
        >
          {/* LEFT: Name */}
          <div className="relative flex flex-col justify-center items-start group/name select-none">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="
text-[14vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase
bg-[linear-gradient(to_right,#ffffff,#ffffff)]
bg-clip-text text-transparent
transition-all duration-700

group-hover/name:bg-[linear-gradient(to_right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)]
group-hover/name:bg-[size:200%_auto]
group-hover/name:animate-[gradientMove_3s_linear_infinite]
"
              >
                SAHIL
              </motion.h1>
            </div>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden mt-2 h-[14vw] lg:h-[10vw] flex items-center"
            >
              <TextHoverEffect text="KUMAR" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
              className="mt-10 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-[1px] bg-[var(--accent)]" />
                <span className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold text-[var(--text-muted)]">
                  Full Stack Engineer • Creative Dev
                </span>
              </div>
              <p className="text-[var(--text-muted)] text-sm md:text-base font-light max-w-sm leading-relaxed">
                Merging architectural code with creative aesthetic flows to build high-impact digital solutions.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: BENTO GRID WITH LOADING STAGGER */}
          <motion.div
            style={{ rotateX: heroRotateX, rotateY: heroRotateY, x: cardX, y: cardY, transformStyle: "preserve-3d" }}
            variants={bentoContainer}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full grid grid-cols-2 grid-rows-3 gap-4 h-[500px] will-change-transform"
          >
            <motion.div variants={bentoItem} className="col-span-2 bg-[var(--text)]/5 border border-[var(--border)] rounded-3xl p-8 backdrop-blur-none flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--accent)]/10 rounded-full blur-2xl group-hover:bg-[var(--accent)]/20 transition-all" />
              <div className="flex justify-between items-start">
                <Zap className="text-[var(--accent)]" size={24} />
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Status</span>
              </div>
              <div>
                <h3 className="text-4xl font-black text-[var(--text)]">1 YEARS</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-widest">Of Engineering Excellence</p>
              </div>
            </motion.div>

            <motion.div variants={bentoItem} className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 backdrop-blur-none flex flex-col justify-between">
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Globe size={14} />
                <span className="text-[10px] uppercase font-bold tracking-tighter">Patna, India</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={12} className="text-cyan-400" />
                  <span className="text-2xl font-mono text-[var(--text)] tracking-tighter">{time}</span>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] font-medium">Local Time (GMT+5:30)</p>
              </div>
            </motion.div>

            <motion.div variants={bentoItem} className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-none flex flex-col justify-center items-center text-center group">
              <div className="relative mb-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
              </div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] group-hover:scale-110 transition-transform">Available</span>
            </motion.div>

            <motion.div variants={bentoItem} className="col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 flex items-center justify-between group hover:border-[var(--accent-soft)] transition-all">
              <div className="flex flex-col">
                <span className="text-5xl font-black text-[var(--text)] group-hover:text-[var(--accent)] transition-colors tracking-tighter">20+</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[var(--text-muted)]">Global Artifacts</span>
              </div>
              <div className="h-12 w-12 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--text)] group-hover:text-black transition-all">
                <ArrowUpRight size={20} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}