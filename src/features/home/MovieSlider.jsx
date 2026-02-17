// src/components/MoviesSlide/MovieSlider.jsx
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const MovieSlider = ({ title, movies = [] }) => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [movies]);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <div className="bg-transparent py-12 relative group/slider overflow-hidden">
      <div className="px-4 sm:px-12 lg:px-24 mb-8">
        <h2 className="text-white text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
          {title}
          <span className="h-[2px] w-12 bg-purple-600 rounded-full mt-2 hidden md:block" />
        </h2>
      </div>

      {canScrollLeft && (
        <div 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-[100px] bottom-10 w-16 md:w-24 z-40 flex items-center justify-center cursor-pointer opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
        >
          <div className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all">
            <ChevronLeftIcon className="h-8 w-8" />
          </div>
        </div>
      )}

      {canScrollRight && (
        <div 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-[100px] bottom-10 w-16 md:w-24 z-40 flex items-center justify-center cursor-pointer opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
        >
          <div className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all">
            <ChevronRightIcon className="h-8 w-8" />
          </div>
        </div>
      )}

      <div 
        ref={sliderRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-12 px-4 sm:px-12 lg:px-24"
      >
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="relative min-w-[280px] md:min-w-[400px] aspect-video group cursor-pointer transition-all duration-500 hover:scale-105 hover:z-50"
          >
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-lg group-hover:shadow-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300" 
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl flex flex-col justify-end p-8">
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
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;