import React, { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdbService';
import MovieCard from '../../components/ui/MovieCard';
import { FireIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TrendingPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const response = await tmdbService.getTrendingMovies();
                // Trending returns an array or object with results
                const results = Array.isArray(response) ? response : (response?.results || []);

                if (results.length > 0) {
                    setMovies(results.map(tmdbService.formatMovieData));
                }
            } catch (err) {
                console.error("Error fetching trending movies:", err);
                setError("Unable to spark the trend. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col gap-4 mb-16">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                            <FireIcon className="h-6 w-6 text-orange-500" />
                        </div>
                        <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px]">On Fire Today</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        Trending <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Masterpieces</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-sm font-medium">
                        The most watched and talked about movies in the last 24 hours. Updated in real-time.
                    </p>
                </div>

                {error ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center border-2 border-orange-500/10 bg-orange-500/5 rounded-3xl p-12">
                        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
                            <FireIcon className="h-8 w-8 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Sync Error</h3>
                        <p className="text-gray-500 font-medium max-w-sm">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-8 px-10 py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                        >
                            Retry Sync
                        </button>
                    </div>
                ) : loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(249,115,22,0.3)]"></div>
                        <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Lighting the fire...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {movies.map((movie, index) => (
                            <div
                                key={`${movie.id}-${index}`}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingPage;
