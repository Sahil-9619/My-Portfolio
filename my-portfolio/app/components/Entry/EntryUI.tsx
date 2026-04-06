"use client";
import React, { useState, useEffect, useRef } from 'react';
import Loader from "./Loader";
import Hero from '../Hero';

const Entry = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const enteringRef = useRef(false); // Ref for Three.js loop access
    // --- Loader Logic ---
    useEffect(() => {
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 6 + 2; // smooth increment

            if (progress >= 100) {
                progress = 100;
                setLoadingProgress(100);

                clearInterval(interval);

                setTimeout(() => {
                    setIsLoaded(true);
                }, 800);
            } else {
                setLoadingProgress(Math.floor(progress));
            }
        }, 100);

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
            className="relative w-full h-screen overflow-hidden font-sans text-[var(--text-muted)] bg-transparent">
            <Loader
                loadingProgress={loadingProgress}
                isLoaded={isLoaded}
            />
            {isLoaded && (
                <div className="relative z-10 w-full h-full">
                    <Hero scrollProgress={undefined as any} />
                </div>
            )}

            {/* Bottom Area & Enter Button */}

            {isLoaded && (
                <>
                    <div className="relative z-10 w-full h-full">
                        <Hero scrollProgress={undefined as any} />
                    </div>

                    {/* ✅ FLOATING BUTTON */}
                    <div className="fixed bottom-10 right-10 z-20">
                        <button
                            onClick={handleEnterClick}
                            className="group relative flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-neutral-700 hover:border-white transition-all duration-500 overflow-hidden backdrop-blur-md bg-white/5"
                        >
                            <span className="text-xs tracking-[0.2em] font-medium relative z-10 group-hover:text-black transition-colors duration-500 delay-100">
                                EXPLORE PORTFOLIO
                            </span>

                            <div className="relative z-10 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform group-hover:scale-90 transition-transform duration-500">
                                →
                            </div>

                            <div className="absolute inset-0 bg-white w-full h-full transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 z-0" />
                        </button>
                    </div>
                </>
            )}
            {/* Final Fade out to Black for Next.js Route Transition */}
            <div
                className={`absolute inset-0 z-[100] bg-black transition-opacity duration-1000 pointer-events-none ${isEntering ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </div>
    );
};

export default Entry; 