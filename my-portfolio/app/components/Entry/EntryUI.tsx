"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Background } from "./Background";
import Loader from "./Loader";
import { useTheme } from '@/app/hooks/useTheme';


const Entry = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const { theme } = useTheme();
    const canvasRef = useRef(null);
    const enteringRef = useRef(false); // Ref for Three.js loop access
    Background(canvasRef, enteringRef);
    // --- Loader Logic ---
    useEffect(() => {
        let progress = 0;
        const interval = setInterval(() => {
            // Randomly jump progress to simulate actual loading
            progress += Math.floor(Math.random() * 15) + 1;
            if (progress >= 100) {
                progress = 100;
                setLoadingProgress(100);
                clearInterval(interval);

                // Trigger reveal after brief pause at 100%
                setTimeout(() => {
                    setIsLoaded(true);
                }, 800);
            } else {
                setLoadingProgress(progress);
            }
        }, 150);

        return () => clearInterval(interval);
    }, []);
    // --- Handlers ---
    const handleEnterClick = () => {
        setIsEntering(true);
        enteringRef.current = true;

        // Here you would typically trigger Next.js Router:
        // setTimeout(() => router.push('/portfolio'), 1500);
    };

    return (
        <div
            className="relative w-full h-screen overflow-hidden font-sans text-[var(--text-muted)] bg-gradient-to-br from-[#0a0f1a] to-[#02040a]">
            {/* ThreeJS Background Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

            <Loader
                loadingProgress={loadingProgress}
                isLoaded={isLoaded}
            />

            {/* --- LAYER 2: HERO INTERFACE --- */}
            <div
                className={`relative z-10 flex flex-col justify-between h-full w-full p-6 md:p-12 pointer-events-none transition-all duration-1000 ${isEntering ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                    }`}
            >
                {/* Top Navbar Area */}
                <header className="flex justify-between items-start w-full overflow-hidden">
                    <div className={`transition-transform duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
                        <h2
                            className="text-lg font-bold tracking-widest uppercase"
                        >
                            S.K
                        </h2>
                    </div>
                    <div className={`text-right transition-transform duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
                        <p className="text-xs tracking-[0.2em] text-neutral-400">STATUS</p>
                        <p className="text-xs tracking-widest text-green-400 mt-1 flex items-center gap-2 justify-end">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            AVAILABLE FOR WORK
                        </p>
                    </div>
                </header>

                {/* Center Typography (Awwwards Style Reveal) */}
                <main className="flex flex-col items-center justify-center w-full my-auto text-center">
                    <div className="overflow-hidden mb-2 md:mb-6">
                        <h1
                            className={`text-[12vw] leading-none font-black tracking-tighter uppercase transition-transform duration-[1200ms] delay-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                                }`}
                        >
                            Sahil
                        </h1>

                    </div>
                    <div className="">
                        <h1
                            className={`text-[12vw] leading-none font-black tracking-tighter uppercase  transition-transform duration-[1200ms] delay-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                                }`}
                        >
                            Kumar
                        </h1>
                    </div>
                    <div className="overflow-hidden mt-6">
                        <p
                            className={`text-sm md:text-base tracking-[0.4em] text-[var(--text)] uppercase transition-transform duration-[1200ms] delay-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                }`}
                        >
                            Creative Developer & Designer
                        </p>
                    </div>
                </main>

                {/* Bottom Area & Enter Button */}
                <footer className="flex justify-center md:justify-end w-full overflow-hidden pb-4">
                    <div
                        className={`transition-transform duration-[1200ms] delay-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'translate-y-0' : 'translate-y-[150%]'
                            }`}
                    >
                        <button
                            onClick={handleEnterClick}
                            className="pointer-events-auto group relative flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-neutral-700 hover:border-white transition-colors duration-500 overflow-hidden"
                        >
                            <span className="text-xs tracking-[0.2em] font-medium relative z-10 group-hover:text-black transition-colors duration-500 delay-100">
                                EXPLORE PORTFOLIO
                            </span>

                            <div className="relative z-10 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform group-hover:scale-90 transition-transform duration-500">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>

                            {/* Hover Fill Effect */}
                            <div className="absolute inset-0 bg-white w-full h-full transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                        </button>
                    </div>
                </footer>
            </div>

            {/* Final Fade out to Black for Next.js Route Transition */}
            <div
                className={`absolute inset-0 z-[100] bg-black transition-opacity duration-1000 pointer-events-none ${isEntering ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </div>
    );
};

export default Entry; 