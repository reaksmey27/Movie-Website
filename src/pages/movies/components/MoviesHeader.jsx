import React, { memo, useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const MoviesHeader = ({
  searchQuery,
  page,
  totalPages,
  genres,
  selectedGenre,
  onSearch,
  onClear,
  onGenreChange,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (inputValue !== searchQuery) {
        onSearch(inputValue);
      }
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [inputValue, onSearch, searchQuery]);

  return (
    <div className="mb-12 flex flex-col gap-8 sm:mb-16 sm:gap-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-black uppercase leading-none tracking-tighter text-white md:text-5xl">
            {searchQuery ? "Searching" : "Explore"} <br />
            <span className="text-purple-500">
              {searchQuery ? "Results" : "Cinematic"}
            </span>{" "}
            {searchQuery ? "" : "World"}
          </h1>
          <p className="max-w-md text-sm font-medium text-gray-400">
            {searchQuery
              ? `Searching for "${searchQuery}" movies. Page ${page} of ${totalPages}.`
              : "Browse through thousands of movies by your favorite genres. Live updates from the global community."}
          </p>
        </div>

        <div className="relative w-full md:w-96 group">
          <MagnifyingGlassIcon
            className={`absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
              inputValue
                ? "text-purple-500"
                : "text-gray-500 group-focus-within:text-purple-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search movies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-2xl border-2 border-white/5 bg-white/5 px-14 py-3.5 font-bold text-white outline-none transition-all placeholder:text-gray-600 focus:border-purple-500/50 focus:bg-white/10 sm:py-4"
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => {
                setInputValue("");
                onClear();
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {!searchQuery && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 pr-1 scroll-smooth sm:pb-4">
          <button
            onClick={() => onGenreChange(null)}
            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
              selectedGenre === null
                ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20 scale-105"
                : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5 hover:border-white/20"
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onGenreChange(genre.id)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                selectedGenre === genre.id
                  ? "bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-600/20 scale-105"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/10 hover:border-white/20"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(MoviesHeader);
