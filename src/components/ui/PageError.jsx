import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PageError = ({ message, buttonLabel = 'Retry', buttonColor = 'bg-white hover:bg-red-500 hover:text-white', icon: Icon, iconColor = 'text-red-500', borderColor = 'border-red-500/10 bg-red-500/5' }) => {
    return (
        <div className={`flex flex-col items-center justify-center min-h-[400px] text-center border-2 ${borderColor} rounded-3xl p-12`}>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                {Icon ? <Icon className={`h-8 w-8 ${iconColor}`} /> : <XMarkIcon className="h-8 w-8 text-red-500" />}
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Error</h3>
            <p className="text-gray-500 font-medium max-w-sm">{message}</p>
            <button
                onClick={() => window.location.reload()}
                className={`mt-8 px-10 py-4 text-black ${buttonColor} rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95`}
            >
                {buttonLabel}
            </button>
        </div>
    );
};

export default PageError;
