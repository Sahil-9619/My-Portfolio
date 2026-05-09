"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar, Activity, Code2, Layers, Cpu, ShieldCheck, ChevronRight } from "lucide-react";

const EXPERIENCES = [
  {
    id: "01",
    company: "Startup Web Support",
    logo: "/sws.png",
    role: "Full Stack Developer",
    period: "FEB 2026 / ONGOING",
    location: "Patna, Bihar",
    description: "Developing and optimizing responsive web applications for live client projects in a fast-paced startup environment. Focusing on seamless delivery and API performance.",
    metrics: ["API Performance Optimization", "Client-Side Architecture", "Multi-Device Responsiveness"],
    tech: ["React", "Next.js", "Node.js", "Express"],
    accent: "var(--accent)"
  },
  {
    id: "02",
    company: "Google",
    logo: "/google.png",
    role: "Student Ambassador",
    period: "SEP 2025 / DEC 2025",
    location: "Campus Level",
    description: "Representing Google initiatives at the campus level. Spearheading community growth through workshops and hands-on guidance with emerging AI technologies.",
    metrics: ["Conducted AI Workshops", "Google Gemini Advocacy", "Peer Mentorship"],
    tech: ["Gemini AI", "AI Tools", "Public Speaking", "Community"],
    accent: "#4285F4"
  },
  {
    id: "03",
    company: "i1i Industry",
    logo: "/i2i.png",
    role: "Web Developer Intern",
    period: "JULY 2025 / JULY 2025",
    location: "Remote",
    description: "Led a small team of developers during a MERN stack project focused on user interaction and intelligent automation.",
    metrics: ["Led MERN Project Team", "AI Chatbot Integration", "Full-Stack Development"],
    tech: ["MongoDB", "Express", "React", "Node.js"],
    accent: "#47A248"
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="relative min-h-[80vh] pt-16 md:pt-0 pb-10 pb-0 px-6 md:px-12 lg:px-2 selection:bg-[var(--accent)] selection:text-black">

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Matching About Section Header Style */}
        <div className="w-full flex justify-start mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse" />
            <span className="text-base font-mono uppercase tracking-[0.3em] text-[var(--accent)] opacity-80">
              EXPERIENCES
            </span>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Side: Company List */}
          <div className="lg:col-span-4 relative">
            {/* Dynamic Background Logo for the list */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] select-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={EXPERIENCES[activeIndex].logo}
                  className="w-full h-full object-contain filter grayscale invert brightness-0 dark:invert-0 dark:brightness-100"
                />
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
            {EXPERIENCES.map((exp, index) => (
              <button
                key={exp.id}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(index)}
                className={`w-full group relative p-5 border transition-all duration-500 text-left rounded-xl overflow-hidden ${activeIndex === index ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)]' : 'border-white/5 hover:border-[var(--accent)]/50 bg-white/5'}`}
              >
                {/* Shining Border Effect on Hover - Strictly conditional */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-30"
                      style={{ background: `conic-gradient(from 0deg, transparent, ${exp.accent}, transparent)` }}
                    />
                  </div>
                )}

                {/* Active Indicator Bar */}
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)]"
                  />
                )}

                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain p-1.5 bg-white transition-all duration-500"
                      />
                      <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-all duration-500 ${activeIndex === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                        {exp.company}
                      </h3>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`transition-all duration-500 ${activeIndex === index ? 'text-[var(--accent)] translate-x-0 opacity-100' : 'text-zinc-800 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-zinc-400'}`}
                    />
                  </div>
                </button>
            ))}
          </div>
        </div>

          {/* Right Side: Compact Detail View */}
          <div className="lg:col-span-8 perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.02, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative border border-white/10 bg-transparent backdrop-blur-md p-8 md:p-10 min-h-[450px] rounded-2xl flex flex-col shadow-xl overflow-hidden"
              >
                {/* Visual Accent Glow */}
                <div
                  className="absolute -right-10 -top-10 w-64 h-64 rounded-full blur-[100px] opacity-[0.05] pointer-events-none"
                  style={{ backgroundColor: EXPERIENCES[activeIndex].accent }}
                />

                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-8">
                  <div className="flex items-center gap-5">
                    <img
                      src={EXPERIENCES[activeIndex].logo}
                      alt={EXPERIENCES[activeIndex].company}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-2xl object-contain p-2.5 bg-white shadow-lg"
                    />
                    <div className="space-y-1">
                      <p className="text-[var(--accent)] text-sm md:text-xl font-mono uppercase tracking-[0.2em] font-black">
                        {EXPERIENCES[activeIndex].role}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-[11px] md:text-xs font-mono uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-[var(--accent)] opacity-70" />
                          <span>{EXPERIENCES[activeIndex].period}</span>
                        </div>
                        <span className="text-zinc-800 hidden md:block">•</span>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-[var(--accent)] opacity-70" />
                          <span>{EXPERIENCES[activeIndex].location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-10">
                  <p className="text-sm md:text-base text-zinc-300 font-normal leading-relaxed italic border-l border-[var(--accent)]/20 pl-6">
                    {EXPERIENCES[activeIndex].description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Tech Stack */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] text-zinc-600 uppercase tracking-widest font-black text-zinc-500">Technologies</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {EXPERIENCES[activeIndex].tech.map(t => (
                          <span key={t} className="px-3 py-1 bg-[var(--text-muted)] text-zinc-950 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] text-zinc-600 uppercase tracking-widest font-black">Key Outcomes</h5>
                      <div className="space-y-2">
                        {EXPERIENCES[activeIndex].metrics.map((m, i) => (
                          <div key={i} className="flex items-center gap-3 text-[11px] text-zinc-400 group">
                            <div className="w-1 h-1 bg-[var(--accent)] rounded-full" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}