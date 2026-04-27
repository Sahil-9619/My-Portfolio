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


    return (
        <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-[var(--text-muted)] bg-transparent">
            <Loader
                loadingProgress={loadingProgress}
                isLoaded={isLoaded}
            />

            {isLoaded && (
                <div className="relative w-full min-h-screen">
                    <Hero />
                </div>
            )}
        </div>
    );
};

export default Entry; 