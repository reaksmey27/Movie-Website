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
    <div className="group/slider relative overflow-hidden bg-transparent py-6 sm:py-12">
      <div className="mb-5 px-4 sm:mb-8 sm:px-12 lg:px-24">
        <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight text-white md:text-4xl">
          {title}
          <span className="h-[2px] w-12 bg-purple-600 rounded-full mt-2 hidden md:block" />
        </h2>
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="absolute bottom-10 left-0 top-[92px] z-40 hidden w-16 cursor-pointer items-center justify-center opacity-0 transition-opacity duration-300 group-hover/slider:opacity-100 md:flex md:w-24"
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
          className="absolute bottom-10 right-0 top-[92px] z-40 hidden w-16 cursor-pointer items-center justify-center opacity-0 transition-opacity duration-300 group-hover/slider:opacity-100 md:flex md:w-24"
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
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 scroll-smooth sm:gap-6 sm:px-12 sm:pb-12 lg:px-24"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[72vw] max-w-[220px] flex-shrink-0 snap-start min-[420px]:w-[220px] lg:w-[calc((100%-72px)/4)]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MovieSlider);
