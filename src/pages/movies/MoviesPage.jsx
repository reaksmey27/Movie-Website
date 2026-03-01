import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MovieCard, MovieSearchHeader, GenreFilter, Pagination } from '@/components';
import { useMoviesList } from '@/hooks';

const MoviesPage = () => {
    const {
        movies,
        genres,
        selectedGenre,
        searchQuery,
        loading,
        page,
        totalPages,
        error,
        handleGenreChange,
        handleSearch,
        clearSearch,
        handlePageChange
    } = useMoviesList();

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <MovieSearchHeader 
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    clearSearch={clearSearch}
                    page={page}
                    totalPages={totalPages}
                />

                {!searchQuery && (
                    <div className="mb-16">
                        <GenreFilter 
                            genres={genres}
                            selectedGenre={selectedGenre}
                            handleGenreChange={handleGenreChange}
                        />
                    </div>
                )}

                {error ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center border-2 border-red-500/10 bg-red-500/5 rounded-3xl p-12">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                            <XMarkIcon className="h-8 w-8 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Connection Error</h3>
                        <p className="text-gray-500 font-medium max-w-sm">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-8 px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95"
                        >
                            Retry Connection
                        </button>
                    </div>
                ) : loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Updating Feed...</span>
                    </div>
                ) : (
                    <>
                        {movies.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                                {movies.map((movie, index) => (
                                    <div key={`${movie.id}-${index}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <MovieCard movie={movie} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">No Movies Found</h3>
                                <p className="text-gray-500 font-medium">Try searching for something else or browse categories.</p>
                                <button
                                    onClick={clearSearch}
                                    className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20"
                                >
                                    Reset Search
                                </button>
                            </div>
                        )}
                        
                        <Pagination 
                            page={page} 
                            totalPages={totalPages} 
                            handlePageChange={handlePageChange} 
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;
