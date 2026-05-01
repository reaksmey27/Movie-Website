import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/ui/PageLoader";
import useScrollToTop from "./hooks/useScrollToTop";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const MoviesPage = lazy(() => import("./pages/movies/MoviesPage"));
const MovieDetailPage = lazy(() => import("./pages/movies/MovieDetailPage"));
const TrendingPage = lazy(() => import("./pages/trending/TrendingPage"));
const UpcomingPage = lazy(() => import("./pages/upcoming/UpcomingPage"));
const FavoritesPage = lazy(() => import("./pages/favorites/FavoritesPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));

const ScrollManager = () => {
  useScrollToTop();
  return null;
};

const App = () => {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AuthProvider>
          <FavoritesProvider>
            <Router>
              <ScrollManager />
              <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
                <Navbar />
                <main className="relative">
                  <Suspense
                    fallback={
                      <PageLoader
                        color="border-purple-500"
                        label="Loading Experience..."
                      />
                    }
                  >
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
                  </Suspense>
                </main>
                <Footer />
              </div>
            </Router>
          </FavoritesProvider>
        </AuthProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
};

export default App;
