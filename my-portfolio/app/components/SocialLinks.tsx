import React from "react";
import { motion } from "framer-motion";

import { Github, Linkedin, Code2, ExternalLink } from "lucide-react";

const links = [
  {
    name: "LinkedIn",
    icon: <Linkedin size={24} />,
    href: "https://www.linkedin.com/in/sahil-kumar230",
    color: "#0A66C2",
    shadowColor: "#004182",
  },
  {
    name: "GitHub",
    icon: <Github size={24} />,
    href: "https://github.com/Sahil-9619",
    color: "#24292e",
    shadowColor: "#282727",
  },
  {
    name: "LeetCode",
    icon: <Code2 size={22} />,
    href: "https://leetcode.com/u/sahil9619/",
    color: "#FFA116",
    shadowColor: "#C17900",
  },
];

const SocialButton = ({ item }: { item: typeof links[0] }) => {
  return (
    <div className="relative group perspective-1000">
      {/* THE BOTTOM LAYER (The 3D Depth/Shadow) */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-300 transform translate-y-2"
        style={{ backgroundColor: item.shadowColor }}
      />

      {/* THE TOP LAYER (The Interactive Button) */}
      <motion.a
        href={item.href}
        initial={false}
        whileHover={{ translateY: -4 }}
        whileTap={{ translateY: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative flex items-center justify-between w-[240px] h-[72px] px-6 rounded-2xl border-2 border-white/10 overflow-hidden"
        style={{ backgroundColor: item.color }}
      >
        {/* Glossy Overlay */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 pointer-events-none" />

        {/* Content */}
        <div className="flex items-center gap-4 z-10 text-white">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
          <span className="font-bold text-lg tracking-tight uppercase">
            {item.name}
          </span>
        </div>

        {/* Small Arrow Indicator */}
        <motion.div
          className="text-white group-hover:text-white group-hover:translate-x-1 transition-all"
        >
          <ExternalLink size={18} />
        </motion.div>

        {/* Shine Animation on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          initial={false}
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      </motion.a>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-10 font-sans">
      <div className="text-center mb-4">
        <h2 className="text-[var(--text-muted)] text-sm font-black uppercase tracking-[0.3em] mb-2">Connect with me</h2>
        <div className="h-1 w-12 bg-cyan-400 mx-auto rounded-full" />
      </div>


      {links.map((link, index) => (
        <SocialButton key={index} item={link} />
      ))}


      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}