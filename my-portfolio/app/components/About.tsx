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
      className="relative bg-transparent pt-30 md:pt-5 overflow-visible px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16"
    >


      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 xl:gap-8 relative items-start">
        {/* MAIN CONTENT */}
        <motion.div

          className="lg:col-span-8 w-full max-w-[680px] mx-auto p-5 sm:p-7 md:p-10 xl:p-12 overflow-visible group relative"
        >
          <div className="flex flex-col h-full justify-between items-center text-center lg:items-start lg:text-left">
            <div className="space-y-6">

              <div className="flex items-center gap-2">
                <div className="w-2 h-2  bg-[var(--accent)] animate-pulse" />
                <span className="text-xl font-mono uppercase tracking-[0.3em] text-[var(--accent)] opacity-80">
                  KNOW ABOUT ME
                </span>
              </div>

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-[var(--text)]"
              >
                Full Stack Developer <br />
                <span className="text-[var(--accent)] italic">
                  & Problem Solver.
                </span>
              </motion.h2>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="max-w-4xl space-y-4 text-base sm:text-lg md:text-xl leading-relaxed text-[var(--text-muted)]"
              >
                <motion.p
                  variants={fadeUp}
                >
                  I am a passionate developer who enjoys building modern and scalable web applications. My journey in tech started with curiosity and has now evolved into a strong interest in full-stack development and problem solving.
                </motion.p>

                <motion.p
                  variants={fadeUp}
                >
                  Over time, I have worked on multiple projects that helped me understand real-world challenges and how to approach them efficiently. I focus on writing clean, maintainable code and creating user-friendly interfaces.
                </motion.p>

                <motion.p
                  variants={fadeUp}
                >
                  Apart from coding, I continuously explore new technologies and improve my skills. I believe in consistent learning and adapting to new trends in order to grow as a developer.
                </motion.p>
              </motion.div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Stat label="Solved" value="500+" sub="LeetCode" />
              <Stat label="Experience" value="1+" sub="Years" />
              <Stat label="Projects" value="12+" sub="Completed" />
              <Stat label="Coffee" value="∞" sub="Cups" />
            </div>
          </div>
        </motion.div>

        {/* LINKS */}
        <motion.div
          className="lg:col-span-4 w-full max-w-[420px] mx-auto flex flex-col gap-4 mt-6 lg:mt-0"
        >
          <div className="flex-1 rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-7 md:p-8 bg-transparent flex flex-col justify-between">


            <div className="space-y-3 mt-8">
              <SocialLinks />
            </div>

            <div className="mt-6 md:mt-8 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
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