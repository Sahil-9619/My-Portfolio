"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  className="relative z-[100] mt-20 bg-[var(--bg)] min-h-screen pt-20 overflow-hidden"
>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] blur-[120px] pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,var(--accent)_0,transparent_70%)]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

        {/* MAIN CONTENT */}
        <motion.div 
          style={{ y: mainY,  }}
          className="lg:col-span-8  p-8 md:p-12 bg-[var(--card)] backdrop-blur-none overflow-hidden group relative"
        >{/* Custom Borders */}
<div className="pointer-events-none absolute inset-0 rounded-[2.5rem]">
  
  {/* Bottom Border (FULL) */}
  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--border)]" />

  {/* Left Border (GRADIENT) */}
  <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-soft)] to-[var(--accent)]" />

  {/* Right Border (GRADIENT) */}
  <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-soft)] to-[var(--accent)]" />

</div>
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-6">

              <div className="flex items-center gap-2">
                <div className="w-2 h-2  bg-[var(--accent)] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] opacity-80">
                  Identity.System
                </span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text)]">
                Software Engineer <br/>
                <span className="text-[var(--accent)] italic">& Problem Solver.</span>
              </h2>

              <p className="max-w-xl text-lg md:text-xl leading-relaxed text-[var(--text-muted)]">
                Hey, I'm <span className="font-semibold italic text-[var(--accent)]">Sahil Kumar</span>. I build robust digital architectures that bridge the gap between human intuition and machine efficiency. Currently specializing in full-stack ecosystems.
              </p>
            </div>

            <div className="mt- grid grid-cols-2 md:grid-cols-4 gap-4">
               <Stat label="Solved" value="500+" sub="LeetCode" />
               <Stat label="Experience" value="1+" sub="Years" />
               <Stat label="Projects" value="12+" sub="Completed" />
               <Stat label="Coffee" value="∞" sub="Cups" />
            </div>
          </div>
        </motion.div>

        {/* LINKS */}
        <motion.div 
          style={{ y: secondaryY,}}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <div className="flex-1 rounded-[2.5rem] p-8 border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
             <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--accent)] opacity-60">
               Global_Reach
             </h3>
             
             <div className="space-y-3 mt-8">
  <SocialLinks />
</div>

             <div className="mt-8 p-6 rounded-3xl bg-[var(--bg-soft)] border border-[var(--border)]">
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Open for collaborations in high-scale React environments and Distributed Systems.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] cursor-pointer hover:underline underline-offset-4 transition-all">
                  Contact Me <ArrowUpRight size={14} />
                </div>
             </div>
          </div>
        </motion.div>

        {/* SKILLS */}
        <motion.div 
          style={{ y: secondaryY,}}
          className="lg:col-span-12 rounded-[2.5rem] p-8 md:p-12 border border-[var(--border)] bg-[var(--card)]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-bold text-[var(--text)]">Tech Stack</h4>
              <p className="text-[var(--text-muted)]">The tools I use to bring ideas to life.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {['TypeScript', 'React', 'Next.js', 'Node.js', 'Framer Motion', 'Tailwind', 'Postgres', 'Docker'].map((skill) => (
                <span key={skill} className="px-6 py-2 rounded-full text-sm font-bold border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--accent)] hover:scale-110 transition-transform cursor-default shadow-lg shadow-black/20">
                  {skill}
                </span>
              ))}
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

function BentoLink({ href, icon, label }: any) {
  return (
    <a 
      href={href} 
      className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] hover:scale-[1.05] hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
          {icon}
        </div>
        <span className="font-bold text-sm text-[var(--text)] group-hover:translate-x-1 transition-transform">
          {label}
        </span>
      </div>
      <ArrowUpRight size={18} className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}