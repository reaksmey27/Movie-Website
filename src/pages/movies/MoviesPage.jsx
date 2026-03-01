import React from 'react';
import useMovies from '../../hooks/movies/useMovies';
import MoviesHeader from './components/MoviesHeader';
import Pagination from './components/Pagination';
import MovieGrid from '../../components/ui/MovieGrid';
import PageError from '../../components/ui/PageError';
import PageLoader from '../../components/ui/PageLoader';
import { XMarkIcon } from '@heroicons/react/24/outline';

const MoviesPage = () => {
    const {
        movies, genres, selectedGenre, searchQuery,
        loading, page, totalPages, error,
        handleGenreChange, handleSearch, clearSearch, handlePageChange,
    } = useMovies();

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <MoviesHeader
                    searchQuery={searchQuery}
                    page={page}
                    totalPages={totalPages}
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onSearch={handleSearch}
                    onClear={clearSearch}
                    onGenreChange={handleGenreChange}
                />

                {error ? (
                    <PageError
                        message={error}
                        buttonLabel="Retry Connection"
                        buttonColor="bg-white text-black hover:bg-red-500 hover:text-white"
                        icon={XMarkIcon}
                        iconColor="text-red-500"
                        borderColor="border-red-500/10 bg-red-500/5"
                    />
                ) : loading ? (
                    <PageLoader color="border-purple-600" label="Updating Feed..." />
                ) : (
                    <>
                        <MovieGrid movies={movies} onReset={clearSearch} />
                        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;
