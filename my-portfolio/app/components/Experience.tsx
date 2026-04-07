import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, TerminalSquare, ArrowDown } from "lucide-react";

// --- MOCK DATA ---
const EXPERIENCES = [
    {
        id: 1,
        role: "Senior Frontend Engineer",
        company: "TechNova",
        location: "Remote",
        period: "2024 - Present",
        description: "Architected a scalable micro-frontend ecosystem, drastically cutting load times by 40%. Directed a squad of developers to forge high-octane, accessible UI libraries.",
        achievements: [
            "Built a component library used by 3 cross-functional teams.",
            "Engineered advanced CI/CD pipelines cutting deploy times by 25%.",
            "Mentored juniors, establishing elite code-review standards."
        ],
        tech: ["React", "Next.js", "TypeScript", "Framer Motion"],
        theme: "from-indigo-500/20 to-purple-500/20",
        border: "border-indigo-500/30",
        accent: "text-indigo-400"
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "Creative Nexus",
        location: "New York, NY",
        period: "2022 - 2024",
        description: "Forged immersive, physics-driven web applications for top-tier fashion and tech clientele. Fused complex WebGL animations with robust headless CMS architectures.",
        achievements: [
            "Awarded 'Site of the Day' on Awwwards for a global campaign.",
            "Optimized database indexing, slashing API latency by over 50%.",
            "Integrated secure financial routing handling $1M+ monthly."
        ],
        tech: ["Vue.js", "Three.js", "PostgreSQL", "Node.js"],
        theme: "from-emerald-500/20 to-cyan-500/20",
        border: "border-emerald-500/30",
        accent: "text-emerald-400"
    },
    {
        id: 3,
        role: "UI/UX Developer",
        company: "Pixel Perfect",
        location: "San Francisco, CA",
        period: "2020 - 2022",
        description: "Bridged the critical void between design aesthetics and engineering constraints. Translated intricate Figma prototypes into fluid, pixel-perfect interactive realities.",
        achievements: [
            "Overhauled core SaaS dashboards, skyrocketing user retention.",
            "Developed an internal design token API for frictionless handoffs.",
            "Led A/B testing initiatives yielding a 20% conversion bump."
        ],
        tech: ["JavaScript", "React", "Sass", "Figma"],
        theme: "from-rose-500/20 to-orange-500/20",
        border: "border-rose-500/30",
        accent: "text-rose-400"
    }
];

// --- STACKED CARD COMPONENT ---
// Mathematically calculates its position, scale, and opacity based on scroll progress
const StackCard = ({ exp, index, totalCards, scrollYProgress }) => {
    const section = 1 / totalCards;

    const start = index * section;
    const end = start + section;

    // ENTRY DELAY (card rukega thoda)
    const entryStart = start;
    const entryEnd = start + section * 0.5;

    const x = useTransform(
        scrollYProgress,
        [entryStart, entryEnd],
        index === 0 ? ["0%", "0%"] : ["-120%", "0%"]
    );
    const opacity = useTransform(
        scrollYProgress,
        [
            start,
            start + section * 0.2,   // entry
            start + section * 0.8,   // HOLD (long time visible)
            end
        ],
        [0, 1, 1, 0]
    );

    const scale = useTransform(
        scrollYProgress,
        [start, end],
        [0.95, 1]
    );

    const blur = useTransform(
        scrollYProgress,
        [start, entryEnd],
        ["blur(1px)", "blur(0px)"]
    );

    return (
        <motion.div
            style={{
                x,
                opacity,
                scale,
                filter: blur,
                zIndex: index,
            }}
            className={`absolute inset-0 flex flex-col justify-between rounded-[2rem] border  bg-gradient-to-br ${exp.theme} ${exp.border} p-8 shadow-2xl backdrop-blur-xl overflow-hidden`}
        >
            {/* content same */}
            <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs font-mono text-zinc-300 backdrop-blur-md">
                    {exp.period}
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs font-mono text-zinc-300 backdrop-blur-md">
                    {exp.location}
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
                <h3 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white/5">
                    {exp.company}
                </h3>
            </div>

            <div className="relative">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {exp.company}
                </h2>
                <p className={`text-xl ${exp.accent}`}>
                    {exp.role}
                </p>
            </div>
        </motion.div>
    );
};

// --- MAIN EXPEREINCE COMPONENT ---
export default function ExperienceSection() {
    const containerRef = useRef(null);

    // Track scroll within the 400vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Make scrolling feel buttery smooth
    const springProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 40,
        mass: 1.5
    });

    const [activeIndex, setActiveIndex] = useState(0);

    // Update active index based on scroll position for the right-side text
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Determine which card is currently taking up the majority of the view
        const section = 1 / EXPERIENCES.length;
        const index = Math.floor(latest / section);
        setActiveIndex(Math.min(index, EXPERIENCES.length - 1));
    });

    const activeExp = EXPERIENCES[activeIndex];

    return (
        // The container is super tall to allow for a long scroll duration
        // 3 cards = ~300vh - 400vh for breathing room
        <section ref={containerRef} className="relative h-[500vh] selection:bg-white/30 font-sans">

            {/* Sticky wrapper: This stays pinned to the screen while you scroll */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-6 lg:px-12">

                {/* Header Indicator */}
                <div className="absolute top-10 left-6 lg:left-12 flex items-center gap-4">
                    <div className="flex gap-1.5">
                        {EXPERIENCES.map((_, i) => (
                            <motion.div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: scrollYProgress.get() < 0.05 ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm font-semibold tracking-wide text-white"
                        >
                            My Experience
                        </motion.span>

                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs font-mono uppercase tracking-widest text-zinc-500"
                        >
                            Scroll to view <ArrowDown className="inline h-3 w-3 ml-1" />
                        </motion.span>
                    </motion.div>
                </div>

                {/* Layout Grid */}
                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEFT: The Stacked Cards Area */}
                    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full perspective-[1200px] mt-12 lg:mt-0">
                        {EXPERIENCES.map((exp, index) => (
                            <StackCard
                                key={exp.id}
                                exp={exp}
                                index={index}
                                totalCards={EXPERIENCES.length}
                                scrollYProgress={springProgress}
                            />
                        ))}
                    </div>

                    {/* RIGHT: The Changing Details Area */}
                    <div className="relative h-auto lg:h-[70vh] flex flex-col justify-center pb-12 lg:pb-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeExp.id}

                                // 🔥 ENTRY FROM RIGHT (VIDEO STYLE)
                                initial={{ x: "120%", opacity: 0 }}
                                animate={{ x: "0%", opacity: 1 }}
                                exit={{ x: "120%", opacity: 0 }} // ✅ RIGHT me hi wapas jayega

                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 20,
                                    mass: 0.8
                                }}

                                className="flex flex-col"
                            >
                                <motion.h4
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className={`text-sm font-mono uppercase tracking-widest mb-6 ${activeExp.accent}`}
                                >
                  // Details
                                </motion.h4>

                                <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light mb-10">
                                    {activeExp.description}
                                </p>

                                <div className="space-y-6 mb-12 border-l border-white/10 pl-6 relative">
                                    {/* Animated line representing the border */}
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "100%" }}
                                        transition={{ duration: 0.8, ease: "circOut" }}
                                        className={`absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b ${activeExp.theme.replace('20', '50')}`}
                                    />

                                    {activeExp.achievements.map((achievement, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                            className="text-zinc-400 text-sm md:text-base leading-relaxed"
                                        >
                                            {achievement}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Tech Stack Pills */}
                                <div>
                                    <h5 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">Core Tech</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {activeExp.tech.map((tech, i) => (
                                            <motion.div
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 + (i * 0.05) }}
                                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300"
                                            >
                                                <TerminalSquare className="h-3 w-3 text-zinc-500" />
                                                {tech}
                                            </motion.div>
                                        ))}
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