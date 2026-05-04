import React from "react";
import { Link } from "react-router-dom";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import MovieGrid from "../../components/ui/MovieGrid";
import PageLoader from "../../components/ui/PageLoader";
import { useAuth } from "../../context/AuthContext";
import { useWatchlist } from "../../context/WatchlistContext";

const WatchlistPage = () => {
  const { isAuthenticated } = useAuth();
  const { watchlist, loading } = useWatchlist();

  if (loading) {
    return (
      <PageLoader
        color="border-amber-500"
        label="Syncing Your Watchlist..."
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-24 pt-40 sm:px-12 lg:px-24 xl:px-40">
      <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-4">
          <h1 className="text-3xl font-black uppercase leading-none tracking-tighter text-white md:text-5xl">
            Your <span className="text-amber-400">Watchlist</span>
          </h1>
          <p className="max-w-lg text-sm font-medium text-gray-400">
            Real-time saved movies tied to your account, ready to pick up on any
            device where you sign in.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-white/5 bg-white/5 p-12 text-center backdrop-blur-sm">
            <BookmarkIcon className="mb-6 h-16 w-16 text-gray-600" />
            <h3 className="mb-2 text-2xl font-black uppercase tracking-tighter text-white">
              Sign in to use your watchlist
            </h3>
            <p className="mb-8 max-w-md font-medium text-gray-500">
              Your saved movies sync in real time through Firestore, so this page
              is only available when you are signed in.
            </p>
            <Link
              to="/login"
              className="rounded-2xl bg-amber-500 px-10 py-4 text-xs font-black uppercase tracking-widest text-slate-950 shadow-xl shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95"
            >
              Sign In
            </Link>
          </div>
        ) : watchlist.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-white/5 bg-white/5 p-12 text-center backdrop-blur-sm">
            <BookmarkIcon className="mb-6 h-16 w-16 text-gray-600" />
            <h3 className="mb-2 text-2xl font-black uppercase tracking-tighter text-white">
              Your watchlist is empty
            </h3>
            <p className="mb-8 max-w-md font-medium text-gray-500">
              Save movies from the catalog to build a personal queue that updates
              instantly anywhere you sign in.
            </p>
            <Link
              to="/movies"
              className="rounded-2xl bg-purple-600 px-10 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-purple-600/20 transition-all hover:bg-purple-500 active:scale-95"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <MovieGrid movies={watchlist} />
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
