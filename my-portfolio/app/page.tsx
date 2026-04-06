"use client";

import React, { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import ThemeToggle from "./components/ThemeToggle";
import Nav from "./components/Nav";
import Skills from './components/Skills'
import Experience from "./components/Experience";
import Entry from "./components/Entry/EntryUI";
import Pointer from "./components/Pointer";
import { useBackground } from "./components/Entry/Background";

export default function Page() {
  const canvasRef = useRef(null);
  useBackground(canvasRef);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <main ref={ref} className="relative">

      {/* 🔥 GLOBAL 3D BACKGROUND */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      <Pointer />
      <Entry />
      <Nav />
      <ThemeToggle />
      <About />
      <Skills />
      <Experience />
    </main>
  );
}