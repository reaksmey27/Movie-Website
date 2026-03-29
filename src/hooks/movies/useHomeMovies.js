import { useState, useEffect, useCallback } from "react";
import { tmdbService } from "../../services/tmdbService";
import { Retrier } from "@humanwhocodes/retry";

const FEATURED_IDS = [299534, 19995, 1175942, 122];

const retrier = new Retrier((error) => {
  // Retry on network errors, timeouts, or if the browser is offline
  return !window.navigator.onLine || error.name === 'AbortError' || error.message?.includes('fetch');
}, { timeout: 30_000 });

const useHomeMovies = () => {
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

  const fetchAllMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await retrier.retry(() =>
        Promise.all([
          tmdbService.getMoviesByIds(FEATURED_IDS),
          tmdbService.getTrendingMovies(),
          tmdbService.getUpcomingMovies(),
          tmdbService.getTopRatedMovies(),
          tmdbService.getMoviesByGenre(28),
          tmdbService.getMoviesByGenre(878),
          tmdbService.getMoviesByGenre(35),
          tmdbService.getMoviesByGenre(16),
          tmdbService.getMoviesByGenre(80),
          tmdbService.getMoviesByGenre(14),
        ])
      );

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
      ] = data;

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
      let errorMessage = err.message || "Failed to sync with cinematic database.";

      // Provide more helpful error messages
      if (err.message?.includes('Invalid API key') || err.message?.includes('401')) {
        errorMessage = "Invalid TMDB API key. Please update your VITE_TMDB_API_KEY in the .env file with a valid key from https://www.themoviedb.org/settings/api";
      } else if (err.message?.includes('Network error') || err.message?.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your internet connection or try using a VPN.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  return { movies, loading, error, retry: fetchAllMovies };
};

export default useHomeMovies;
