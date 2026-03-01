const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const fetchFromTMDB = async (endpoint, params = {}) => {
    const queryParams = new URLSearchParams({
        api_key: API_KEY,
        ...params,
    });

    const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status}`);
    }
    return await response.json();
};


export const tmdbService = {
    getTrendingMovies: async () => {
        const data = await fetchFromTMDB('/trending/movie/day');
        return data?.results || [];
    },

    getPopularMovies: async () => {
        const data = await fetchFromTMDB('/movie/popular');
        return data?.results || [];
    },

    discoverMovies: async (page = 1) => {
        return await fetchFromTMDB('/discover/movie', { page });
    },

    getMoviesByGenre: async (genreId, page = 1) => {
        return await fetchFromTMDB('/discover/movie', { with_genres: genreId, page });
    },

    getGenres: async () => {
        const data = await fetchFromTMDB('/genre/movie/list');
        return data.genres;
    },

    getUpcomingMovies: async () => {
        const data = await fetchFromTMDB('/movie/upcoming');
        return data?.results || [];
    },

    getTopRatedMovies: async () => {
        const data = await fetchFromTMDB('/movie/top_rated');
        return data?.results || [];
    },

    getMovieDetails: async (movieId) => {
        return await fetchFromTMDB(`/movie/${movieId}`, { append_to_response: 'videos,credits' });
    },

    searchMovies: async (query, page = 1) => {
        return await fetchFromTMDB('/search/movie', { query, page });
    },

    getMoviesByIds: async (movieIds) => {
        const fetchPromises = movieIds.map(id =>
            fetchFromTMDB(`/movie/${id}`, { append_to_response: 'videos,credits' }).catch(() => null)
        );
        const results = await Promise.all(fetchPromises);
        return results.filter(Boolean);
    },

    getImageUrl: (path) => path ? `${IMAGE_BASE_URL}${path}` : null,

    GENRE_MAP: {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western",
    },

    formatMovieData: (movie) => {
        const trailer = movie.videos?.results?.find(
            vid => vid.type === 'Trailer' && vid.site === 'YouTube'
        );

        return {
            id: movie.id,
            title: movie.title || movie.name,
            subtitle: movie.release_date
                ? new Date(movie.release_date).getFullYear().toString()
                : (movie.first_air_date ? new Date(movie.first_air_date).getFullYear().toString() : ''),
            rating: movie.vote_average?.toFixed(1) || '0.0',
            duration: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '',
            genres: movie.genre_ids
                ? movie.genre_ids.map(id => tmdbService.GENRE_MAP[id]).filter(Boolean)
                : (movie.genres ? movie.genres.map(g => g.name) : []),
            description: movie.overview,
            image: movie.backdrop_path
                ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                : (movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : ''),
            trailerKey: trailer ? trailer.key : null,
        };
    }
};

