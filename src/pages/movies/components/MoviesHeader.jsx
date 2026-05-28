import { memo, useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  DEFAULT_DISCOVER_SORT,
  DISCOVER_SORT_OPTIONS,
  MIN_RATING_OPTIONS,
} from "../constants";

// ─── Constants ────────────────────────────────────────────────────────────────

const LABEL_CLASS =
  "text-[10px] font-black uppercase tracking-[0.34em] text-gray-500";

const INPUT_CLASS =
  "w-full rounded-lg border border-white/8 bg-white/5 px-3.5 py-2 text-[15px] font-semibold text-white outline-none transition-all placeholder:text-gray-600 focus:border-purple-500/45 focus:bg-white/8 sm:py-2.5";

const GENRE_BTN_BASE =
  "rounded-xl border-2 px-5 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all";

const SEARCH_DEBOUNCE = 250;
const YEAR_DEBOUNCE   = 250;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getHeadingState = (hasSearchQuery, hasActiveFilters) => {
  if (hasSearchQuery)   return { top: "Searching",  accent: "Results",   suffix: ""       };
  if (hasActiveFilters) return { top: "Filtered",   accent: "Selection", suffix: ""       };
  return                       { top: "Explore",    accent: "Cinematic", suffix: " World" };
};

const getSubtitle = (hasSearchQuery, hasActiveFilters, searchQuery, page, totalPages) => {
  if (hasSearchQuery)   return `Searching for "${searchQuery}" movies. Page ${page} of ${totalPages}.`;
  if (hasActiveFilters) return `Discover results tailored to your filters. Page ${page} of ${totalPages}.`;
  return "Browse through thousands of movies by your favorite genres. Live updates from the global community.";
};

// ─── FilterSelect ─────────────────────────────────────────────────────────────

const FilterSelect = ({ label, value, options, isOpen, onToggle, onClose, onChange }) => {
  const containerRef = useRef(null);
  const triggerId    = `filter-select-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const selected     = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e) => {
      if (!containerRef.current?.contains(e.target)) onClose();
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown",   handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown",   handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className="relative space-y-2">
      <span className={LABEL_CLASS}>{label}</span>

      <button
        id={triggerId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${triggerId}-menu`}
        onClick={onToggle}
        className={`group flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2 text-left font-semibold outline-none transition-all sm:py-2.5 ${
          isOpen
            ? "border-purple-500/45 bg-white/8 shadow-[0_0_0_1px_rgba(168,85,247,0.08)]"
            : "border-white/8 bg-white/5 hover:border-white/15 hover:bg-white/8"
        }`}
      >
        <span className="min-w-0 truncate text-[15px] text-white">{selected.label}</span>
        <ChevronUpDownIcon className={`h-3.5 w-3.5 shrink-0 transition-colors ${isOpen ? "text-purple-500" : "text-gray-500 group-hover:text-gray-400"}`} />
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full z-50 mt-1 origin-top transition-all duration-150">
          <div className="rounded-lg border border-white/6 bg-slate-950 p-1">
            <ul id={`${triggerId}-menu`} role="listbox" aria-labelledby={triggerId} className="space-y-1">
              {options.map((option) => {
                const isSelected = option.value === selected.value;
                return (
                  <li key={option.value || "all"}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => { onChange(option.value); onClose(); }}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3.5 py-2 text-left text-[13px] font-semibold transition-all ${
                        isSelected ? "bg-purple-600 text-white" : "bg-white/5 text-white hover:bg-white/8"
                      }`}
                    >
                      <span className="truncate">{option.label}</span>
                      <CheckIcon className={`h-3.5 w-3.5 shrink-0 ${isSelected ? "opacity-100" : "opacity-0"}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MoviesHeader ─────────────────────────────────────────────────────────────

const MoviesHeader = ({
  searchQuery, page, totalPages,
  genres, selectedGenre, releaseYear, minRating, sortBy, hasActiveFilters,
  onSearch, onClear, onGenreChange, onYearChange, onRatingChange, onSortChange, onClearFilters,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [yearInput,  setYearInput]  = useState(releaseYear);
  const [openSelect, setOpenSelect] = useState(null);

  const hasSearchQuery = Boolean(searchQuery.trim());
  const heading        = getHeadingState(hasSearchQuery, hasActiveFilters);
  const subtitle       = getSubtitle(hasSearchQuery, hasActiveFilters, searchQuery, page, totalPages);

  const toggleSelect = (key) =>
    setOpenSelect((cur) => (cur === key ? null : key));

  // ── Sync external → local ──
  useEffect(() => { setInputValue(searchQuery); }, [searchQuery]);
  useEffect(() => { setYearInput(releaseYear);  }, [releaseYear]);
  useEffect(() => { setOpenSelect(null);        }, [minRating, sortBy]);

  // ── Debounced search ──
  useEffect(() => {
    if (inputValue === searchQuery) return;
    const id = window.setTimeout(() => onSearch(inputValue), SEARCH_DEBOUNCE);
    return () => window.clearTimeout(id);
  }, [inputValue, onSearch, searchQuery]);

  // ── Debounced year ──
  useEffect(() => {
    if (yearInput === releaseYear || (yearInput !== "" && yearInput.length < 4)) return;
    const id = window.setTimeout(() => onYearChange(yearInput), YEAR_DEBOUNCE);
    return () => window.clearTimeout(id);
  }, [yearInput, onYearChange, releaseYear]);

  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-16 sm:gap-10">

      {/* ── Title + search bar ── */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-black uppercase leading-none tracking-tighter text-white sm:text-4xl md:text-5xl">
            {heading.top} <br />
            <span className="text-purple-500">{heading.accent}</span>
            {heading.suffix}
          </h1>
          <p className="max-w-md text-sm font-medium text-gray-400">{subtitle}</p>
        </div>

        <div className="group relative w-full md:w-96">
          <MagnifyingGlassIcon className={`absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${inputValue ? "text-purple-500" : "text-gray-500 group-focus-within:text-purple-500"}`} />
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
              onClick={() => { setInputValue(""); onClear(); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="relative z-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">Discover Filters</p>
            <p className="mt-2 max-w-2xl text-sm font-medium text-gray-400">
              Refine the TMDB discover feed by genre, release year, minimum vote average, and sort order.
            </p>
          </div>
          <button
            type="button"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:border-purple-500/40 hover:bg-purple-500/10"
          >
            Reset Filters
          </button>
        </div>

        {hasSearchQuery && (
          <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs font-semibold text-amber-100">
            Changing any filter will clear the current search and switch back to TMDB discover results.
          </div>
        )}

        {/* Genre pills */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-gray-500">Genre</p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 pr-1 scroll-smooth sm:pb-4">
            <button
              type="button"
              onClick={() => onGenreChange(null)}
              className={`${GENRE_BTN_BASE} ${
                selectedGenre === null
                  ? "scale-105 border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                  : "border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              All
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                type="button"
                onClick={() => onGenreChange(genre.id)}
                className={`${GENRE_BTN_BASE} ${
                  selectedGenre === genre.id
                    ? "scale-105 border-purple-600 bg-purple-600 text-white shadow-xl shadow-purple-600/20"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Field row */}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <label className="space-y-2">
            <span className={LABEL_CLASS}>Release Year</span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="e.g. 2024"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className={INPUT_CLASS}
            />
          </label>

          <FilterSelect
            label="Minimum Rating"
            value={minRating}
            options={MIN_RATING_OPTIONS}
            isOpen={openSelect === "rating"}
            onToggle={() => toggleSelect("rating")}
            onClose={() => setOpenSelect(null)}
            onChange={onRatingChange}
          />

          <FilterSelect
            label="Sort By"
            value={sortBy || DEFAULT_DISCOVER_SORT}
            options={DISCOVER_SORT_OPTIONS}
            isOpen={openSelect === "sort"}
            onToggle={() => toggleSelect("sort")}
            onClose={() => setOpenSelect(null)}
            onChange={onSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(MoviesHeader);