"use client";

const Loader = ({
    loadingProgress,
    isLoaded,
}: {
    loadingProgress: number;
    isLoaded: boolean;
}) => {
    return (
        <div
            className={`fixed inset-0  flex flex-col overflow-hidden transition-all duration-1000 ${isLoaded
                ? "opacity-0 pointer-events-none scale-110"
                : "opacity-100 pointer-events-auto scale-100"
                }`}
        >
            {/* GLASS OVERLAY (instead of black bg) */}
            <div className="absolute inset-0 backdrop-blur-xl bg-black" />

            {/* TOP PANEL */}
            <div
                className={`w-full h-1/2 flex items-end justify-center pb-4 transition-transform duration-[1400ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${isLoaded ? "-translate-y-full" : "translate-y-0"
                    }`}
            >
                <span className="text-[11px] tracking-[0.5em] text-white/70 uppercase">
                    Entering into My World....
                </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                <div
                    className="h-full bg-white transition-all duration-200 ease-out shadow-[0_0_25px_rgba(255,255,255,0.8)]"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>

            {/* BOTTOM PANEL */}
            <div
                className={`w-full h-1/2 flex items-start justify-center pt-4 transition-transform duration-[1400ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${isLoaded ? "translate-y-full" : "translate-y-0"
                    }`}
            >
                <span className="absolute top-[55%] left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-widest ">
                    {loadingProgress}%
                </span>
            </div>
        </div>
    );
};

export default Loader;