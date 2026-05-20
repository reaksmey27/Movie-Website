import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/ui/PageLoader";
import useScrollToTop from "./hooks/useScrollToTop";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const MoviesPage = lazy(() => import("./pages/movies/MoviesPage"));
const MovieDetailPage = lazy(() => import("./pages/movies/MovieDetailPage"));
const TrendingPage = lazy(() => import("./pages/trending/TrendingPage"));
const UpcomingPage = lazy(() => import("./pages/upcoming/UpcomingPage"));
const FavoritesPage = lazy(() => import("./pages/favorites/FavoritesPage"));
const WatchlistPage = lazy(() => import("./pages/watchlist/WatchlistPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));

const ScrollManager = () => {
  useScrollToTop();
  return null;
};

const DEFAULT_PAGE_TITLE =
  "CineMax Movies | Discover Trending, Upcoming, and Favorite Films";
const DEFAULT_PAGE_DESCRIPTION =
  "CineMax helps you discover trending movies, browse upcoming releases, save favorites, and build a personal watchlist in one cinematic experience.";

const ROUTE_TITLES = {
  "/": DEFAULT_PAGE_TITLE,
  "/movies": "Browse Movies | Explore the CineMax Movie Catalog",
  "/trending": "Trending Movies | See What Is Popular on CineMax",
  "/upcoming": "Upcoming Movies | Find New Releases on CineMax",
  "/favorites": "Favorite Movies | Your Saved Picks on CineMax",
  "/watchlist": "Movie Watchlist | Saved Movies Ready to Watch on CineMax",
  "/profile": "Your Profile | Manage Your CineMax Account",
  "/login": "Log In | Access Your CineMax Movie Account",
  "/signup": "Sign Up | Create Your CineMax Movie Account",
  "/register": "Register | Create Your CineMax Movie Account",
};

const ROUTE_DESCRIPTIONS = {
  "/": DEFAULT_PAGE_DESCRIPTION,
  "/movies":
    "Browse the CineMax movie catalog to discover films by mood, genre, and popularity before choosing your next watch.",
  "/trending":
    "See which movies are trending right now on CineMax and keep up with the most popular titles movie fans are watching.",
  "/upcoming":
    "Explore upcoming movie releases on CineMax and stay ready for the newest films heading to screens soon.",
  "/favorites":
    "Revisit the movies you love with your CineMax favorites list and keep your top picks in one place.",
  "/watchlist":
    "Track what to watch next with your CineMax watchlist and save movies for the perfect movie night.",
  "/profile":
    "Manage your CineMax profile, review your saved collections, and keep your movie account up to date.",
  "/login":
    "Log in to CineMax to access your movie watchlist, favorites, and personalized account experience.",
  "/signup":
    "Create your CineMax account to save favorite movies, build a watchlist, and enjoy a personalized movie hub.",
  "/register":
    "Register a CineMax account to save favorite movies, build a watchlist, and enjoy a personalized movie hub.",
};

const updateMetaTag = (selector, attribute, content) => {
  const element = document.head.querySelector(selector);

  if (!element) return;

  element.setAttribute(attribute, content);
};

const RouteTitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const title = location.pathname.startsWith("/movie/")
      ? "Movie Details | Watch Trailers and Explore Films on CineMax"
      : ROUTE_TITLES[location.pathname] || DEFAULT_PAGE_TITLE;
    const description = location.pathname.startsWith("/movie/")
      ? "Explore movie details, story overviews, trailers, and key information for your next pick on CineMax."
      : ROUTE_DESCRIPTIONS[location.pathname] || DEFAULT_PAGE_DESCRIPTION;

    document.title = title;
    updateMetaTag('meta[name="description"]', "content", description);
    updateMetaTag('meta[property="og:title"]', "content", title);
    updateMetaTag('meta[property="og:description"]', "content", description);
    updateMetaTag('meta[name="twitter:title"]', "content", title);
    updateMetaTag('meta[name="twitter:description"]', "content", description);
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AuthProvider>
          <WatchlistProvider>
            <FavoritesProvider>
              <Router>
                <ScrollManager />
                <RouteTitleManager />
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
                        <Route path="/watchlist" element={<WatchlistPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/register" element={<SignupPage />} />
                        <Route path="/movie/:id" element={<MovieDetailPage />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </div>
              </Router>
            </FavoritesProvider>
          </WatchlistProvider>
        </AuthProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
};

export default App;
