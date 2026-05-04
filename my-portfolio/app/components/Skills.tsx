import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";


// --- Custom Cursor Component ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });

        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('.hover-trigger')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateCursor);
        window.addEventListener('mouseover', updateHoverState);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            window.removeEventListener('mouseover', updateHoverState);
        };
    }, []);

    return (
        <>
            <div
                className="pointer-events-none fixed left-0 top-0  h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] mix-blend-difference transition-transform duration-75 ease-out will-change-transform"
                style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${isHovering ? 0 : 1})` }}
            />
            <div
                className="pointer-events-none fixed left-0 top-0  h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--accent)] transition-all duration-300 ease-out will-change-transform"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${isHovering ? 1.5 : 0})`,
                    opacity: isHovering ? 1 : 0
                }}
            />
        </>
    );
};

// --- Skill Data ---
const skillCategories = {
    "Frontend": [
        { name: 'React', image: 'https://skillicons.dev/icons?i=react', desc: 'Library for UI' },
        { name: 'Next.js', image: 'https://skillicons.dev/icons?i=nextjs', desc: 'React Framework' },
        { name: 'Redux', image: 'https://skillicons.dev/icons?i=redux', desc: 'State Management' },
        { name: 'Tailwind', image: 'https://skillicons.dev/icons?i=tailwind', desc: 'CSS Framework' },
        { name: 'shadcn/ui', image: 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4', desc: 'UI Components' },
    ],
    "Backend": [
        { name: 'Node.js', image: 'https://skillicons.dev/icons?i=nodejs', desc: 'JS Runtime' },
        { name: 'Express.js', image: 'https://skillicons.dev/icons?i=express', desc: 'Web Framework' },
        { name: 'Django', image: 'https://skillicons.dev/icons?i=django', desc: 'Python Framework' },
        { name: 'Redis', image: 'https://skillicons.dev/icons?i=redis', desc: 'In-memory DB' },
        { name: 'Swagger', image: 'https://raw.githubusercontent.com/swagger-api/swagger-ui/master/docs/images/swagger_logo_2x.png', desc: 'API Documentation' },
    ],
    "Database": [
        { name: 'MySQL', image: 'https://skillicons.dev/icons?i=mysql', desc: 'Relational DB' },
        { name: 'MongoDB', image: 'https://skillicons.dev/icons?i=mongodb', desc: 'NoSQL DB' },
        { name: 'PostgreSQL', image: 'https://skillicons.dev/icons?i=postgres', desc: 'Advanced SQL' },
        { name: 'Sequelize', image: 'https://skillicons.dev/icons?i=sequelize', desc: 'Node.js ORM' },
        { name: 'Django ORM', image: 'https://skillicons.dev/icons?i=django', desc: 'Python ORM' },
    ],
    "DevOps": [
        { name: 'Git', image: 'https://skillicons.dev/icons?i=git', desc: 'Version Control' },
        { name: 'GitHub', image: 'https://skillicons.dev/icons?i=github', desc: 'Platform' },
        { name: 'Docker', image: 'https://skillicons.dev/icons?i=docker', desc: 'Containers' },
    ]
};

// --- Main App Component ---
export default function App() {
    const [activeCategory, setActiveCategory] = useState<keyof typeof skillCategories>("Frontend");

    return (
        <div
            id="skills"
            className="relative min-h-screen w-full  text-[--text] font-sans selection:bg-[var(--accent)] selection:text-black lg:cursor-none overflow-hidden flex flex-col pt-20 md:pt-22">

            {/* Global CSS for Brutalist styles and animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .text-stroke {
          -webkit-text-stroke: 1px var(--border);
          color: var(--text);
          opacity: 0.15;
        }
        .text-stroke-active {
          background: linear-gradient(to right, var(--text) 0%, var(--accent) 50%, var(--text) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
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
        
      `}} />


            {/* Section Header Styled like About section */}
            <div className="w-full flex justify-start mt-10 md:mt-25 px-6 md:px-12">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[var(--accent)] animate-pulse" />
                    <span className="text-xl font-mono uppercase tracking-[0.3em] text-[var(--accent)] opacity-80">
                        SKILLS
                    </span>
                </div>
            </div>

            {/* Massive Background Marquee Text */}
            <div className="pointer-events-none absolute left-0 top-1/2 flex w-[200vw] -translate-y-1/2 opacity-[0.05]">
                <div className="animate-marquee whitespace-nowrap text-[15vw] font-black uppercase tracking-tighter text-[var(--text)]">
                    {activeCategory} • {activeCategory} • {activeCategory} • {activeCategory} •
                </div>
            </div>

            {/* Main Content Split Screen */}
            <main className="relative flex flex-1 flex-col lg:flex-row h-full overflow-hidden">

                {/* Left Side: Kinetic Typography Navigation */}
                <div className="relative flex w-full flex-col justify-center p-4 lg:w-1/2 lg:p-8 xl:p-16">
                    <p className="mb-4 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                        [ Select Domain ]
                    </p>
                    <div className="flex flex-col items-start gap-4 lg:gap-8">
                        {Object.keys(skillCategories).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category as keyof typeof skillCategories)}
                                className={`hover-trigger group relative text-3xl font-black uppercase tracking-tighter transition-all duration-500 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${activeCategory === category
                                    ? 'text-stroke-active translate-x-2 lg:translate-x-4'
                                    : 'text-stroke hover:opacity-80 hover:scale-[1.02]'
                                    }`}
                            >
                                {/* Aceternity-style Glow Pill */}
                                <div className={`absolute -left-2 lg:-left-4 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[var(--accent)] blur-[2px] transition-all duration-500 ${activeCategory === category ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                                    }`} />
                                <div className={`absolute -left-2 lg:-left-4 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[var(--accent)] transition-all duration-500 ${activeCategory === category ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                                    }`} />
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Centered Divider */}
                    <div className="absolute right-0 top-1/2 hidden h-1/2 w-[1px] -translate-y-1/2 bg-[var(--border)] lg:block" />
                    <div className="mx-auto h-[1px] w-1/2 bg-[var(--border)] lg:hidden" />
                </div>

                {/* Right Side: Brutalist Data Cards (Scrollable on small screens) */}
                <div className="flex w-full flex-col p-4 lg:w-1/2 lg:p-8 xl:p-16  overflow-y-auto">
                    <div className="mb-8 max-w-md shrink-0">
                        <h2 className="mb-2 text-xl font-bold tracking-tight text-[var(--text)] uppercase">
                            {activeCategory} Ecosystem
                        </h2>
                        <p className="text-[var(--text-muted)] leading-relaxed text-sm">
                            A curated selection of the tools, frameworks, and technologies I utilize to build robust, scalable, and high-performance solutions in the {activeCategory.toLowerCase()} space.
                        </p>
                    </div>

                    {/* Cards Container with Key to force re-animation on category change */}
                    <div
                        key={activeCategory}
                        className="animate-stagger grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 pb-12"
                    >
                        {skillCategories[activeCategory].map((skill, index) => (
                            <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}

/* ---------- COMPONENTS ---------- */

function SkillCard({ skill, index }: { skill: any, index: number }) {
    let [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group block p-1 h-full w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        className="absolute inset-0 h-full w-full bg-[var(--accent-soft)]/40 block rounded-2xl md:rounded-3xl"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                duration: 0.15
                            },
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.15, delay: 0.1 },
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="relative h-full rounded-2xl border border-[var(--border)] p-1 transition-all duration-500 group-hover:border-[var(--accent)]/30 md:rounded-3xl md:p-1.5 bg-transparent z-10 overflow-hidden">
                <div className="relative z-10 flex h-full flex-col justify-between gap-4 rounded-xl bg-transparent p-4 sm:p-5 md:p-6">
                    {/* Top Section */}
                    <div className="mb-4 flex items-start justify-between">
                        <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-lg sm:rounded-xl border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-300">
                            <img
                                src={skill.image}
                                alt={skill.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text)]/60">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto">
                        <h3 className="mb-1 text-sm sm:text-base md:text-lg font-bold text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--text)]">
                            {skill.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs font-medium text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text-muted)]">
                            {skill.desc}
                        </p>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-[var(--border)] transition-colors duration-300 group-hover:border-[var(--accent)]" />
                    <div className="absolute right-0 bottom-0 h-2 w-2 border-b-2 border-r-2 border-[var(--border)] transition-colors duration-300 group-hover:border-[var(--accent)]" />
                </div>
            </div>
        </div>
    );
}