import React from 'react';

const ProBanner = () => {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Join Pro Membership</h3>
                    <p className="text-white/80 font-medium max-w-md">
                        Unlock early access to upcoming trailers and high-definition streaming for your favorites.
                    </p>
                </div>
                <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl">
                    Upgrade Now
                </button>
            </div>
        </div>
    );
};

export default ProBanner;
