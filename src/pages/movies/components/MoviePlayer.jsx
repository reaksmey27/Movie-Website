import React from 'react';

const MoviePlayer = ({ SERVERS, activeServer, currentServerUrl, iframeLoading, playerMessage, onServerChange, onIframeLoad, onIframeError, onNextServer }) => {
    return (
        <div className="space-y-6">
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

            <div className="mx-auto w-full max-w-5xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">
                        Now playing on {activeServer}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                        Best quality depends on the source stream
                    </p>
                </div>

                <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl sm:rounded-3xl">
                    <div className="aspect-video bg-black">
                        <iframe
                            src={currentServerUrl}
                            className="h-full w-full bg-black"
                            frameBorder="0"
                            scrolling="no"
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                            allowFullScreen
                            referrerPolicy="origin-when-cross-origin"
                            title="Cinema Player"
                            onLoad={onIframeLoad}
                            onError={onIframeError}
                        />
                    </div>
                    {iframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500" />
                        </div>
                    )}
                </div>

                <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Softer streams usually look better at this size or in fullscreen than stretched edge to edge.
                </p>
            </div>

            <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl flex items-center gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                <p className="text-[9px] sm:text-[10px] text-purple-300 font-bold uppercase tracking-widest">
                    Tip: Switch servers if the picture looks soft or the stream is slow.
                </p>
            </div>

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
