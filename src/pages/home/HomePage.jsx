import React from "react";
import { HeroSection, MovieSectionList } from "@/components";
import { useHomeMovies } from "@/hooks";

const HomePage = () => {
  const { movies, loading, error } = useHomeMovies();

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      <HeroSection featuredMovies={movies.featured} />

      <div className="relative z-10 px-4 sm:px-12 lg:px-24 xl:px-40 pb-24 -mt-20 space-y-24">
        {error ? (
          <div className="py-20 text-center bg-red-500/5 border border-red-500/10 rounded-[3rem]">
            <p className="text-red-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Sync Error</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        ) : loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Updating Feed...</span>
          </div>
        ) : (
          <MovieSectionList movies={movies} />
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-0" />
    </div>
  );
};

export default HomePage;
