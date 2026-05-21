import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MovieCard from "../../../components/ui/MovieCard";

const getHeadingId = (title) =>
  `slider-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const MovieSlider = ({ title, movies = [] }) => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const headingId = getHeadingId(title);

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
    <section
      aria-labelledby={headingId}
      className="group/slider relative overflow-hidden bg-transparent py-4 sm:py-10"
    >
      <div className="mb-4 px-4 sm:mb-8 sm:px-6 lg:px-24">
        <h2
          id={headingId}
          className="flex items-center gap-2.5 text-lg font-black tracking-tight text-white sm:gap-3 sm:text-2xl md:text-4xl"
        >
          {title}
          <span className="mt-2 hidden h-0.5 w-12 rounded-full bg-purple-600 md:block" />
        </h2>
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="absolute bottom-10 left-0 top-23 z-40 hidden w-16 cursor-pointer items-center justify-center opacity-0 transition-opacity duration-300 group-hover/slider:opacity-100 md:flex md:w-24"
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
          className="absolute bottom-10 right-0 top-23 z-40 hidden w-16 cursor-pointer items-center justify-center opacity-0 transition-opacity duration-300 group-hover/slider:opacity-100 md:flex md:w-24"
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
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-6 scroll-px-4 scroll-smooth sm:gap-5 sm:px-6 sm:pb-12 sm:scroll-px-6 lg:px-24 lg:scroll-px-24"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[58vw] min-w-[11rem] max-w-[13rem] shrink-0 snap-start min-[360px]:w-[11.5rem] min-[420px]:w-[12.5rem] sm:min-w-[15rem] sm:max-w-[17rem] sm:w-[15.5rem] lg:w-[16rem] xl:w-[17rem]"
          >
            <MovieCard movie={movie} headingLevel="h3" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(MovieSlider);
