"use client"
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import React, { useState } from 'react'
import { useEffect } from "react";
const NAV_LINKS = [
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Contact", href: "contact" },
];
const Nav = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.replace("/", "");

    if (path) {
      const section = document.getElementById(path);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace("/", "");

      if (path) {
        const section = document.getElementById(path);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  useEffect(() => {
    const sections = NAV_LINKS.map(link => link.href);

    const handleScroll = () => {
      let current = "";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();

          // ✅ Check if section is in viewport center
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });

      setActiveSection(id); // ✅ highlight instantly
      window.history.pushState(null, "", `/${id}`);
    }
  };




  return (
    <div>
      {/* --- RGB MOVING BORDER NAVBAR --- */}
      <motion.div
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: "-150%", opacity: 0 } }}
        animate={hidden ? "hidden" : "visible"}
        className="fixed top-3 md:top-6 left-2 sm:left-3 md:left-0 right-auto md:inset-x-0 mx-0 md:mx-auto max-w-fit z-[999] px-0 md:px-4"
      >
        <div className="relative rounded-full p-[1.5px] overflow-hidden group">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-400%] bg-[conic-gradient(from_0deg,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)] opacity-60 blur-[2px]"
          />

          <nav className="relative z-10 flex items-center gap-3 md:gap-6 px-3 py-2 md:px-6 md:py-3 rounded-full bg-black/95 backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
              }}
              className="text-xl font-black text-white pr-4 border-r border-white/10 tracking-tighter"
            >
              SK.
            </button>
            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((link, idx) => (
                <button
                  key={link.name}
                  onClick={() => handleClick(link.href)}
                  onMouseEnter={() => setHoveredNav(idx)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  {hoveredNav === idx && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white/10 rounded-full -z-10" />
                  )}
                  {link.name}
                </button>
              ))}
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? "✕" : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </motion.div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-lg z-[998]"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* FLOATING COMPACT MENU */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.35 }}
              className="fixed top-20 right-4 w-[75%] max-w-[260px] z-[999]"
            >
              {/* RGB BORDER WRAPPER */}
              <div className="relative rounded-xl p-[1.2px] overflow-hidden">

                {/* RGB GLOW */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-250%]  opacity-70 blur-[8px]"
                />

                {/* GLASS PANEL */}
                <div className="relative rounded-xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] p-3">

                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-white dark:text-white">
                      Menu
                    </span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white text-sm px-2 py-1 rounded-md bg-white/10 hover:bg-white/20"
                    >
                      ✕
                    </button>
                  </div>

                  {/* LINKS */}
                  <div className="flex flex-col gap-2">
                    {NAV_LINKS.map((link, i) => (
                      <motion.button
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => {
                          handleClick(link.href);
                          setMobileMenuOpen(false);
                        }}
                        className={`relative text-sm font-medium px-3 py-2 rounded-md transition overflow-hidden ${activeSection === link.href
                          ? "text-black bg-white"
                          : "text-white bg-white/5 hover:bg-white/10"
                          }`}
                      >
                        {/* RGB BORDER FOR EACH ITEM */}
                        <span className="absolute inset-0 rounded-md p-[1px] pointer-events-none">
                          <span className="absolute inset-0 rounded-md  opacity-40 blur-[4px]" />
                        </span>

                        {/* TEXT */}
                        <span className="relative z-10 flex justify-between items-center">
                          {link.name}
                          {activeSection === link.href && (
                            <span className="text-[10px]">●</span>
                          )}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Nav
