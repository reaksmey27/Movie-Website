import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService } from '../../services/tmdbService';
import { useFavorites } from '../../context/FavoritesContext';
import { PlayIcon, HeartIcon, StarIcon, ClockIcon, CalendarIcon, ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeServer, setActiveServer] = useState('Server 1');

    const SERVERS = [
        { name: 'Server 1', url: (id) => `https://vidsrc.pro/embed/movie/${id}` },
        { name: 'Server 2', url: (id) => `https://vidsrc.cc/v2/embed/movie/${id}` },
    ];

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
    const currentServer = SERVERS.find(s => s.name === activeServer) || SERVERS[0];
    const currentServerUrl = currentServer.url(movie.id);

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Backdrop Image with Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 h-[70vh] w-full">
                    <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
                </div>
            )}

            <div className={`relative z-10 px-4 sm:px-12 lg:px-24 xl:px-40 ${isPlaying ? 'pt-24' : 'pt-32'} pb-20`}>
                {/* Back Button */}
                <button
                    onClick={() => isPlaying ? setIsPlaying(false) : navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 bg-white/5 rounded-xl backdrop-blur-md"
                >
                    <ChevronLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <span className="font-bold uppercase tracking-widest text-xs">
                        {isPlaying ? 'Close Player' : 'Return'}
                    </span>
                </button>

                {isPlaying ? (
                    <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500">
                        {/* Simple Server Switcher */}
                        <div className="flex flex-wrap gap-3">
                            {SERVERS.map((server) => (
                                <button
                                    key={server.name}
                                    onClick={() => setActiveServer(server.name)}
                                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeServer === server.name
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {server.name}
                                </button>
                            ))}
                        </div>
                        {/* Video Player */}
                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl transition-all duration-500">
                            <iframe
                                src={currentServerUrl}
                                className="w-full h-full"
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen
                                title="Cinema Player"
                            ></iframe>
                        </div>

                        <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl flex items-center gap-3">
                            <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                            <p className="text-[10px] text-purple-300 font-bold uppercase tracking-widest">
                                Tip: Select a different server if the player doesn't load.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12 animate-in slide-in-from-left-10 duration-700">
                        {/* Poster */}
                        <div className="hidden lg:block w-80 flex-shrink-0">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02] duration-500"
                            />
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1 space-y-8 mt-10 lg:mt-0">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter">
                                    {movie.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <span className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-lg font-black shadow-lg">
                                        <StarIcon className="h-4 w-4" />
                                        {movie.rating}
                                    </span>
                                    <span className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[10px] bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                        <CalendarIcon className="h-4 w-4" />
                                        {movie.subtitle}
                                    </span>
                                    <span className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[10px] bg-white/5 px-3 py-1 rounded-lg border border-white/5">
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
                                        className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-white font-black uppercase tracking-widest text-[10px] opacity-40">The Storyline</h3>
                                <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium max-w-3xl line-clamp-6">
                                    {movie.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-5 pt-4">
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="group flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-purple-600/30 active:scale-95"
                                >
                                    <PlayIcon className="h-5 w-5 transition-transform group-hover:scale-125" />
                                    Begin Streaming
                                </button>

                                {movie.trailerKey && (
                                    <button
                                        onClick={() => setShowTrailer(true)}
                                        className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all backdrop-blur-md active:scale-95"
                                    >
                                        Archives
                                    </button>
                                )}

                                <button
                                    onClick={() => toggleFavorite(movie)}
                                    className={`flex items-center gap-3 border-2 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 ${isFav
                                        ? "bg-red-500/10 border-red-500 text-red-500 shadow-lg shadow-red-500/20"
                                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                        }`}
                                >
                                    {isFav ? <HeartIcon className="h-5 w-5" /> : <HeartOutline className="h-5 w-5" />}
                                    {isFav ? "Saved" : "Favorite"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Trailer Modal */}
            {showTrailer && movie.trailerKey && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500">
                    <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.3)] border border-white/20 animate-in zoom-in duration-500">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-6 right-6 z-[210] p-3 bg-black/40 hover:bg-red-500 text-white rounded-full transition-all active:scale-90 backdrop-blur-md border border-white/10 group"
                        >
                            <XMarkIcon className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0`}
                            title={`${movie.title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetailPage;
