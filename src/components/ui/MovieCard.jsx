import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="relative flex-shrink-0 w-[calc((100%-24px)/4)] h-[400px] md:h-[450px] group cursor-pointer transition-all duration-500 hover:scale-105 hover:z-50">
      <img 
        src={movie.image} 
        alt={movie.title} 
        className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-lg group-hover:shadow-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300" 
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl flex flex-col justify-end p-6">
        <h4 className="text-white font-black text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {movie.title}
        </h4>
        
        <div className="flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          <span className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-bold">
            ★ {movie.rating}
          </span>
          <span className="text-gray-300 text-xs font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5">
            {movie.genres[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;