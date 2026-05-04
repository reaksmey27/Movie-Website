import React from 'react';
import {
    PlayIcon,
    HeartIcon,
    StarIcon,
    ClockIcon,
    CalendarIcon,
    BookmarkIcon as BookmarkSolidIcon,
} from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, BookmarkIcon } from '@heroicons/react/24/outline';

const MovieInfo = ({
    movie,
    isFav,
    isWatchlisted,
    onPlay,
    onTrailer,
    onFavorite,
    onWatchlist,
}) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 animate-in slide-in-from-left-6 duration-700">
            <div className="w-full sm:w-[350px] lg:w-96 flex-shrink-0 mx-auto lg:mx-0">
                <img
                    src={movie.posterImage || movie.image}
                    alt={movie.title}
                    className="w-full rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-2xl transition-transform hover:scale-[1.01] duration-500"
                    loading="eager"
                    decoding="async"
                />
            </div>

            <div className="flex-1 space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter">
                        {movie.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                        <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-lg font-black shadow-lg">
                            <StarIcon className="h-4 w-4" />
                            <span>{movie.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                            <CalendarIcon className="h-4 w-4 text-purple-600" />
                            <span>{movie.subtitle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                            <ClockIcon className="h-4 w-4 text-purple-600" />
                            <span>{movie.duration}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-nowrap overflow-x-hidden">
                    {movie.genres.map((genre) => (
                        <span key={genre} className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="space-y-3">
                    <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] opacity-40">Storyline</h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium max-w-4xl line-clamp-3 selection:bg-purple-600">
                        {movie.description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                    <button
                        onClick={onPlay}
                        className="group flex items-center justify-center gap-4 bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-purple-600/30 active:scale-95"
                    >
                        <PlayIcon className="h-5 w-5 transition-transform group-hover:scale-125" />
                        Play Movie
                    </button>

                    <div className="flex gap-4 sm:gap-6">
                        {movie.trailerKey && (
                            <button
                                onClick={onTrailer}
                                className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all backdrop-blur-md active:scale-95"
                            >
                                Archives
                            </button>
                        )}
                        <button
                            onClick={onFavorite}
                            className={`flex-shrink-0 flex items-center justify-center px-8 py-5 rounded-2xl transition-all active:scale-95 border-2 ${isFav
                                ? 'bg-red-500/10 border-red-500 text-red-500 shadow-lg shadow-red-500/20'
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                            }`}
                        >
                            {isFav ? <HeartIcon className="h-5 w-5" /> : <HeartOutline className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={onWatchlist}
                            className={`flex-shrink-0 flex items-center justify-center px-8 py-5 rounded-2xl transition-all active:scale-95 border-2 ${isWatchlisted
                                ? 'bg-amber-500/10 border-amber-400 text-amber-400 shadow-lg shadow-amber-500/20'
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                            }`}
                        >
                            {isWatchlisted ? <BookmarkSolidIcon className="h-5 w-5" /> : <BookmarkIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
