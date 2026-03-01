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
              <MovieSlider title={section.title} movies={section.data} />
            </div>
          )
      )}
    </>
  );
};

export default MovieSectionList;
