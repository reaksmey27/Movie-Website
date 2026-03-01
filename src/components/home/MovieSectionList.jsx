import React from "react";
import MovieSlider from "./MovieSlider";

const MovieSectionList = ({ movies }) => {
  const sections = [
    { title: "Trending Feed", data: movies.trending },
    { title: "Upcoming Soon", data: movies.upcoming },
    { title: "Top Rated", data: movies.topRated },
    { title: "High Octane", data: movies.action },
    { title: "Cyberpunk & Sci-Fi", data: movies.sciFi },
    { title: "Late Night Comedy", data: movies.comedy },
    { title: "Digital Arts", data: movies.animation },
    { title: "Underworld Stories", data: movies.crime },
    { title: "Magic & Realms", data: movies.fantasy },
  ];

  return (
    <>
      {sections.map(
        (section, index) =>
          section.data.length > 0 && (
            <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <h2 className="text-white text-xs sm:text-sm font-black uppercase tracking-[0.5em] italic opacity-60">
                  {section.title}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
              <MovieSlider movies={section.data} />
            </div>
          )
      )}
    </>
  );
};

export default MovieSectionList;
