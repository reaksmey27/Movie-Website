import React, { memo } from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onReset }) => {
    if (movies.length === 0) {
        return (
            <div className="flex min-h-80 flex-col items-center justify-center px-4 text-center sm:min-h-100">
                <h3 className="mb-2 text-2xl font-black uppercase italic tracking-tighter text-white">No Movies Found</h3>
                <p className="text-gray-500 font-medium">Try searching for something else or browse categories.</p>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white shadow-xl shadow-purple-600/20 transition-all hover:bg-purple-500 sm:px-8"
                    >
                        Reset Search
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-x-3 gap-y-6 min-[380px]:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
            {movies.map((movie, index) => (
                <div
                    key={movie.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
};

export default memo(MovieGrid);
