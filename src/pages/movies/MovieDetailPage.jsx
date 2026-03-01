import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useMovie, usePlayer } from '@/hooks';
import { MovieHero, MovieInfo, VideoPlayer, ActionButtons, TrailerModal } from '@/components';

const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useAuth();
    const [showTrailer, setShowTrailer] = useState(false);

    const { movie, loading, error } = useMovie(id);
    const player = usePlayer(id);
    const { isPlaying, setIsPlaying } = player;

    const isFav = movie && favorites.some(fav => fav.id === movie.id);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Loading Movie...</span>
                </div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-black text-white mb-4 uppercase italic tracking-tighter">Movie Not Available</h1>
                <p className="text-gray-500 max-w-md mb-8">{error || "The movie you're looking for could not be found."}</p>
                <button
                    onClick={() => navigate('/movies')}
                    className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all shadow-xl active:scale-95"
                >
                    Back to Explore
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white relative">
            <MovieHero movieImage={movie.mainImage} isPlaying={isPlaying} />

            <div className="relative z-10 pt-32 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40">
                <div className="max-w-[1400px] mx-auto">
                    {isPlaying ? (
                        <VideoPlayer player={player} movieId={id} />
                    ) : (
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                            <div className="lg:col-span-8 space-y-12">
                                <MovieInfo movie={movie} />
                                <ActionButtons 
                                    movie={movie}
                                    isFav={isFav}
                                    toggleFavorite={toggleFavorite}
                                    setIsPlaying={setIsPlaying}
                                    setShowTrailer={setShowTrailer}
                                />
                            </div>

                            <div className="lg:col-span-4 hidden lg:block">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-purple-600/20 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="relative w-full rounded-[2.5rem] shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showTrailer && <TrailerModal movie={movie} setShowTrailer={setShowTrailer} />}
        </div>
    );
};

export default MovieDetailPage;
