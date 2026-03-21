import { motion, useMotionValue } from 'framer-motion';
import { Menu } from 'lucide-react';
import React, { useState } from 'react'
const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Nav = () => {


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [hoveredNav, setHoveredNav] = useState<number | null>(null); 
      const [hidden, setHidden] = useState(false);

    


  return (
    <div>
             {/* --- RGB MOVING BORDER NAVBAR --- */}
      <motion.div
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: "-150%", opacity: 0 } }}
        animate={hidden ? "hidden" : "visible"}
        className="fixed top-6 inset-x-0 mx-auto max-w-fit z-[999] px-4"
      >
        <div className="relative rounded-full p-[1.5px] overflow-hidden group">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-400%] bg-[conic-gradient(from_0deg,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)] opacity-60 blur-[2px]"
          />
          
          <nav className="relative z-10 flex items-center gap-6 px-4 py-3 md:px-6 rounded-full bg-black/95 backdrop-blur-xl shadow-2xl">
            <a href="#" className="text-xl font-black text-white pr-4 border-r border-white/10 tracking-tighter">SK.</a>
            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((link, idx) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(idx)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  {hoveredNav === idx && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white/10 rounded-full -z-10" />
                  )}
                  {link.name}
                </a>
              ))}
            </div>
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}><Menu size={20}/></button>
          </nav>
        </div>
      </motion.div>
    </div>
  )
}

export default Nav
