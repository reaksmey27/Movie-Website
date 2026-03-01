import React from 'react';

const PageLoader = ({ color = 'border-purple-600', label = 'Loading...', glow = '' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className={`w-12 h-12 border-4 ${color} border-t-transparent rounded-full animate-spin ${glow}`} />
            <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">{label}</span>
        </div>
    );
};

export default PageLoader;
