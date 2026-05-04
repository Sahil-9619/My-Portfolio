"use client";

import React from "react";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { GlowingEffect } from "../../components/ui/glowing-effect";
import { useMouse } from "../hooks/useMouse";
import { useSpring, useTransform } from "framer-motion";



export default function About() {
  const { mouseX, mouseY } = useMouse();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const cardX = useSpring(
    useTransform(mouseX, [0, 1000], [-10, 10]),
    { stiffness: 100, damping: 20 }
  );

  const cardY = useSpring(
    useTransform(mouseY, [0, 800], [-10, 10]),
    { stiffness: 100, damping: 20 }
  );

  return (
    <section
      id="about"
      style={{ isolation: "isolate" }}
      className="relative bg-transparent pt-16 md:pt-24 overflow-visible pr-4 sm:pr-6 md:pr-10 lg:pr-12 xl:pr-16 pl-0"
    >


      <div className="w-full max-w-[1500px] mx-auto space-y-6 md:space-y-8">
        {/* TOP SECTION: LABEL & HEADING */}
        <div className="flex flex-col items-center">
          {/* Label stays left */}
          <div className="w-full flex justify-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse ml-10" />
              <span className="text-base font-mono uppercase tracking-[0.3em] text-[var(--accent)] opacity-80">
                KNOW ABOUT ME
              </span>
            </div>
          </div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight leading-tight text-[var(--text)] text-center max-w-4xl"
          >
            Full Stack Developer <br />
            <span className="text-[var(--accent)] italic">
              & Problem Solver.
            </span>
          </motion.h2>
        </div>

        {/* BOTTOM SECTION: SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start pl-5 md:pl-10">
          {/* LEFT: Paragraphs */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7 lg:pr-16 space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[var(--text-muted)] text-left"
          >
            <motion.p variants={fadeUp}>
              I am a passionate developer who enjoys building modern and scalable web applications. My journey in tech started with curiosity and has now evolved into a strong interest in full-stack development and problem solving.
            </motion.p>

            <motion.p variants={fadeUp}>
              Over time, I have worked on multiple projects that helped me understand real-world challenges and how to approach them efficiently. I focus on writing clean, maintainable code and creating user-friendly interfaces.
            </motion.p>

            <motion.p variants={fadeUp}>
              Apart from coding, I continuously explore new technologies and improve my skills. I believe in consistent learning and adapting to new trends in order to grow as a developer.
            </motion.p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              <Stat label="Solved" value="100+" sub="LeetCode" cardX={cardX} cardY={cardY} isMobile={isMobile} />
              <Stat label="Experience" value="1+" sub="Years" cardX={cardX} cardY={cardY} isMobile={isMobile} />
              <Stat label="Projects" value="10+" sub="Completed" cardX={cardX} cardY={cardY} isMobile={isMobile} />
              <Stat label="Coffee" value="∞" sub="Cups" cardX={cardX} cardY={cardY} isMobile={isMobile} />
            </div>
          </motion.div>

          {/* RIGHT: Icons / Social Links */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="rounded-[2.5rem]">
              <div className="">
                <SocialLinks />
              </div>

              <div className="mt-8 p-4 rounded-3xl bg-[var(--accent-soft)] border border-[var(--accent)]/20 mx-auto w-full max-w-[300px] lg:max-w-none text-center">
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Open for collaborations in high-scale React environments and Distributed Systems.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[var(--accent)] cursor-pointer hover:underline underline-offset-4 transition-all">
                  Contact Me <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- COMPONENTS ---------- */

function Stat({ label, value, sub, cardX, cardY, isMobile }: any) {
  return (
    <motion.div
      style={{
        x: isMobile ? 0 : cardX,
        y: isMobile ? 0 : cardY,
      }}
      className="relative h-full rounded-2xl border border-[var(--border)] p-1 md:rounded-3xl md:p-1.5 group transition-all duration-500 hover:-translate-y-1"
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative z-10 flex flex-col h-full p-3 sm:p-4 rounded-xl bg-transparent overflow-hidden">
        <p className="text-[10px] font-mono uppercase tracking-tighter mb-1 text-[var(--accent)] opacity-60">
          {label}
        </p>
        <div className="text-xl md:text-2xl font-black text-[var(--text)]">{value}</div>
        <p className="text-[10px] font-bold text-[var(--text-muted)]">{sub}</p>
      </div>
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.5,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeInOut },
  },
};