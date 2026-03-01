import { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdbService';

const useUpcomingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpcoming = async () => {
            setLoading(true);
            try {
                const response = await tmdbService.getUpcomingMovies();
                const results = Array.isArray(response) ? response : (response?.results || []);
                if (results.length > 0) {
                    setMovies(results.map(tmdbService.formatMovieData));
                }
            } catch (err) {
                console.error('Error fetching upcoming movies:', err);
                setError("Could not predict the future. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchUpcoming();
        window.scrollTo(0, 0);
    }, []);

    return { movies, loading, error };
};

export default useUpcomingMovies;
