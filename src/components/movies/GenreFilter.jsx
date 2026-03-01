import React from 'react';

const GenreFilter = ({ genres, selectedGenre, handleGenreChange }) => {
    return (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 scroll-smooth">
            <button
                onClick={() => handleGenreChange(null)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedGenre === null
                    ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20 scale-105"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5 hover:border-white/20"
                    }`}
            >
                All
            </button>
            {genres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => handleGenreChange(genre.id)}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedGenre === genre.id
                        ? "bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-600/20 scale-105"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/10 hover:border-white/20"
                        }`}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
};

export default GenreFilter;
