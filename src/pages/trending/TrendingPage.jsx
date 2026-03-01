import React from 'react';
import { FireIcon } from '@heroicons/react/24/outline';
import useTrendingMovies from '../../hooks/movies/useTrendingMovies';
import MovieGrid from '../../components/ui/MovieGrid';
import PageLoader from '../../components/ui/PageLoader';
import PageError from '../../components/ui/PageError';

const TrendingPage = () => {
    const { movies, loading, error } = useTrendingMovies();

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
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
                    <PageError message={error} buttonLabel="Retry Sync" buttonColor="bg-orange-500 text-white hover:bg-orange-600" icon={FireIcon} iconColor="text-orange-500" borderColor="border-orange-500/10 bg-orange-500/5" />
                ) : loading ? (
                    <PageLoader color="border-orange-600" label="Lighting the fire..." glow="shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
                ) : (
                    <MovieGrid movies={movies} />
                )}
            </div>
        </div>
    );
};

export default TrendingPage;
