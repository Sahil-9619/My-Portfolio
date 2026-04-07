"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { easeInOut } from "framer-motion";
import { Github, Linkedin, Code2, ArrowUpRight } from "lucide-react";
import SocialLinks from "./SocialLinks";



export default function About() {

  const { scrollYProgress } = useScroll();
  const mainY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const secondaryY = useTransform(scrollYProgress, [0, 0.3], [120, 0]);


  return (
    <section
      id="about"
      style={{ isolation: "isolate" }}
      className="relative bg-transparent min-h-screen pt-20 overflow-visible m-30"
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none opacity-30 mt-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

        {/* MAIN CONTENT */}
        <motion.div
          style={{ y: mainY, }}
          className="lg:col-span-8 p-8 md:p-12  overflow-visible group relative"
        >
          <div className="flex flex-col h-full justify-between">
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
                className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text)]"
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
                className="max-w-4xl space-y-4 text-lg md:text-xl leading-relaxed text-[var(--text-muted)]"
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

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Solved" value="500+" sub="LeetCode" />
              <Stat label="Experience" value="1+" sub="Years" />
              <Stat label="Projects" value="12+" sub="Completed" />
              <Stat label="Coffee" value="∞" sub="Cups" />
            </div>
          </div>
        </motion.div>

        {/* LINKS */}
        <motion.div
          style={{ y: secondaryY, }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <div className="flex-1 rounded-[2.5rem] p-8 bg-transparent   flex flex-col justify-between">


            <div className="space-y-3 mt-8">
              <SocialLinks />
            </div>

            <div className="mt-8 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
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
    <div className="p-5 rounded-3xl bg-[var(--bg-soft)] border border-[var(--border)] group hover:border-[var(--accent)] transition-all duration-500 hover:-translate-y-1">
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