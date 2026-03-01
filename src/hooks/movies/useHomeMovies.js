import { useState, useEffect } from "react";
import { tmdbService } from "../../services/tmdbService";

const FEATURED_IDS = [299534, 19995, 1175942, 122];

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

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);

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
        ]);

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

  return { movies, loading, error };
};

export default useHomeMovies;
