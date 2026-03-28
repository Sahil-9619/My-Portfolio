import React, { useState, useEffect } from 'react';
import {
    Code2, Database, Layout, Terminal, Cpu, Globe, Layers,
    Wand2, Figma, Smartphone, Server, Cloud, Palette, GitBranch,
    Pointer
} from 'lucide-react';

// --- Skill Data ---
const skillCategories = {
    "Frontend": [
        { name: 'React', icon: Code2, desc: 'Component Architecture' },
        { name: 'Next.js', icon: Globe, desc: 'Server-side Rendering' },
        { name: 'TypeScript', icon: Terminal, desc: 'Static Typing' },
        { name: 'Tailwind', icon: Layout, desc: 'Utility-first CSS' },
        { name: 'Framer Motion', icon: Wand2, desc: 'Complex Animations' },
        { name: 'Three.js', icon: Layers, desc: '3D Web Experiences' },
    ],
    "Backend": [
        { name: 'Node.js', icon: Server, desc: 'Runtime Environment' },
        { name: 'PostgreSQL', icon: Database, desc: 'Relational Database' },
        { name: 'Python', icon: Code2, desc: 'Data & Scripting' },
        { name: 'Redis', icon: Database, desc: 'In-memory Caching' },
        { name: 'GraphQL', icon: Layers, desc: 'API Query Language' },
        { name: 'REST APIs', icon: Globe, desc: 'System Integration' },
    ],
    "Design": [
        { name: 'Figma', icon: Figma, desc: 'Interface Design' },
        { name: 'UI/UX', icon: Palette, desc: 'User Experience' },
        { name: 'Prototyping', icon: Smartphone, desc: 'Interactive Flows' },
        { name: 'Wireframing', icon: Layout, desc: 'Structural Layouts' },
    ],
    "DevOps": [
        { name: 'Docker', icon: Cpu, desc: 'Containerization' },
        { name: 'AWS', icon: Cloud, desc: 'Cloud Infrastructure' },
        { name: 'CI/CD', icon: Terminal, desc: 'Automated Pipelines' },
        { name: 'Git Workflow', icon: GitBranch, desc: 'Version Control' },
    ]
};

// --- Main App Component ---
export default function App() {
    const [activeCategory, setActiveCategory] = useState("Frontend");

    return (
        <div className="relative min-h-screen w-full bg-[var(--bg)] text-foreground font-sans selection:bg-var(--accent) selection:text-black lg:cursor-none overflow-hidden flex flex-col">

            {/* Global CSS for Brutalist styles and animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .text-stroke {
          -webkit-text-stroke: 1px #3f3f46;
          color: transparent;
        }
        .text-stroke-active {
          -webkit-text-stroke: 1px transparent;
          color: #f4f4f5;
        }
        
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-stagger > div {
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animate-stagger > div:nth-child(1) { animation-delay: 0.1s; }
        .animate-stagger > div:nth-child(2) { animation-delay: 0.15s; }
        .animate-stagger > div:nth-child(3) { animation-delay: 0.2s; }
        .animate-stagger > div:nth-child(4) { animation-delay: 0.25s; }
        .animate-stagger > div:nth-child(5) { animation-delay: 0.3s; }
        .animate-stagger > div:nth-child(6) { animation-delay: 0.35s; }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        /* Subtle noise texture */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}} />

            {/* Noise Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>

            {/* Massive Background Marquee Text */}
            <div className="pointer-events-none absolute left-0 top-1/2 z-0 flex w-[200vw] -translate-y-1/2 opacity-[0.05]">
                <div className="animate-marquee whitespace-nowrap text-[25vw] font-black uppercase tracking-tighter text-white">
                    {activeCategory} • {activeCategory} • {activeCategory} • {activeCategory} •
                </div>
            </div>

            {/* Main Content Split Screen */}
            <main className="relative z-10 flex flex-1 flex-col lg:flex-row">

                {/* Left Side: Kinetic Typography Navigation */}
                <div className="flex w-full flex-col justify-center border-b border-zinc-800/50 p-6 lg:w-1/2 lg:border-b-0 lg:border-r lg:p-12 xl:p-24">
                    <p className="mb-8 text-sm font-mono uppercase tracking-widest text-[var(--text)]">
                        [ Select Domain ]
                    </p>
                    <div className="flex flex-col items-start gap-4 lg:gap-6">
                        {Object.keys(skillCategories).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`hover-trigger group relative text-3xl font-black uppercase tracking-tighter transition-all duration-500 sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl ${activeCategory === category
                                    ? 'text-stroke-active translate-x-4 lg:translate-x-8'
                                    : 'text-stroke hover:text-stroke-active hover:text-zinc-500'
                                    }`}
                            >
                                {/* Accent line indicating active state */}
                                <div className={`absolute -left-4 lg:-left-8 top-1/2 h-2 w-0 -translate-y-1/2 bg-[#ccff00] transition-all duration-500 ${activeCategory === category ? 'w-2 lg:w-4' : 'group-hover:w-1'
                                    }`} />
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Brutalist Data Cards */}
                <div className="flex w-full flex-col p-6 lg:w-1/2 lg:p-12 xl:p-24 bg-card backdrop-blur-sm">
                    <div className="mb-12 max-w-md">
                        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
                            {activeCategory} Ecosystem
                        </h2>
                        <p className="text-zinc-400 leading-relaxed">
                            A curated selection of the tools, frameworks, and technologies I utilize to build robust, scalable, and high-performance solutions in the {activeCategory.toLowerCase()} space.
                        </p>
                    </div>

                    {/* Cards Container with Key to force re-animation on category change */}
                    <div
                        key={activeCategory}
                        className="animate-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6"
                    >
                        {skillCategories[activeCategory as keyof typeof skillCategories].map((skill, index: number) => (
                            <div
                                key={skill.name}
                                className="
  group relative flex flex-col justify-between
  bg-card
  border border-border
  p-6 rounded-2xl
  transition-all duration-500 ease-out
  
  hover:-translate-y-3
  hover:border-primary
  hover:shadow-[0_25px_60px_-20px_rgba(204,255,0,0.35)]
  "
                            ><div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                    <div className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition duration-500">
                                        <div className="absolute top-0 left-[-100%] w-[200%] h-[2px] 
    bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent 
    animate-[slide_2s_linear_infinite]" />
                                    </div>
                                </div>
                                {/* Top Section */}
                                <div className="mb-8 flex items-start justify-between">
                                    <skill.icon className="h-8 w-8 text-zinc-500 transition-colors duration-300 group-hover:text-black" strokeWidth={1.5} />
                                    <span className="font-mono text-xs text-zinc-600 transition-colors duration-300 group-hover:text-black/60">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Bottom Section */}
                                <div>
                                    <h3 className="mb-1 text-lg font-semibold text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--bg)]">
                                        {skill.name}
                                    </h3>
                                    <p className="text-sm text-zinc-500 transition-colors duration-300 group-hover:text-black/80">
                                        {skill.desc}
                                    </p>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-zinc-600 transition-colors duration-300 group-hover:border-black" />
                                <div className="absolute right-0 bottom-0 h-2 w-2 border-b border-r border-zinc-600 transition-colors duration-300 group-hover:border-black" />
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}