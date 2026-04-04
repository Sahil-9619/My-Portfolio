"use client";

const Loader = ({ loadingProgress, isLoaded }) => {
    return (
        <div
            className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0f1a] transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isLoaded ? '-translate-y-full' : 'translate-y-0'
                }`}
        >
            <div className="overflow-hidden">
                <div className="flex items-end gap-4">
                    <span className="text-sm tracking-[0.3em] text-neutral-500 mb-2">
                        LOADING
                    </span>

                    <span className="text-6xl md:text-8xl font-black tracking-tighter w-32 text-right">
                        {loadingProgress}
                    </span>

                    <span className="text-4xl text-neutral-600 mb-2">%</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-10 w-full max-w-md px-10">
                <div className="h-[2px] w-full bg-neutral-900 overflow-hidden">
                    <div
                        className="h-full bg-white transition-all duration-300 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Loader;