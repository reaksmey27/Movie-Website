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
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6 text-center">
                <h2 className="text-2xl font-black mb-4 uppercase">Movie not found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 bg-purple-600 rounded-xl font-bold active:scale-95"
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
        <div className="min-h-screen bg-slate-950 relative overflow-x-hidden">
            {!isPlaying && (
                <div className="absolute inset-0 h-[50vh] sm:h-[70vh] w-full">
                    <img
                        src={movie.image}
                        alt=""
                        className="w-full h-full object-cover opacity-20 sm:opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
                </div>
            )}

            <div className={`relative z-10 px-6 sm:px-12 lg:px-24 xl:px-40 ${isPlaying ? 'pt-20 sm:pt-24' : 'pt-24 sm:pt-32'} pb-20`}>
                <button
                    onClick={() => isPlaying ? setIsPlaying(false) : navigate(-1)}
                    className="mb-6 sm:mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 bg-white/5 rounded-xl backdrop-blur-md border border-white/5 active:scale-95"
                >
                    <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
                    <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                        {isPlaying ? 'Close Player' : 'Return'}
                    </span>
                </button>

                {isPlaying ? (
                    <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500">
                        <div className="flex flex-nowrap sm:flex-wrap gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                            {SERVERS.map((server) => (
                                <button
                                    key={server.name}
                                    onClick={() => setActiveServer(server.name)}
                                    className={`flex-shrink-0 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeServer === server.name
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                        }`}
                                >
                                    {server.name}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full aspect-video rounded-xl sm:rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
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
                            <p className="text-[9px] sm:text-[10px] text-purple-300 font-bold uppercase tracking-widest">
                                Tip: Try switching servers if the stream is slow.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 animate-in slide-in-from-left-6 duration-700">
                        <div className="w-full sm:w-[350px] lg:w-96 flex-shrink-0 mx-auto lg:mx-0">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-2xl transition-transform hover:scale-[1.01] duration-500"
                            />
                        </div>

                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter">
                                    {movie.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                                    <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-lg font-black shadow-lg">
                                        <StarIcon className="h-4 w-4" />
                                        <span>{movie.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                        <CalendarIcon className="h-4 w-4 text-purple-600" />
                                        <span>{movie.subtitle}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                        <ClockIcon className="h-4 w-4 text-purple-600" />
                                        <span>{movie.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 text-nowrap overflow-x-hidden">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] opacity-40">Storyline</h3>
                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium max-w-4xl line-clamp-3 selection:bg-purple-600">
                                    {movie.description}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="group flex items-center justify-center gap-4 bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-purple-600/30 active:scale-95"
                                >
                                    <PlayIcon className="h-5 w-5 transition-transform group-hover:scale-125" />
                                    Play Movie
                                </button>

                                <div className="flex gap-4 sm:gap-6">
                                    {movie.trailerKey && (
                                        <button
                                            onClick={() => setShowTrailer(true)}
                                            className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all backdrop-blur-md active:scale-95"
                                        >
                                            Archives
                                        </button>
                                    )}

                                    <button
                                        onClick={() => toggleFavorite(movie)}
                                        className={`flex-shrink-0 flex items-center justify-center px-8 py-5 rounded-2xl transition-all active:scale-95 border-2 ${isFav
                                            ? "bg-red-500/10 border-red-500 text-red-500 shadow-lg shadow-red-500/20"
                                            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                            }`}
                                    >
                                        {isFav ? <HeartIcon className="h-5 w-5" /> : <HeartOutline className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showTrailer && movie.trailerKey && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-10 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
                    <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-[0_0_120px_rgba(168,85,247,0.4)] border border-white/20 animate-in zoom-in duration-500">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[210] p-3 sm:p-4 bg-black/60 hover:bg-red-600 text-white rounded-full transition-all active:scale-90 backdrop-blur-xl border border-white/10 group"
                        >
                            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-90 transition-transform duration-300" />
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
