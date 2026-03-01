import { useState, useEffect } from 'react';
import { tmdbService } from '@/services/tmdbService';

export const useMovie = (id) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovieDetails = async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const data = await tmdbService.getMovieDetails(id);
            if (data) {
                setMovie(tmdbService.formatMovieData(data));
            } else {
                setError('Movie not found');
            }
        } catch (err) {
            console.error("Error fetching movie details:", err);
            setError(err.message || 'Failed to fetch movie');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
        window.scrollTo(0, 0);
    }, [id]);

    return { movie, loading, error, refreshMovie: fetchMovieDetails };
};
