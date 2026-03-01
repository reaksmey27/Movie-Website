import { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdbService';

const useTrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const response = await tmdbService.getTrendingMovies();
                const results = Array.isArray(response) ? response : (response?.results || []);
                if (results.length > 0) {
                    setMovies(results.map(tmdbService.formatMovieData));
                }
            } catch (err) {
                console.error('Error fetching trending movies:', err);
                setError("Unable to spark the trend. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
        window.scrollTo(0, 0);
    }, []);

    return { movies, loading, error };
};

export default useTrendingMovies;
