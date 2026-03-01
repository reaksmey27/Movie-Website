import React from 'react';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

const ActionButtons = ({ movie, isFav, toggleFavorite, setIsPlaying, setShowTrailer }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
            <button
                onClick={() => setIsPlaying(true)}
                className="group flex items-center justify-center gap-4 bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-purple-600/30 active:scale-95"
            >
                <PlayIcon className="h-5 w-5 transition-transform group-hover:scale-125" />
                Play Movie
            </button>

            <div className="flex gap-4 sm:gap-6">
                {movie.trailerKey && (
                    <button
                        onClick={() => setShowTrailer(true)}
                        className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all backdrop-blur-md active:scale-95"
                    >
                        Watch Trailer
                    </button>
                )}

                <button
                    onClick={() => toggleFavorite(movie)}
                    className={`flex-shrink-0 flex items-center justify-center px-8 py-5 rounded-2xl transition-all active:scale-95 border-2 ${
                        isFav
                            ? "bg-red-500/10 border-red-500 text-red-500 shadow-lg shadow-red-500/20"
                            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
                >
                    {isFav ? <HeartIcon className="h-5 w-5" /> : <HeartOutline className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
