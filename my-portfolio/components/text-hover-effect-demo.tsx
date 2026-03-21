"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const cx = ((cursor.x - rect.left) / rect.width) * 100;
      const cy = ((cursor.y - rect.top) / rect.height) * 100;

      setMaskPosition({
        cx: `${cx}%`,
        cy: `${cy}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 260"   // 🔥 bigger canvas
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none w-full h-full"
    >
      <defs>
        {/* 🔥 MUCH BRIGHTER GRADIENT */}
        <linearGradient id="textGradient">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="20%" stopColor="#ffcc00" />
              <stop offset="40%" stopColor="#00ff88" />
              <stop offset="60%" stopColor="#00e0ff" />
              <stop offset="80%" stopColor="#7a5cff" />
              <stop offset="100%" stopColor="#ff00ff" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          r="25%"   // 🔥 bigger reveal area
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0.25 }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* 🔹 BASE TEXT (visible always) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-transparent stroke-neutral-400 text-[180px] font-black tracking-[-0.04em] uppercase"
        style={{ opacity: hovered ? 0.2 : 1 }}
      >
        {text}
      </text>

      {/* 🔹 STROKE DRAW ANIMATION */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-transparent stroke-neutral-200 text-[180px] font-black tracking-[-0.04em] uppercase"
        initial={{ strokeDashoffset: 1200, strokeDasharray: 1200 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.5 }}
      >
        {text}
      </motion.text>

      {/* 🔥 MAIN HOVER EFFECT (BRIGHT + CLEAR) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="2"   // 🔥 thicker = brighter
        mask="url(#textMask)"
        className="fill-transparent text-[180px] font-black tracking-[-0.04em] uppercase"
        style={{
          filter: hovered ? "drop-shadow(0px 0px 12px rgba(255,255,255,0.8))" : "none", // 🔥 glow
        }}
      >
        {text}
      </text>
    </svg>
  );
};