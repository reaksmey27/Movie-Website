import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { tmdbService } from "../../services/tmdbService";

const useMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const selectedGenre = searchParams.get("genre")
    ? parseInt(searchParams.get("genre"), 10)
    : null;
  const searchQuery = searchParams.get("q") || "";

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  const updateParams = useCallback((updates) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === "" || value === undefined) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        });
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  useEffect(() => {
    let ignore = false;

    const fetchGenres = async () => {
      try {
        const genreData = await tmdbService.getGenres();
        if (!ignore) {
          setGenres(genreData);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching genres:", err);
        }
      }
    };

    fetchGenres();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (searchQuery.trim()) {
          response = await tmdbService.searchMovies(searchQuery, page);
        } else if (selectedGenre) {
          response = await tmdbService.getMoviesByGenre(selectedGenre, page);
        } else {
          response = await tmdbService.discoverMovies(page);
        }

        if (!ignore && response?.results) {
          setMovies(response.results.map(tmdbService.formatMovieData));
          setTotalPages(Math.min(response.total_pages, 100));
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching movies:", err);
          setError("Unable to connect to the movie database. Please check your network.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(fetchMovies, searchQuery ? 500 : 0);
    return () => {
      ignore = true;
      clearTimeout(debounceTimer);
    };
  }, [selectedGenre, page, searchQuery]);

  const handleGenreChange = useCallback((genreId) => {
    updateParams({ genre: genreId, page: 1, q: null });
    setError(null);
  }, [updateParams]);

  const handleSearch = useCallback((value) => {
    updateParams({ q: value, genre: null, page: 1 });
    setError(null);
  }, [updateParams]);

  const clearSearch = useCallback(() => {
    updateParams({ q: null, page: 1 });
    setError(null);
  }, [updateParams]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateParams({ page: newPage });
    }
  }, [totalPages, updateParams]);

  return {
    movies,
    genres,
    selectedGenre,
    searchQuery,
    loading,
    page,
    totalPages,
    error,
    handleGenreChange,
    handleSearch,
    clearSearch,
    handlePageChange,
  };
};

export default useMovies;
