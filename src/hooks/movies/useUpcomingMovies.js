import { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdbService';
import { Retrier } from "@humanwhocodes/retry";

const retrier = new Retrier((error) => {
    // Retry on network errors
    return !window.navigator.onLine || error.message?.includes('fetch');
}, { timeout: 30_000 });

const useUpcomingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpcoming = async () => {
            setLoading(true);
            try {
                const response = await retrier.retry(() => tmdbService.getUpcomingMovies());
                const results = Array.isArray(response) ? response : (response?.results || []);
                if (results.length > 0) {
                    setMovies(results.map(tmdbService.formatMovieData));
                }
            } catch (err) {
                console.error('Error fetching upcoming movies:', err);
                let errorMessage = "Could not predict the future.";

                if (err.message?.includes('Invalid API key') || err.message?.includes('401')) {
                    errorMessage = "Invalid TMDB API key. Please update your VITE_TMDB_API_KEY in the .env file.";
                } else if (err.message?.includes('Network error') || err.message?.includes('Failed to fetch')) {
                    errorMessage = "Network error. Please check your connection.";
                }

                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcoming();
    }, []);

    return { movies, loading, error };
};

export default useUpcomingMovies;
