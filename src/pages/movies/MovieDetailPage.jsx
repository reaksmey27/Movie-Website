import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import useMovieDetail from '../../hooks/movies/useMovieDetail';
import MovieInfo from './components/MovieInfo';
import MoviePlayer from './components/MoviePlayer';
import TrailerModal from './components/TrailerModal';
import PageLoader from '../../components/ui/PageLoader';
import PageError from '../../components/ui/PageError';
import { XMarkIcon } from '@heroicons/react/24/outline';

const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();

    const {
        movie, loading, SERVERS,
        showTrailer, setShowTrailer,
        isPlaying, setIsPlaying,
        activeServer, setActiveServer,
        iframeLoading, setIframeLoading,
        playerMessage, currentServerUrl, goToNextServer,
    } = useMovieDetail(id);

    if (loading) {
        return <PageLoader color="border-purple-500" label="Loading Movie Details..." />;
    }

    if (!movie) {
        return (
            <div className="pt-32 pb-20 px-6 sm:px-12 lg:px-24 xl:px-40 min-h-screen bg-slate-950 flex flex-col items-center justify-center">
                <PageError 
                    message="Movie not found" 
                    buttonLabel="Go Back"
                    icon={XMarkIcon}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-x-hidden">
            {!isPlaying && (
                <div className="absolute inset-0 h-[50vh] sm:h-[70vh] w-full">
                    <img
                        src={movie.backdropImage || movie.image}
                        alt=""
                        className="w-full h-full object-cover opacity-20 sm:opacity-30"
                        decoding="async"
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
                    <MoviePlayer
                        SERVERS={SERVERS}
                        activeServer={activeServer}
                        currentServerUrl={currentServerUrl}
                        iframeLoading={iframeLoading}
                        playerMessage={playerMessage}
                        onServerChange={setActiveServer}
                        onIframeLoad={() => setIframeLoading(false)}
                        onIframeError={() => { setIframeLoading(false); }}
                        onNextServer={goToNextServer}
                    />
                ) : (
                    <MovieInfo
                        movie={movie}
                        isFav={isFavorite(movie.id)}
                        onPlay={() => setIsPlaying(true)}
                        onTrailer={() => setShowTrailer(true)}
                        onFavorite={() => toggleFavorite(movie)}
                    />
                )}
            </div>

            {showTrailer && <TrailerModal movie={movie} onClose={() => setShowTrailer(false)} />}
        </div>
    );
};

export default MovieDetailPage;
