import React from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon as HeartOutlineIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useFavorites } from "../../context/FavoritesContext";
import MovieGrid from "../../components/ui/MovieGrid";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-20 pt-24 sm:px-12 sm:pb-24 sm:pt-36 lg:px-24 xl:px-40">
      <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-8 sm:mb-16 sm:gap-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-black uppercase leading-none tracking-tighter text-white md:text-5xl">
              Your{" "}
              <HeartSolidIcon className="inline h-10 w-10 text-red-500 md:h-14 md:w-14" />{" "}
              <br />
              <span className="text-purple-500">Favorites</span>
            </h1>
            <p className="max-w-sm text-sm font-medium text-gray-400">
              Your personal collection of cinematic masterpieces. Ready to
              watch whenever you are.
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-white/5 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-12">
            <HeartOutlineIcon className="mb-6 h-16 w-16 text-gray-600" />
            <h3 className="mb-2 text-2xl font-black uppercase tracking-tighter text-white">
              Your list is empty
            </h3>
            <p className="mb-8 max-w-sm font-medium text-gray-500">
              You haven&apos;t added any movies to your favorites yet. Start
              exploring and click the heart icon.
            </p>
            <Link
              to="/movies"
              className="rounded-2xl bg-purple-600 px-10 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-purple-600/20 transition-all hover:bg-purple-500 active:scale-95"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
