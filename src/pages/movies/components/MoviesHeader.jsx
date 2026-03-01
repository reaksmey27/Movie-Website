import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MoviesHeader = ({ searchQuery, page, totalPages, genres, selectedGenre, onSearch, onClear, onGenreChange }) => {
    return (
        <div className="flex flex-col gap-10 mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                        {searchQuery ? 'Searching' : 'Explore'} <br />
                        <span className="text-purple-500">{searchQuery ? 'Results' : 'Cinematic'}</span>{' '}
                        {searchQuery ? '' : 'World'}
                    </h1>
                    <p className="text-gray-400 text-sm max-w-sm font-medium">
                        {searchQuery
                            ? `Searching for "${searchQuery}" movies. Page ${page} of ${totalPages}.`
                            : 'Browse through thousands of movies by your favorite genres. Live updates from the global community.'}
                    </p>
                </div>

                <div className="relative w-full md:w-96 group">
                    <MagnifyingGlassIcon className={`absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${searchQuery ? 'text-purple-500' : 'text-gray-500 group-focus-within:text-purple-500'}`} />
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={onSearch}
                        className="w-full bg-white/5 border-2 border-white/5 focus:border-purple-500/50 outline-none text-white px-14 py-4 rounded-2xl font-bold transition-all placeholder:text-gray-600 focus:bg-white/10"
                    />
                    {searchQuery && (
                        <button onClick={onClear} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </div>

            {!searchQuery && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 scroll-smooth">
                    <button
                        onClick={() => onGenreChange(null)}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedGenre === null
                            ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20 scale-105'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 border-white/5 hover:border-white/20'
                        }`}
                    >
                        All
                    </button>
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => onGenreChange(genre.id)}
                            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedGenre === genre.id
                                ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-600/20 scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 border-white/10 hover:border-white/20'
                            }`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MoviesHeader;
