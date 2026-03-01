import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/home/HomePage";
import MoviesPage from "./pages/movies/MoviesPage";
import MovieDetailPage from "./pages/movies/MovieDetailPage";
import TrendingPage from "./pages/trending/TrendingPage";
import UpcomingPage from "./pages/upcoming/UpcomingPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import useScrollToTop from "./hooks/useScrollToTop";

const ScrollManager = () => {
  useScrollToTop();
  return null;
};

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <ScrollManager />
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
