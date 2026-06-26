import PageError from "../../components/ui/PageError";
import useHomeMovies from "../../hooks/movies/useHomeMovies";
import HeroSection from "./components/HeroSection";
import HomePageSkeleton from "./components/HomePageSkeleton";
import MovieSlider from "./components/MovieSlider";

// ─── Slider config ────────────────────────────────────────────────────────────

const SLIDERS = [
  { key: "trending", title: "Trending Now" },
  { key: "upcoming", title: "Upcoming Movies" },
  { key: "topRated", title: "Top Rated" },
  { key: "sciFi", title: "Sci-Fi" },
  { key: "action", title: "Action" },
  { key: "comedy", title: "Comedy" },
  { key: "animation", title: "Animation" },
  { key: "crime", title: "Crime" },
  { key: "fantasy", title: "Fantasy" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const HomePage = () => {
  const { movies, loading, error, retry } = useHomeMovies();

  if (loading) return <HomePageSkeleton />;

  const heroMovies =
    movies.featured.length > 0
      ? movies.featured
      : movies.nowPlaying.length > 0
        ? movies.nowPlaying
        : movies.trending;

  return (
    <main id="home" className="min-h-screen bg-slate-950">
      <h1 className="sr-only">
        CineMax home: discover trending, upcoming, and top-rated movies
      </h1>

      <HeroSection trendingMovies={heroMovies} />

      <div className="relative z-30 mt-8 space-y-10 pb-14 sm:mt-16 sm:space-y-14 sm:pb-20">
        {error && (
          <div className="mx-4 py-2 sm:mx-6 lg:px-24 xl:px-40">
            <PageError
              message={error}
              buttonLabel="Try Again"
              onRetry={retry}
            />
          </div>
        )}

        {SLIDERS.map(
          ({ key, title }) =>
            movies[key]?.length > 0 && (
              <MovieSlider key={key} title={title} movies={movies[key]} />
            ),
        )}
      </div>
    </main>
  );
};

export default HomePage;
