import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import MovieSlider from "./MovieSlider";
import { tmdbService } from "../../services/tmdbService";

const HomePage = () => {
  const [movies, setMovies] = useState({
    featured: [],
    trending: [],
    upcoming: [],
    topRated: [],
    action: [],
    sciFi: [],
    comedy: [],
    animation: [],
    crime: [],
    fantasy: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);

        const curatedIds = [
          299534,
          19995, 
          1175942, 
          122, 
        ];

        const [
          featuredRes,
          trendingData,
          upcomingData,
          topRatedData,
          actionRes,
          sciFiRes,
          comedyRes,
          animationRes,
          crimeRes,
          fantasyRes,
        ] = await Promise.all([
          tmdbService.getMoviesByIds(curatedIds),
          tmdbService.getTrendingMovies(),
          tmdbService.getUpcomingMovies(),
          tmdbService.getTopRatedMovies(),
          tmdbService.getMoviesByGenre(28),
          tmdbService.getMoviesByGenre(878),
          tmdbService.getMoviesByGenre(35),
          tmdbService.getMoviesByGenre(16),
          tmdbService.getMoviesByGenre(80),
          tmdbService.getMoviesByGenre(14),
        ]);

        // Helper to extract results array
        const getResults = (data) => {
          if (!data) return [];
          if (Array.isArray(data)) return data;
          return data.results || [];
        };

        setMovies({
          featured: featuredRes.map(tmdbService.formatMovieData),
          trending: getResults(trendingData).map(tmdbService.formatMovieData),
          upcoming: getResults(upcomingData).map(tmdbService.formatMovieData),
          topRated: getResults(topRatedData).map(tmdbService.formatMovieData),
          action: getResults(actionRes).map(tmdbService.formatMovieData),
          sciFi: getResults(sciFiRes).map(tmdbService.formatMovieData),
          comedy: getResults(comedyRes).map(tmdbService.formatMovieData),
          animation: getResults(animationRes).map(tmdbService.formatMovieData),
          crime: getResults(crimeRes).map(tmdbService.formatMovieData),
          fantasy: getResults(fantasyRes).map(tmdbService.formatMovieData),
        });
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to sync with cinematic database.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

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
