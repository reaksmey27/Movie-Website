import { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdbService';

const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

    // Fetch genres once on mount
    useEffect(() => {
        const fetchGenres = async () => {
            const genreData = await tmdbService.getGenres();
            setGenres(genreData);
        };
        fetchGenres();
    }, []);

    // Fetch movies whenever search, genre, or page changes
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let response;
                if (searchQuery.trim()) {
                    response = await tmdbService.searchMovies(searchQuery, page);
                } else if (selectedGenre) {
                    response = await tmdbService.getMoviesByGenre(selectedGenre, page);
                } else {
                    response = await tmdbService.discoverMovies(page);
                }

                if (response && response.results) {
                    setMovies(response.results.map(tmdbService.formatMovieData));
                    setTotalPages(Math.min(response.total_pages, 100));
                }

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (err) {
                console.error('Error fetching movies:', err);
                setError('Unable to connect to the movie database. Please check your network.');
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchMovies, searchQuery ? 500 : 0);
        return () => clearTimeout(debounceTimer);
    }, [selectedGenre, page, searchQuery]);

    const handleGenreChange = (genreId) => {
        setSearchQuery('');
        setSelectedGenre(genreId);
        setPage(1);
        setError(null);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setSelectedGenre(null);
        setPage(1);
        setError(null);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setPage(1);
        setError(null);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

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
