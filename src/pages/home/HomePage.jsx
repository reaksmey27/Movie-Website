import { memo } from "react";

import HeroSection from "./components/HeroSection";
import MovieSlider from "./components/MovieSlider";
import HomePageSkeleton from "./components/HomePageSkeleton";

import useHomeMovies from "../../hooks/movies/useHomeMovies";

const HomePage = () => {
  const { movies, loading, error, retry } = useHomeMovies();

  if (loading) return <HomePageSkeleton />;

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-4 py-16 sm:px-6">
        <section className="mx-auto max-w-2xl space-y-4">
          <h1 className="text-2xl font-black">Failed to load movies</h1>
          <p className="text-slate-300">{String(error)}</p>
          <button
            type="button"
            onClick={retry}
            className="rounded-xl bg-purple-600 px-5 py-3 font-black hover:bg-purple-500 active:scale-95"
          >
            Retry
          </button>
        </section>
      </main>
    );
  }

  return (
    <main id="home" className="min-h-screen bg-slate-950">
      <HeroSection trendingMovies={movies.trending || []} />

      <div className="relative z-30 mt-8 space-y-10 pb-14 sm:mt-16 sm:space-y-14 sm:pb-20">
        {movies.topRated?.length > 0 && (
          <MovieSlider title="Top Rated" movies={movies.topRated} />
        )}
        {movies.nowPlaying?.length > 0 && (
          <MovieSlider title="Now Playing" movies={movies.nowPlaying} />
        )}
        {movies.trending?.length > 0 && (
          <MovieSlider title="Trending" movies={movies.trending} />
        )}
        {movies.upcoming?.length > 0 && (
          <MovieSlider title="Upcoming" movies={movies.upcoming} />
        )}

        {movies.action?.length > 0 && (
          <MovieSlider title="Action" movies={movies.action} />
        )}
        {movies.sciFi?.length > 0 && (
          <MovieSlider title="Sci-Fi" movies={movies.sciFi} />
        )}
        {movies.comedy?.length > 0 && (
          <MovieSlider title="Comedy" movies={movies.comedy} />
        )}
        {movies.animation?.length > 0 && (
          <MovieSlider title="Animation" movies={movies.animation} />
        )}
        {movies.crime?.length > 0 && (
          <MovieSlider title="Crime" movies={movies.crime} />
        )}
        {movies.fantasy?.length > 0 && (
          <MovieSlider title="Fantasy" movies={movies.fantasy} />
        )}
      </div>
    </main>
  );
};

export default memo(HomePage);
