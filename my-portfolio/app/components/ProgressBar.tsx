import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import React from 'react'

const ProgressBar = () => {
        const { scrollY, scrollYProgress } = useScroll();


const scale = useTransform(scrollY, [0, 500], [1, 0.85]);
const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);  
    // Scroll Progress Scale
      const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      });
    

  return (
    <div>
      {/* --- SCROLL PROGRESS BAR --- */}
      <motion.div
       
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[var(--accent)] z-[100] origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}

export default ProgressBar
