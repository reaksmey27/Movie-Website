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

    const interval = setInterval(handleNext, 8000);

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
    <section className="relative h-screen w-full bg-black flex items-center overflow-hidden">
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${fade ? "opacity-60" : "opacity-0"}`}>
        <img src={movie.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      <div className={`relative z-10 px-4 sm:px-12 lg:px-24 xl:px-40 mt-16 max-w-6xl transition-all duration-700 ease-out transform 
        ${fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6 drop-shadow-2xl">
          {movie.title} <br />
          <span className="text-white/80 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {movie.subtitle}
          </span>
        </h2>


        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className={`${movie.themeColor || 'bg-purple-600'} text-white text-[10px] px-2 py-1 rounded font-black uppercase tracking-widest shadow-lg transition-colors duration-500`}>
            Featured
          </span>
          <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-bold">
            <StarIcon className="h-3 w-3" />
            <span>{movie.rating}</span>
          </div>
          <div className="flex gap-2">
            {movie.genres.map((genre) => (
              <span key={genre} className="bg-white/10 border border-white/10 text-gray-300 px-3 py-0.5 rounded-full text-xs backdrop-blur-sm">
                {genre}
              </span>
            ))}
          </div>
          <span className="text-gray-400 text-sm font-medium">{movie.duration}</span>
        </div>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium line-clamp-3">
          {movie.description}
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            to={`/movie/${movie.id}`}
            className={`group flex items-center gap-3 ${movie.themeColor || 'bg-purple-600'} hover:brightness-110 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl active:scale-95`}
          >
            <PlayCircleIcon className="h-7 w-7 transition-transform group-hover:scale-110" />
            <span className="text-lg">Watch Now</span>
          </Link>

          {movie.trailerKey && (
            <button
              onClick={() => setShowTrailer(true)}
              className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-xl active:scale-95"
            >
              <PlayIcon className="h-6 w-6 text-purple-500 transition-transform group-hover:scale-125" />
              <span className="text-lg">Watch Trailer</span>
            </button>
          )}

          <button
            onClick={() => toggleFavorite(movie)}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-md active:scale-95 border-2 ${isFav
                ? "bg-red-500/20 border-red-500 text-red-500"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
              }`}
          >
            {isFav ? <HeartIcon className="h-6 w-6" /> : <HeartOutline className="h-6 w-6" />}
            <span className="text-lg">{isFav ? "In Favorites" : "Add to Favorites"}</span>
          </button>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center px-4 md:px-10 z-30">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-black/20 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 transition-all active:scale-90 group"
        >
          <ChevronLeftIcon className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 md:px-10 z-30">
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-black/20 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 transition-all active:scale-90 group"
        >
          <ChevronRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
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
            className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentIndex ? "w-10 bg-purple-600 shadow-lg shadow-purple-500/50" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>

      {showTrailer && movie.trailerKey && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.3)] border border-white/10 animate-in zoom-in duration-500">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-6 right-6 z-[210] p-3 bg-black/40 hover:bg-red-500 text-white rounded-full transition-all active:scale-90 backdrop-blur-md border border-white/10 group"
            >
              <XMarkIcon className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0`}
              title={`${movie.title} Official Trailer`}
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
