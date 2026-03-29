"use client";

import React, { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import ThemeToggle from "./components/ThemeToggle";
import Nav from "./components/Nav";
import Skills from './components/Skills'

export default function Page() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <main ref={ref} className="relative">
      <Nav />
      <ThemeToggle />
      <Hero scrollProgress={smooth} />
      <About />
      <Skills />
    </main>
  );
}