import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BellIcon,
  TrashIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";

import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { THEMES } from "../../utils/theme";
import DonationModal from "../ui/DonationModal.jsx";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Trending", path: "/trending" },
  { name: "Favorites", path: "/favorites" },
  { name: "Watchlist", path: "/watchlist" },
  { name: "Upcoming", path: "/upcoming" },
];

const Navbar = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  const { history, unreadCount, markAllAsRead, clearHistory, getIcon } =
    useNotification();

  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  const panelRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowNotifPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkActive = (linkPath) => {
    if (linkPath.includes("#")) {
      const pathPart = linkPath.split("#")[0] || "/";
      const hashPart = `#${linkPath.split("#")[1]}`;

      return (
        location.pathname === pathPart && location.hash === hashPart
      );
    }

    if (linkPath === "/") {
      return location.pathname === "/" && !location.hash;
    }

    return location.pathname === linkPath;
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserInitial = () => {
    const value = user?.name || user?.email || "";

    return value.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isLightTheme = theme === THEMES.LIGHT;

  const ThemeIcon = isLightTheme ? MoonIcon : SunIcon;

  const themeButtonLabel = isLightTheme
    ? "Switch to dark mode"
    : "Switch to light mode";

  return (
    <div className="fixed left-0 top-0 z-100 w-full px-2 sm:top-6 sm:px-6 lg:px-24 xl:px-40">
      <nav className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-nav-bg)] px-3 py-2.5 text-[var(--color-text)] shadow-2xl ring-1 ring-[var(--color-ring)] backdrop-blur-md transition-all sm:rounded-full sm:border sm:px-6 sm:py-3">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/images/logo.png"
            alt="CineMax Logo"
            className="h-8 w-auto sm:h-10"
            decoding="async"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden gap-10 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = checkActive(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`group relative py-1 font-bold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "scale-105 text-purple-500"
                    : "text-[var(--color-text-soft)] hover:scale-105 hover:text-[var(--color-text)]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-1 left-1/2 h-1 -translate-x-1/2 rounded-full bg-purple-500 transition-all duration-300 ${
                    isActive
                      ? "w-4 opacity-100 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-5">

          {/* Theme Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] p-2 text-[var(--color-text)] transition-all hover:border-purple-500/50 hover:text-purple-400 active:scale-95"
            aria-label={themeButtonLabel}
            title={themeButtonLabel}
          >
            <ThemeIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={panelRef}>
            <button
              type="button"
              onClick={() => {
                setShowNotifPanel(!showNotifPanel);

                if (!showNotifPanel) {
                  markAllAsRead();
                }
              }}
              className={`relative rounded-full border border-transparent bg-[var(--color-surface-2)] p-2 text-[var(--color-text)] transition-all active:scale-90 hover:text-purple-400 ${
                showNotifPanel
                  ? "border-purple-500/40 bg-[var(--color-surface-3)] text-purple-400"
                  : ""
              }`}
            >
              <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white shadow-lg">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifPanel && (
              <div className="fixed left-2 right-2 top-16 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel-bg)] shadow-2xl backdrop-blur-2xl duration-300 animate-in fade-in slide-in-from-top-4 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-4 sm:w-80 sm:rounded-4xl">

                <div className="flex items-center justify-between border-b border-[var(--color-border-soft)] px-6 py-5">
                  <h3 className="text-sm font-black uppercase tracking-tighter italic">
                    Notifications
                  </h3>

                  <button
                    type="button"
                    onClick={clearHistory}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-[var(--color-surface-1)] hover:text-red-400"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="no-scrollbar max-h-100 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-10 text-center">
                      <BellIcon className="mx-auto mb-3 h-8 w-8 text-gray-700 opacity-50" />

                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        No new alerts.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {history.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex gap-4 border-b border-[var(--color-border-soft)] px-6 py-4 transition-colors hover:bg-[var(--color-surface-1)]"
                        >
                          <div className="mt-1 shrink-0">
                            {getIcon(notif.type, true)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="mb-1 text-[10px] font-bold leading-relaxed text-[var(--color-text)] sm:text-xs">
                              {notif.message}
                            </p>

                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                              {formatTime(notif.timestamp)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="hidden items-center gap-4 sm:flex">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className={`relative rounded-full border p-2 transition-all duration-300 active:scale-90 ${
                  location.pathname === "/profile"
                    ? "border-purple-500/40 bg-[var(--color-surface-3)] text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                    : "border-transparent bg-[var(--color-surface-2)] text-[var(--color-text)] hover:border-purple-500/30 hover:text-purple-400"
                }`}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-[10px] font-black uppercase text-white">
                    {getUserInitial()}
                  </div>
                )}

                {/* Active Dot */}
                <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border border-[#0B1020] bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-purple-500/50 px-5 py-1.5 text-sm font-bold transition-all hover:bg-purple-600"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Support Button */}
          <button
            type="button"
            onClick={() => setIsDonationOpen(true)}
            className="hidden rounded-full border border-purple-500/40 bg-[var(--color-surface-2)] px-4 py-1.5 text-sm font-bold text-purple-300 transition-all hover:border-purple-500/70 hover:bg-[var(--color-surface-3)] hover:text-purple-200 active:scale-95 sm:block"
          >
            Support Us ❤️
          </button>

          {/* Mobile Support */}
          <button
            type="button"
            onClick={() => setIsDonationOpen(true)}
            className="rounded-full border border-purple-500/40 bg-[var(--color-surface-2)] p-2 text-[var(--color-text)] transition-all hover:border-purple-500/70 hover:text-purple-300 active:scale-95 sm:hidden"
          >
            ❤️
          </button>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full p-2 text-[var(--color-text)] transition-colors hover:text-purple-500 lg:hidden"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />
    </div>
  );
};

export default Navbar;