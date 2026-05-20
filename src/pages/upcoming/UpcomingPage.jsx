import React from 'react';
import { CalendarDaysIcon, SparklesIcon } from '@heroicons/react/24/outline';
import useUpcomingMovies from '../../hooks/movies/useUpcomingMovies';
import MovieGrid from '../../components/ui/MovieGrid';
import PageLoader from '../../components/ui/PageLoader';
import PageError from '../../components/ui/PageError';

const UpcomingPage = () => {
    const { movies, loading, error } = useUpcomingMovies();

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-20 pt-24 sm:px-12 sm:pb-24 sm:pt-36 lg:px-24 xl:px-40">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <div className="mb-12 flex flex-col gap-4 border-l-4 border-blue-500 pl-4 sm:mb-16 sm:pl-8">
                    <div className="mb-2 flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <SparklesIcon className="h-6 w-6 text-blue-500" />
                        </div>
                        <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">Future Releases</span>
                    </div>
                    <h1 className="text-3xl font-black uppercase leading-none tracking-tighter text-white sm:text-4xl md:text-6xl">
                        Stay <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Ahead of Time</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-sm font-medium">
                        The most anticipated cinematic experiences soon to hit the screens. Mark your calendars.
                    </p>
                </div>

                {error ? (
                    <PageError message={error} buttonLabel="Retry Loading" buttonColor="bg-blue-500 text-white hover:bg-blue-600" icon={CalendarDaysIcon} iconColor="text-blue-500" borderColor="border-blue-500/10 bg-blue-500/5" />
                ) : loading ? (
                    <PageLoader color="border-blue-600" label="Consulting the future..." glow="shadow-[0_0_15px_rgba(37,99,235,0.3)]" />
                ) : (
                    <MovieGrid movies={movies} />
                )}
            </div>
        </div>
    );
};

export default UpcomingPage;
