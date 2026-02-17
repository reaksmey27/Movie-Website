import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import MovieCard from '../../components/ui/MovieCard';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
    const { favorites } = useFavorites();

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col gap-10 mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                                Your <span className="text-red-500 text-6xl">❤</span> <br />
                                <span className="text-purple-500">Favorites</span>
                            </h1>
                            <p className="text-gray-400 text-sm max-w-sm font-medium">
                                Your personal collection of cinematic masterpieces. Ready to watch whenever you are.
                            </p>
                        </div>
                    </div>
                </div>

                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center border-2 border-white/5 bg-white/5 rounded-3xl p-12 backdrop-blur-sm">
                        <HeartIcon className="h-16 w-16 text-gray-600 mb-6" />
                        <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Your list is empty</h3>
                        <p className="text-gray-500 font-medium max-w-sm mb-8">
                            You haven't added any movies to your favorites yet. Start exploring and click the Heart icon!
                        </p>
                        <Link
                            to="/movies"
                            className="px-10 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20 active:scale-95"
                        >
                            Explore Movies
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {favorites.map((movie, index) => (
                            <div
                                key={`${movie.id}-${index}`}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
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

export default FavoritesPage;
