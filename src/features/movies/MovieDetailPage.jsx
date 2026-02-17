import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService } from '../../services/tmdbService';
import { useFavorites } from '../../context/FavoritesContext';
import { PlayIcon, HeartIcon, StarIcon, ClockIcon, CalendarIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = await tmdbService.getMovieDetails(id);
                if (data) {
                    setMovie(tmdbService.formatMovieData(data));
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
                <h2 className="text-2xl font-black mb-4 uppercase">Movie not found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 bg-purple-600 rounded-xl font-bold"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const isFav = isFavorite(movie.id);

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Backdrop Image with Overlay */}
            <div className="absolute inset-0 h-[70vh] w-full">
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 px-4 sm:px-12 lg:px-24 xl:px-40 pt-32 pb-20">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ChevronLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <span className="font-bold uppercase tracking-widest text-xs">Return</span>
                </button>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Poster - hidden on smaller screens, shown on desktop */}
                    <div className="hidden lg:block w-80 flex-shrink-0">
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 space-y-8 mt-10 lg:mt-0">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter">
                                {movie.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <span className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-black">
                                    <StarIcon className="h-4 w-4" />
                                    {movie.rating}
                                </span>
                                <span className="flex items-center gap-2 text-gray-400 font-bold">
                                    <CalendarIcon className="h-4 w-4" />
                                    {movie.subtitle}
                                </span>
                                <span className="flex items-center gap-2 text-gray-400 font-bold">
                                    <ClockIcon className="h-4 w-4" />
                                    {movie.duration}
                                </span>
                            </div>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-white font-black uppercase tracking-widest text-xs opacity-50">Overview</h3>
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium max-w-3xl">
                                {movie.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-5 pt-4">
                            <button className="flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-purple-600/20 active:scale-95">
                                <PlayIcon className="h-5 w-5" />
                                Watch Trailer
                            </button>
                            <button
                                onClick={() => toggleFavorite(movie)}
                                className={`flex items-center gap-3 border-2 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95 ${isFav
                                        ? "bg-red-500/10 border-red-500 text-red-500 shadow-lg shadow-red-500/20"
                                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    }`}
                            >
                                {isFav ? (
                                    <HeartIcon className="h-5 w-5 text-red-500" />
                                ) : (
                                    <HeartOutline className="h-5 w-5" />
                                )}
                                {isFav ? "Saved" : "Favorite"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
