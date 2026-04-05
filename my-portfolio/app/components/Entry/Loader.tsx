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
            className={`fixed inset-0 z-[9999] flex flex-col overflow-hidden transition-opacity duration-1000 ${isLoaded ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="absolute inset-0 bg-black/80 z-0" />
            {/* TOP */}
            <div
                className={`w-full h-1/2 bg-[#020202] flex items-end justify-center pb-4 transition-transform duration-[1400ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${isLoaded ? "-translate-y-full" : "translate-y-0"
                    }`}
            >
                <span className="text-[11px] tracking-[0.5em] text-white uppercase">
                    Entering into My World....
                </span>
            </div>

            {/* BAR */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-white/20 rounded-full overflow-hidden z-10">
                <div
                    className="h-full bg-white transition-all duration-200 ease-out shadow-[0_0_30px_rgba(255,255,255,1)]"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>
            {/* BOTTOM */}
            <div
                className={`w-full h-1/2 bg-[#020202] flex items-start justify-center pt-4 transition-transform duration-[1400ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${isLoaded ? "translate-y-full" : "translate-y-0"
                    }`}
            >
                <span className="absolute top-[55%] left-1/2 -translate-x-1/2 text-white text-sm tracking-widest z-10">
                    {loadingProgress}%
                </span>
            </div>
        </div>
    );
};

export default Loader;