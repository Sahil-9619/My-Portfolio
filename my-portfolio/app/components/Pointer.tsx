"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomPointer() {
  const [hovering, setHovering] = useState(false);
  const [displayCoords, setDisplayCoords] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mechanical spring feel
  const springConfig = { stiffness: 800, damping: 50, mass: 0.2 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Rotation on hover
  const rotation = useSpring(hovering ? 135 : 0, {
    stiffness: 300,
    damping: 20,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      setDisplayCoords({
        x: Math.floor(e.clientX),
        y: Math.floor(e.clientY),
      });
    };

    const handleHover = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.closest("button, a, .interactive")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);

    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
      document.body.style.cursor = "auto";
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        style={{ x, y, rotate: rotation, translateX: "-50%", translateY: "-50%" }}
        className="relative flex items-center justify-center"
      >
        {/* Center Dot */}
        <motion.div
          animate={{
            scale: hovering ? 0 : 1,
            backgroundColor: hovering ? "var(--accent)" : "var(--text)",
          }}
          className="w-1 h-1 rounded-full absolute"
        />

        {/* 4 Corner Brackets */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
          <motion.div
            key={pos}
            animate={{
              x: hovering
                ? pos.includes("left") ? -24 : 24
                : pos.includes("left") ? -10 : 10,
              y: hovering
                ? pos.includes("top") ? -24 : 24
                : pos.includes("top") ? -10 : 10,
              borderColor: hovering
                ? "var(--accent)"
                : "rgba(255,255,255,0.4)",
              width: hovering ? 12 : 6,
              height: hovering ? 12 : 6,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute ${
              pos === "top-left"
                ? "border-t border-l"
                : pos === "top-right"
                ? "border-t border-r"
                : pos === "bottom-left"
                ? "border-b border-l"
                : "border-b border-r"
            }`}
          />
        ))}

        {/* Coordinates */}
        <motion.div
          animate={{
            opacity: hovering ? 0 : 0.4,
            y: 24,
          }}
          className="absolute whitespace-nowrap text-[8px] uppercase tracking-tighter text-[var(--text)] font-mono"
        >
          X:{displayCoords.x.toString().padStart(4, "0")} Y:
          {displayCoords.y.toString().padStart(4, "0")}
        </motion.div>

        {/* Hover Ring */}
        {hovering && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            className="absolute w-20 h-20 border rounded-full border-[var(--accent)]"
          />
        )}
      </motion.div>
    </div>
  );
}