import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./features/home/HomePage";
import MoviesPage from "./features/movies/MoviesPage";
import MovieDetailPage from "./features/movies/MovieDetailPage";
import TrendingPage from "./features/trending/TrendingPage";
import UpcomingPage from "./features/upcoming/UpcomingPage";
import FavoritesPage from "./features/favorites/FavoritesPage";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import ProfilePage from "./features/profile/ProfilePage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
              <Navbar />
              <main className="relative">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/movies" element={<MoviesPage />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  <Route path="/upcoming" element={<UpcomingPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/movie/:id" element={<MovieDetailPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
