import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { PlayCircleIcon, HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

const HeroSection = ({ trendingMovies = [] }) => {
  const FEATURED_MOVIES = trendingMovies.slice(0, 4);
  const { toggleFavorite, isFavorite } = useFavorites();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (FEATURED_MOVIES.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % FEATURED_MOVIES.length);
        setFade(true);
      }, 600);
    }, 8000);

    return () => clearInterval(interval);
  }, [FEATURED_MOVIES.length]);

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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {FEATURED_MOVIES.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentIndex ? "w-10 bg-purple-600" : "w-2 bg-white/30"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;