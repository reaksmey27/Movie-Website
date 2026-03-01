import React from 'react';
import MovieCard from '../../../components/ui/MovieCard';

const MovieGrid = ({ movies, onReset }) => {
    if (movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">No Movies Found</h3>
                <p className="text-gray-500 font-medium">Try searching for something else or browse categories.</p>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20"
                    >
                        Reset Search
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {movies.map((movie, index) => (
                <div
                    key={`${movie.id}-${index}`}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
};

export default MovieGrid;
