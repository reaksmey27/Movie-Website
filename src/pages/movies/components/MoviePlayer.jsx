import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const MoviePlayer = ({ SERVERS, activeServer, currentServerUrl, iframeLoading, playerMessage, onServerChange, onIframeLoad, onIframeError, onNextServer }) => {
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500">
            {/* Server tabs */}
            <div className="flex flex-nowrap sm:flex-wrap gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                {SERVERS.map((server) => (
                    <button
                        key={server.name}
                        onClick={() => onServerChange(server.name)}
                        className={`flex-shrink-0 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeServer === server.name
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                    >
                        {server.name}
                    </button>
                ))}
            </div>

            {/* Player iframe */}
            <div className="relative w-full aspect-video rounded-xl sm:rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                <iframe
                    src={currentServerUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    title="Cinema Player"
                    onLoad={onIframeLoad}
                    onError={onIframeError}
                />
                {iframeLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500" />
                    </div>
                )}
            </div>

            {/* Tip */}
            <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl flex items-center gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                <p className="text-[9px] sm:text-[10px] text-purple-300 font-bold uppercase tracking-widest">
                    Tip: Try switching servers if the stream is slow.
                </p>
            </div>

            {/* Error message */}
            {playerMessage && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-[10px] text-red-300 font-bold uppercase tracking-widest">{playerMessage}</p>
                    <button
                        onClick={onNextServer}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-[10px] font-black uppercase tracking-widest active:scale-95"
                    >
                        Try Next Server
                    </button>
                </div>
            )}
        </div>
    );
};

export default MoviePlayer;
