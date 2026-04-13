import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowRight } from "lucide-react";
import Lottie from "lottie-react";
import linkedin from "../../public/linkedin.json";
import github from "../../public/github.json";


const LeetCodeIcon = ({ size = 25, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="yellow"
    className={className}
  >
    <g>
      {/* 🔥 Scale (pulse) animation */}
      <animateTransform
        attributeName="transform"
        type="scale"
        values="1;1.2;1"
        dur="1.2s"
        repeatCount="indefinite"
      />

      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.9-.535-.535-1.386-.554-1.899-.04l-10.086 10.03a3.805 3.805 0 0 0-1.077 2.65c0 1.05.418 2.053 1.137 2.77l8.982 9.06c.712.712 1.69 1.125 2.723 1.125s2.01-.413 2.723-1.125l2.609-2.636c.514-.514.496-1.365-.039-1.9-.535-.535-1.386-.554-1.899-.04zM20.947 5.485l-4.524 4.592c-.516.515-1.367.498-1.901-.038-.534-.536-.552-1.387-.038-1.901l4.524-4.592c.516-.515 1.367-.498 1.901.038.534.536.552 1.387.038 1.901z" />
    </g>
  </svg>
);

const LinkedInIcon = () => {
  const [play, setPlay] = React.useState(false);

  return (
    <div
      className="w-[30px] h-[30px]"
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Lottie
        key={play}
        animationData={linkedin}
        loop={true}
        autoplay={true}
        initialSegment={[0, 250]}
        speed={1}
      />
    </div>
  );
};

const GithubIcon = () => {
  const [play, setPlay] = React.useState(false);

  return (
    <div
      className="w-[35px] h-[35px]"
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Lottie
        key={play}
        animationData={github}
        loop={true}
        autoplay={true}
        initialSegment={[200, 300]}
        speed={1}
      />
    </div>
  );
};
const links = [
  {
    name: "LinkedIn",
    icon: <LinkedInIcon />,
    href: "https://www.linkedin.com/in/sahil-kumar230",
    color1: "#058af7",
    color2: "#94d3ea",
    color3: "#004B7C",
  },
  {
    name: "GitHub",
    icon: <GithubIcon />,
    href: "https://github.com/Sahil-9619",
    color1: "#4A5568", // Lighter grey for better fluid visibility
    color2: "#718096",
    color3: "#1A202C",
  },
  {
    name: "LeetCode",
    icon: <LeetCodeIcon size={25} />,
    href: "https://leetcode.com/u/sahil9619/",
    color1: "#FFA116",
    color2: "#FFB74D",
    color3: "#E65100",
  },
];

const TrueLiquidButton = ({ item, index }) => {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className="relative group w-[240px] h-[60px] flex items-center px-6 rounded-[28px] cursor-pointer isolate"
    >
      {/* --- EXTERNAL GLOW --- */}
      <div
        className="absolute inset-2 rounded-[28px] opacity-0 group-hover:opacity-60 blur-2xl transition-opacity duration-700 -z-20"
        style={{ background: `linear-gradient(to right, ${item.color1}, ${item.color2})` }}
      />

      {/* --- THE PREMIUM GLASS SHELL --- */}
      <div className="absolute inset-0  backdrop-blur-md border border-[color:var(--text-muted)]/30 rounded-[28px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden -z-10">

        {/* --- TRUE LIQUID FILL TANK (The Magic) --- */}
        <div className="absolute inset-0 overflow-hidden rounded-[28px]">

          {/* Deep back wave */}
          <div
            className="liquid-wave wave-back"
            style={{ backgroundColor: item.color3 }}
          />
          {/* Middle wave */}
          <div
            className="liquid-wave wave-mid"
            style={{ backgroundColor: item.color2 }}
          />
          {/* Front brilliant wave */}
          <div
            className="liquid-wave wave-front"
            style={{ backgroundColor: item.color1 }}
          />

          {/* Liquid Bubbles */}
          <div className="bubble b1" />
          <div className="bubble b2" />
          <div className="bubble b3" />
          <div className="bubble b4" />
        </div>

        {/* --- GLASS DETAILS & REFLECTIONS --- */}
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px]  opacity-50" />
        <div className="absolute top-[2px] left-[2px] right-[2px] h-[35%] rounded-t-[26px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[50%]  rounded-b-[26px] pointer-events-none" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="flex items-center justify-between w-full relative z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-5">
          {/* Glass Icon Box */}
          <div >

            {item.icon}

          </div>

          {/* Typography */}
          <div className="flex flex-col justify-center">
            <span className="text-white font-bold tracking-[0.08em] text-[15px] uppercase group-hover:text-white transition-colors duration-300">
              {item.name}
            </span>
          </div>
        </div>

        {/* Action Arrow */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/10 text-white/60 group-hover:text-white group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300 overflow-hidden relative backdrop-blur-sm shadow-sm">
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: [0, 5, -5, 0] }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ArrowRight size={18} strokeWidth={2} />
          </motion.div>
        </div>
      </div>

      {/* --- ANIMATION STYLES FOR THE LIQUID --- */}
      <style>{`
        /* The Base Shape of the Liquid Wave */
        .liquid-wave {
          position: absolute;
          width: 600px;
          height: 600px;
          left: 50%;
          margin-left: -300px; /* Centers the 600px circle */
          border-radius: 40% 46% 43% 47%; /* Squishy shape creates the wave */
          transform-origin: 50% 50%;
          transition: top 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          animation: spin-wave 6s linear infinite;
        }

        /* Initial "Half Empty" State */
        .wave-back  { top: 55px; opacity: 1;   animation-duration: 7s; }
        .wave-mid   { top: 65px; opacity: 0.8; animation-duration: 5s; animation-direction: reverse; }
        .wave-front { top: 75px; opacity: 0.9; animation-duration: 4s; }

        /* Hover "Filling the Glass" State */
        .group:hover .wave-back  { top: -180px; }
        .group:hover .wave-mid   { top: -150px; }
        .group:hover .wave-front { top: -120px; }

        /* Sloshing Physics */
        .group:hover .liquid-wave {
           animation-duration: 3s; /* Sloshes faster when filled */
        }

        @keyframes spin-wave {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Bubbles */
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          bottom: -15px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .b1 { left: 20%; width: 6px; height: 6px; animation: rise 2.5s infinite ease-in 0.2s; }
        .b2 { left: 45%; width: 10px; height: 10px; animation: rise 3s infinite ease-in 0.8s; }
        .b3 { left: 70%; width: 5px; height: 5px; animation: rise 2s infinite ease-in 0.5s; }
        .b4 { left: 85%; width: 8px; height: 8px; animation: rise 3.5s infinite ease-in 1.2s; }

        .group:hover .bubble {
          opacity: 1;
        }

        @keyframes rise {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </motion.a>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-8 overflow-hidden relative font-sans ">



      {/* Header Profile Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-14 relative z-10"
      >
        <p className="text-[var(--text)] text-sm font-medium tracking-[0.2em] uppercase">
          Connect with me
        </p>
      </motion.div>

      {/* The Beautiful Buttons */}
      <div className="flex flex-col gap-6 relative z-10">
        {links.map((link, index) => (
          <TrueLiquidButton key={link.name} item={link} index={index} />
        ))}
      </div>
    </div>
  );
}