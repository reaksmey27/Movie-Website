import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MovieCard from "../../../components/ui/MovieCard";

const MovieSlider = ({ title, movies = [] }) => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, movies.length]);

  const handleScroll = useCallback(
    (direction) => {
      if (!sliderRef.current) {
        return;
      }

      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      window.setTimeout(checkScroll, 500);
    },
    [checkScroll],
  );

  return (
    <div className="bg-transparent py-12 relative group/slider overflow-hidden">
      <div className="px-4 sm:px-12 lg:px-24 mb-8">
        <h2 className="text-white text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
          {title}
          <span className="h-[2px] w-12 bg-purple-600 rounded-full mt-2 hidden md:block" />
        </h2>
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-[100px] bottom-10 w-16 md:w-24 z-40 flex items-center justify-center cursor-pointer opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
          aria-label={`Scroll ${title} left`}
        >
          <div className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all">
            <ChevronLeftIcon className="h-8 w-8" />
          </div>
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-[100px] bottom-10 w-16 md:w-24 z-40 flex items-center justify-center cursor-pointer opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
          aria-label={`Scroll ${title} right`}
        >
          <div className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all">
            <ChevronRightIcon className="h-8 w-8" />
          </div>
        </button>
      )}

      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-12 px-4 sm:px-12 lg:px-24"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[260px] md:w-[calc((100%-72px)/4)]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MovieSlider);
