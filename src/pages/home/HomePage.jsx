import React from "react";
import HeroSection from "./components/HeroSection";
import MovieSlider from "./components/MovieSlider";
import HomeContentSection from "./components/HomeContentSection";
import useHomeMovies from "../../hooks/movies/useHomeMovies";
import PageLoader from "../../components/ui/PageLoader";
import PageError from "../../components/ui/PageError";

const HomePage = () => {
  const { movies, loading, error, retry } = useHomeMovies();

  if (loading) {
    return <PageLoader color="border-purple-500" label="Loading Movies..." />;
  }

  return (
    <div id="home" className="min-h-screen bg-slate-950">
      <HeroSection
        trendingMovies={
          movies.featured.length > 0 ? movies.featured : movies.trending
        }
      />

      <div className="relative z-30 mt-8 space-y-10 pb-14 sm:mt-16 sm:space-y-14 sm:pb-20">
        {error && (
          <div className="mx-4 py-2 sm:mx-6 lg:px-24 xl:px-40">
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

        <HomeContentSection />
      </div>
    </div>
  );
};

export default HomePage;
