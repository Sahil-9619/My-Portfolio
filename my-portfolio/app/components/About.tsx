"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { easeInOut } from "framer-motion";
import { Github, Linkedin, Code2, ArrowUpRight } from "lucide-react";
import SocialLinks from "./SocialLinks";



export default function About() {


  return (
    <section
      id="about"
      style={{ isolation: "isolate" }}
      className="relative bg-transparent pt-28 md:pt-32 overflow-visible pr-4 sm:pr-6 md:pr-10 lg:pr-12 xl:pr-16 pl-0"
    >


      <div className="w-full max-w-[1500px] mx-auto space-y-8 md:space-y-10">
        {/* TOP SECTION: LABEL & HEADING */}
        <div className="flex flex-col items-center">
          {/* Label stays left */}
          <div className="w-full flex justify-start mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent)] animate-pulse ml-10" />
              <span className="text-xl font-mono uppercase tracking-[0.3em] text-[var(--accent)] opacity-80">
                KNOW ABOUT ME
              </span>
            </div>
          </div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-[var(--text)] text-center max-w-5xl"
          >
            Full Stack Developer <br />
            <span className="text-[var(--accent)] italic">
              & Problem Solver.
            </span>
          </motion.h2>
        </div>

        {/* BOTTOM SECTION: SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start pl-5 md:pl-10">
          {/* LEFT: Paragraphs */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7 lg:pr-16 space-y-6 text-base sm:text-lg md:text-xl leading-relaxed text-[var(--text-muted)] text-left"
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

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              <Stat label="Solved" value="500+" sub="LeetCode" />
              <Stat label="Experience" value="1+" sub="Years" />
              <Stat label="Projects" value="12+" sub="Completed" />
              <Stat label="Coffee" value="∞" sub="Cups" />
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

              <div className="mt-10 p-6 rounded-3xl bg-[var(--accent-soft)] border border-[var(--accent)]/20 mx-auto w-full max-w-[300px] lg:max-w-none text-center">
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Open for collaborations in high-scale React environments and Distributed Systems.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] cursor-pointer hover:underline underline-offset-4 transition-all">
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

function Stat({ label, value, sub }: any) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl md:rounded-3xl bg-[var(--bg-soft)] border border-[var(--border)] group hover:border-[var(--accent)] transition-all duration-500 hover:-translate-y-1">
      <p className="text-[10px] font-mono uppercase tracking-tighter mb-1 text-[var(--accent)] opacity-60">
        {label}
      </p>
      <div className="text-3xl font-black text-[var(--text)]">{value}</div>
      <p className="text-[10px] font-bold text-[var(--text-muted)]">{sub}</p>
    </div>
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