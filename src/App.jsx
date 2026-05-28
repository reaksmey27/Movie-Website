import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Fixed imports: explicitly adding .jsx extensions for root-level components
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import RouteTitleManager from "./components/RouteTitleManager.jsx";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import PageLoader from "./components/ui/PageLoader";
import AppRoutes from "./config/routes";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { NotificationProvider } from "./context/NotificationContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import useScrollToTop from "./hooks/useScrollToTop";
import { applyTheme, getStoredTheme, persistTheme, THEMES } from "./utils/theme";

// ─── Scroll Manager ───────────────────────────────────────────────────────────

const ScrollManager = () => {
  useScrollToTop();
  return null;
};

// ─── App ──────────────────────────────────────────────────────────────────────

const App = () => {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AuthProvider>
          <WatchlistProvider>
            <FavoritesProvider>
              <Router>
                <ScrollManager />
                <RouteTitleManager />
                <div className="min-h-screen bg-(--color-bg) text-(--color-text)">
                  <Navbar theme={theme} onToggleTheme={toggleTheme} />
                  <main className="relative">
                    <Suspense fallback={<PageLoader color="border-purple-500" label="Loading Experience..." />}>
                      <AppRoutes />
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