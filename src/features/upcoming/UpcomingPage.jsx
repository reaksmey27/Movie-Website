import React, { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdbService';
import MovieCard from '../../components/ui/MovieCard';
import { CalendarDaysIcon, SparklesIcon } from '@heroicons/react/24/outline';

const UpcomingPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpcoming = async () => {
            setLoading(true);
            try {
                const response = await tmdbService.getUpcomingMovies();
                const results = Array.isArray(response) ? response : (response?.results || []);

                if (results.length > 0) {
                    setMovies(results.map(tmdbService.formatMovieData));
                }
            } catch (err) {
                console.error("Error fetching upcoming movies:", err);
                setError("Could not predict the future. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchUpcoming();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col gap-4 mb-16 border-l-4 border-blue-500 pl-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <SparklesIcon className="h-6 w-6 text-blue-500" />
                        </div>
                        <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">Future Releases</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        Stay <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Ahead of Time</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-sm font-medium">
                        The most anticipated cinematic experiences soon to hit the screens. Mark your calendars.
                    </p>
                </div>

                {error ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center border-2 border-blue-500/10 bg-blue-500/5 rounded-3xl p-12">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                            <CalendarDaysIcon className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Timeline Error</h3>
                        <p className="text-gray-500 font-medium max-w-sm">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-8 px-10 py-4 bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                        >
                            Retry Loading
                        </button>
                    </div>
                ) : loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(37,99,235,0.3)]"></div>
                        <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Consulting the future...</span>
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

export default UpcomingPage;
