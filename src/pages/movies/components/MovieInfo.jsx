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
        <div className="animate-in flex flex-col gap-8 duration-700 slide-in-from-left-6 sm:gap-12 lg:flex-row lg:gap-16">
            <div className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:w-96 lg:max-w-none">
                <img
                    src={movie.posterImage || movie.image}
                    alt={movie.title}
                    className="w-full rounded-2xl sm:rounded-4xl border border-white/10 shadow-2xl transition-transform hover:scale-[1.01] duration-500"
                    loading="eager"
                    decoding="async"
                />
            </div>

            <div className="flex-1 space-y-6 sm:space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-black leading-[0.9] tracking-tighter text-white sm:text-5xl lg:text-6xl">
                        {movie.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm sm:gap-6">
                        <div className="flex items-center gap-2 rounded-lg bg-yellow-500 px-3 py-1 font-black text-black shadow-lg">
                            <StarIcon className="h-4 w-4" />
                            <span>{movie.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gray-400 sm:text-[10px]">
                            <CalendarIcon className="h-4 w-4 text-purple-600" />
                            <span>{movie.subtitle}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gray-400 sm:text-[10px]">
                            <ClockIcon className="h-4 w-4 text-purple-600" />
                            <span>{movie.duration}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                        <span key={genre} className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="space-y-3">
                    <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] opacity-40">Storyline</h3>
                    <p className="max-w-4xl text-base font-medium leading-relaxed text-gray-300 selection:bg-purple-600 sm:text-lg">
                        {movie.description}
                    </p>
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:gap-6 sm:pt-4">
                    <button
                        onClick={onPlay}
                        className="group flex min-h-14 items-center justify-center gap-4 rounded-2xl bg-purple-600 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-purple-600/30 transition-all hover:bg-purple-500 active:scale-95 sm:px-10 sm:py-5 sm:text-xs"
                    >
                        <PlayIcon className="h-5 w-5 transition-transform group-hover:scale-125" />
                        Play Movie
                    </button>

                    <div className="flex flex-wrap gap-3 sm:gap-6">
                        {movie.trailerKey && (
                            <button
                                onClick={onTrailer}
                                className="flex min-h-14 min-w-35 flex-1 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all backdrop-blur-md hover:bg-white/10 active:scale-95 sm:px-8 sm:py-5 sm:text-xs"
                            >
                                Watch Trailer
                            </button>
                        )}
                        <button
                            onClick={onFavorite}
                            className={`flex min-h-14 flex-1 items-center justify-center rounded-2xl border-2 px-5 py-4 transition-all active:scale-95 sm:min-h-0 sm:flex-none sm:px-8 sm:py-5 ${isFav
                                ? 'bg-red-500/10 border-red-500 text-red-500 shadow-lg shadow-red-500/20'
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                            }`}
                        >
                            {isFav ? <HeartIcon className="h-5 w-5" /> : <HeartOutline className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={onWatchlist}
                            className={`flex min-h-14 flex-1 items-center justify-center rounded-2xl border-2 px-5 py-4 transition-all active:scale-95 sm:min-h-0 sm:flex-none sm:px-8 sm:py-5 ${isWatchlisted
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
