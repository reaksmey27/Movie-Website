import React from "react";
import HeroSection from "./HeroSection";
import MovieSlider from "./MovieSlider";
import useHomeMovies from "../../hooks/movies/useHomeMovies";

const HomePage = () => {
  const { movies, loading, error } = useHomeMovies();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
      </div>
    );
  }

  return (
    <div id="home" className="bg-slate-950 min-h-screen">
      <HeroSection
        trendingMovies={
          movies.featured.length > 0 ? movies.featured : movies.trending
        }
      />

      <div className="relative z-30 mt-20 pb-20 space-y-16">
        {error && (
          <div className="mx-4 sm:mx-12 lg:px-24 xl:px-40 py-2">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {error}
            </div>
          </div>
        )}

        {movies.trending.length > 0 && (
          <MovieSlider title="Trending Now" movies={movies.trending} />
        )}
        {movies.upcoming.length > 0 && (
          <MovieSlider title="Upcoming Movies" movies={movies.upcoming} />
        )}
        {movies.topRated.length > 0 && (
          <MovieSlider title="Top Rated" movies={movies.topRated} />
        )}
        {movies.sciFi.length > 0 && (
          <MovieSlider title="Sci-Fi" movies={movies.sciFi} />
        )}
        {movies.action.length > 0 && (
          <MovieSlider title="Action" movies={movies.action} />
        )}
        {movies.comedy.length > 0 && (
          <MovieSlider title="Comedy" movies={movies.comedy} />
        )}
        {movies.animation.length > 0 && (
          <MovieSlider title="Animation" movies={movies.animation} />
        )}
        {movies.crime.length > 0 && (
          <MovieSlider title="Crime" movies={movies.crime} />
        )}
        {movies.fantasy.length > 0 && (
          <MovieSlider title="Fantasy" movies={movies.fantasy} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
