import React from 'react'
import HeroSection from './HeroSection'; 
import MovieSlider from './MovieSlider';
import { TopTrending } from '../../constants';

const HomePage = () => {
  const actionMovies = TopTrending.filter((m) => m.genres.includes("Action"));
  const sciFiMovies = TopTrending.filter((m) => m.genres.includes("Sci-Fi"));
  const comedyMovies = TopTrending.filter((m) => m.genres.includes("Comedy"));
  const animationMovies = TopTrending.filter((m) => m.genres.includes("Animation"));
  const crimeMovies = TopTrending.filter((m) => m.genres.includes("Crime"));
  const fantasyMovies = TopTrending.filter((m) => m.genres.includes("Fantasy"));

  return (
    <div id="home">
        <HeroSection />
        <div className="relative z-30 mt-10 pb-20 space-y-12">
          <MovieSlider title="Trending Now" movies={TopTrending} />
          <MovieSlider title="Sci-Fi" movies={sciFiMovies} />
          <MovieSlider title="Action" movies={actionMovies} />
          <MovieSlider title="Comedy" movies={comedyMovies} />
          <MovieSlider title="Animation" movies={animationMovies} />
          <MovieSlider title="Crime" movies={crimeMovies} />
          <MovieSlider title="Fantasy" movies={fantasyMovies} />
        </div>
    </div>
  )
}

export default HomePage