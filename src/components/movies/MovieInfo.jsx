import React from 'react';
import { StarIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/solid';

const MovieInfo = ({ movie }) => {
    return (
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

            <div className="flex flex-wrap gap-2 text-nowrap overflow-x-hidden">
                {movie.genres.map((genre) => (
                    <span
                        key={genre}
                        className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
                    >
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
        </div>
    );
};

export default MovieInfo;
