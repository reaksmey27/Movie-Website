import React from "react";
import HeroSection from "./components/HeroSection";
import MovieSlider from "./components/MovieSlider";
import useHomeMovies from "../../hooks/movies/useHomeMovies";
import PageLoader from "../../components/ui/PageLoader";
import PageError from "../../components/ui/PageError";

const HomePage = () => {
  const { movies, loading, error, retry } = useHomeMovies();

  if (loading) {
    return <PageLoader color="border-purple-500" label="Loading Movies..." />;
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
            <PageError message={error} buttonLabel="Try Again" onRetry={retry} />
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
