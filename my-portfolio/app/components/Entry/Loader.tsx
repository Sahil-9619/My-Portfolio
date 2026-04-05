"use client";

const Loader = ({ loadingProgress, isLoaded }) => {
    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col pointer-events-none overflow-hidden transition-opacity duration-1000 ${isLoaded ? "opacity-0" : "opacity-100"
                }`}
        >
            {/* TOP */}
            <div
                className={`w-full h-1/2 bg-[#020202] flex items-end justify-center pb-2 transition-transform duration-[1200ms] ${isLoaded ? "-translate-y-full" : "translate-y-0"
                    }`}
            >
                <span className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase">
                    Loading
                </span>
            </div>

            {/* BAR */}
            <div className="w-full h-[1px] bg-neutral-900 absolute top-1/2">
                <div
                    className="h-full bg-white"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>

            {/* BOTTOM */}
            <div
                className={`w-full h-1/2 bg-[#020202] flex items-start justify-center pt-2 transition-transform duration-[1200ms] ${isLoaded ? "translate-y-full" : "translate-y-0"
                    }`}
            >
                <span className="text-[10px] text-white">
                    {loadingProgress}%
                </span>
            </div>
        </div>
    );
};

export default Loader;