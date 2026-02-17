import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const { showNotification } = useNotification();
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('movie_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('movie_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        if (favorites.some((m) => m.id === movie.id)) return;

        setFavorites((prev) => [...prev, movie]);
        showNotification(`${movie.title} added to your collection!`, 'success');
    };

    const removeFromFavorites = (movieId) => {
        const movie = favorites.find(m => m.id === movieId);
        if (movie) {
            setFavorites((prev) => prev.filter((m) => m.id !== movieId));
            showNotification(`Removed ${movie.title} from favorites.`, 'info');
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some((m) => m.id === movieId);
    };

    const toggleFavorite = (movie) => {
        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
