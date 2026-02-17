import React from "react";
// 1. Fixed Layout Imports
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/footer";
import MovieContent from "./features/home/HomePage";
import MovieSlider from "./features/movies/MovieSlider";
import { TopTrending } from "./constants";

const App = () => {
  const actionMovies = TopTrending.filter((m) => m.genres.includes("Action"));
  const sciFiMovies = TopTrending.filter((m) => m.genres.includes("Sci-Fi"));
  const comedyMovies = TopTrending.filter((m) => m.genres.includes("Comedy"));
  const animationMovies = TopTrending.filter((m) => m.genres.includes("Animation"));
  const crimeMovies = TopTrending.filter((m) => m.genres.includes("Crime"));
  const fantasyMovies = TopTrending.filter((m) => m.genres.includes("Fantasy"));

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
      <Navbar />
      <main className="relative">
        <MovieContent />
        <div className="relative z-30 mt-10 pb-20 space-y-12">
          <MovieSlider title="Trending Now" movies={TopTrending} />
          <MovieSlider title="Sci-Fi" movies={sciFiMovies} />
          <MovieSlider title="Action" movies={actionMovies} />
          <MovieSlider title="Comedy" movies={comedyMovies} />
          <MovieSlider title="Animation" movies={animationMovies} />
          <MovieSlider title="Crime" movies={crimeMovies} />
          <MovieSlider title="Fantasy" movies={fantasyMovies} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;