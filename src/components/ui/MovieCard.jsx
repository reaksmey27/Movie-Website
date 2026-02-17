import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

const MovieCard = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative flex-shrink-0 block w-full h-[400px] md:h-[450px] group cursor-pointer transition-all duration-500 hover:scale-105 hover:z-50"
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl group-hover:shadow-purple-500/30 group-hover:border-purple-500/50 transition-all duration-500"
      />

      <button
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 z-50 p-2.5 rounded-xl backdrop-blur-md border transition-all duration-300 active:scale-90 ${isFav
            ? "bg-red-500 border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            : "bg-black/20 border-white/10 text-white hover:bg-white hover:text-black opacity-0 group-hover:opacity-100"
          }`}
      >
        {isFav ? (
          <HeartIcon className="h-5 w-5" />
        ) : (
          <HeartOutline className="h-5 w-5" />
        )}
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl flex flex-col justify-end p-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 delay-100">
          <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white ml-0.5">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-0 space-y-2">
          <h4 className="text-white font-black text-xl md:text-2xl leading-tight line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            {movie.title}
          </h4>

          <div className="flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">
            <span className="flex items-center gap-1 bg-yellow-500 text-black px-1.5 py-0.5 rounded-md text-[10px] font-black shadow-md">
              ★ {movie.rating}
            </span>
            <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-2 py-1 rounded border border-white/10">
              {movie.genres[0]}
            </span>
            <span className="text-gray-400 text-[10px] font-bold ml-auto">{movie.subtitle}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;