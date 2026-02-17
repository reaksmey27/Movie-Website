import React, { useState, useEffect, useCallback } from 'react';
import { tmdbService } from '../../services/tmdbService';
import MovieCard from '../../components/ui/MovieCard';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            const genreData = await tmdbService.getGenres();
            setGenres(genreData);
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let response;
                if (searchQuery.trim()) {
                    response = await tmdbService.searchMovies(searchQuery, page);
                } else if (selectedGenre) {
                    response = await tmdbService.getMoviesByGenre(selectedGenre, page);
                } else {
                    response = await tmdbService.discoverMovies(page);
                }

                if (response && response.results) {
                    const formattedMovies = response.results.map(tmdbService.formatMovieData);
                    setMovies(formattedMovies);
                    setTotalPages(Math.min(response.total_pages, 100));
                }

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error("Error fetching movies:", error);
                setError("Unable to connect to the movie database. Please check your network.");
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchMovies, searchQuery ? 500 : 0);
        return () => clearTimeout(debounceTimer);
    }, [selectedGenre, page, searchQuery]);

    const handleGenreChange = (genreId) => {
        setSearchQuery('');
        setSelectedGenre(genreId);
        setPage(1);
        setError(null);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setSelectedGenre(null);
        setPage(1);
        setError(null);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setPage(1);
        setError(null);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderPagination = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex items-center justify-center gap-3 mt-24">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`p-3 rounded-xl border-2 border-white/10 transition-all ${page === 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:bg-white/10 text-white hover:border-white/20'
                        }`}
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>

                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="w-14 h-14 rounded-xl border-2 border-white/10 text-white hover:border-white/20 hover:bg-white/10 transition-all text-lg font-black"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="text-gray-500 font-black px-2 text-xl">...</span>}
                    </>
                )}

                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`w-14 h-14 rounded-xl font-black transition-all text-lg ${page === num
                            ? "bg-purple-600 text-white shadow-2xl shadow-purple-600/40 border-2 border-purple-500 scale-110 z-10"
                            : "border-2 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                            }`}
                    >
                        {num}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="text-gray-500 font-black px-2 text-xl">...</span>}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="w-14 h-14 rounded-xl border-2 border-white/10 text-white hover:border-white/20 hover:bg-white/10 transition-all text-lg font-black"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`p-3 rounded-xl border-2 border-white/10 transition-all ${page === totalPages ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:bg-white/10 text-white hover:border-white/20'
                        }`}
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col gap-10 mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                                {searchQuery ? 'Searching' : 'Explore'} <br />
                                <span className="text-purple-500">
                                    {searchQuery ? 'Results' : 'Cinematic'}
                                </span> {searchQuery ? '' : 'World'}
                            </h1>
                            <p className="text-gray-400 text-sm max-w-sm font-medium">
                                {searchQuery ? `Searching for "${searchQuery}" movies. Page ${page} of ${totalPages}.` : 'Browse through thousands of movies by your favorite genres. Live updates from the global community.'}
                            </p>
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <MagnifyingGlassIcon className={`absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${searchQuery ? 'text-purple-500' : 'text-gray-500 group-focus-within:text-purple-500'}`} />
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full bg-white/5 border-2 border-white/5 focus:border-purple-500/50 outline-none text-white px-14 py-4 rounded-2xl font-bold transition-all placeholder:text-gray-600 focus:bg-white/10"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    </div>

                    {!searchQuery && (
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
                    )}
                </div>

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
                        {totalPages > 1 && renderPagination()}
                    </>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;
