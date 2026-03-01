import { useAuth as useContextAuth } from '@/context/AuthContext';
export const useAuth = useContextAuth;

import { useFavorites as useContextFavorites } from '@/context/FavoritesContext';
export const useFavorites = useContextFavorites;

import { useNotification as useContextNotification } from '@/context/NotificationContext';
export const useNotification = useContextNotification;

export * from './useHomeMovies';
export * from './useMovie';
export * from './useMoviesList';
export * from './useNavbarLogic';
export * from './usePlayer';
