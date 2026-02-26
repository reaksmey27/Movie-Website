import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { PlayCircleIcon, HeartIcon, StarIcon, PlayIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

const HeroSection = ({ trendingMovies = [] }) => {
  const FEATURED_MOVIES = trendingMovies.slice(0, 4);
  const { toggleFavorite, isFavorite } = useFavorites();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (FEATURED_MOVIES.length === 0 || showTrailer) return;

    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [FEATURED_MOVIES.length, showTrailer]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_MOVIES.length);
      setFade(true);
    }, 600);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? FEATURED_MOVIES.length - 1 : prev - 1));
      setFade(true);
    }, 600);
  };

  if (FEATURED_MOVIES.length === 0) return null;

  const movie = FEATURED_MOVIES[currentIndex];
  const isFav = isFavorite(movie.id);

  return (
    <section className="relative min-h-[90vh] sm:h-screen w-full bg-black flex items-center overflow-hidden">
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${fade ? "opacity-60" : "opacity-0"}`}>
        <img src={movie.image} alt="" className="w-full h-full object-cover sm:object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />
      </div>

      <div className={`relative z-10 px-6 sm:px-12 lg:px-24 xl:px-40 mt-32 sm:mt-16 max-w-7xl transition-all duration-700 ease-out transform 
        ${fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-4 sm:mb-6 drop-shadow-2xl">
          {movie.title} <br className="hidden sm:block" />
          <span className="text-white/60 text-lg sm:text-3xl lg:text-4xl font-bold tracking-tight block sm:inline mt-2 sm:mt-0">
            {movie.subtitle}
          </span>
        </h2>


        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <span className="bg-purple-600 text-white text-[9px] sm:text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-widest shadow-lg">
            Featured
          </span>
          <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-black">
            <StarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{movie.rating}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {movie.genres.slice(0, 2).map((genre) => (
              <span key={genre} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                {genre}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-400 text-base sm:text-xl max-w-2xl mb-8 sm:mb-12 leading-relaxed font-medium line-clamp-3">
          {movie.description}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
          <Link
            to={`/movie/${movie.id}`}
            className="group flex items-center justify-center gap-4 bg-purple-600 hover:bg-purple-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-all shadow-xl shadow-purple-600/20 active:scale-95"
          >
            <PlayCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
            <span>Watch Now</span>
          </Link>

          <div className="flex items-center gap-4">
            {movie.trailerKey && (
              <button
                onClick={() => setShowTrailer(true)}
                className="flex-1 group flex items-center justify-center gap-3 sm:gap-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-all backdrop-blur-xl active:scale-95"
              >
                <div className="bg-purple-600/20 p-1.5 sm:p-2 rounded-full">
                  <PlayIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 transition-transform group-hover:scale-125" />
                </div>
                <span>Trailer</span>
              </button>
            )}

            <button
              onClick={() => toggleFavorite(movie)}
              className={`flex-shrink-0 flex items-center justify-center gap-4 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black transition-all backdrop-blur-xl active:scale-95 border-2 ${isFav
                ? "bg-red-500/20 border-red-500 text-red-500 shadow-lg shadow-red-500/20"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
            >
              {isFav ? <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" /> : <HeartOutline className="h-5 w-5 sm:h-6 sm:w-6" />}
              <span className="hidden sm:inline uppercase tracking-[0.2em] text-[10px] sm:text-xs">Favorite</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 hidden lg:flex items-center px-10 z-30">
        <button
          onClick={handlePrev}
          className="p-3 sm:p-4 rounded-full bg-black/20 border border-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 hidden lg:flex items-center px-10 z-30">
        <button
          onClick={handleNext}
          className="p-3 sm:p-4 rounded-full bg-black/20 border border-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>

      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 sm:gap-4">
        {FEATURED_MOVIES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrentIndex(idx);
                setFade(true);
              }, 400);
            }}
            className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentIndex ? "w-10 sm:w-14 bg-purple-600 shadow-lg shadow-purple-500/50" : "w-2 sm:w-3 bg-white/20"
              }`}
          />
        ))}
      </div>

      {showTrailer && movie.trailerKey && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-10 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-xl sm:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.3)] border border-white/10 animate-in zoom-in duration-500">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[210] p-2 sm:p-3 bg-black/40 hover:bg-red-500 text-white rounded-full transition-all active:scale-90 backdrop-blur-md border border-white/10 group"
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
    </section>
  );
};

export default HeroSection;