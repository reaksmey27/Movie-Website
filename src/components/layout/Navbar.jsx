import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BellIcon,
  ArrowLeftOnRectangleIcon,
  TrashIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Trending", path: "/trending" },
  { name: "Favorites", path: "/favorites" },
  { name: "Upcoming", path: "/upcoming" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { history, unreadCount, markAllAsRead, clearHistory, getIcon } =
    useNotification();

  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelRef = useRef(null);

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
      return location.pathname === pathPart && location.hash === hashPart;
    }

    if (linkPath === "/") {
      return location.pathname === "/" && !location.hash;
    }

    return location.pathname === linkPath;
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getUserInitial = () => {
    const value = user?.name || user?.email || "";
    return value.charAt(0).toUpperCase();
  };

  const renderUserAvatar = (className, fallbackClassName) => {
    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          alt={user.name}
          className={className}
          referrerPolicy="no-referrer"
        />
      );
    }

    return <div className={fallbackClassName}>{getUserInitial()}</div>;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 z-[100] w-full px-0 sm:top-6 sm:px-12 lg:px-24 xl:px-40">
      <nav className="flex items-center justify-between border-b border-white/10 bg-black/60 px-6 py-3 text-white shadow-2xl ring-1 ring-white/5 backdrop-blur-md transition-all sm:rounded-full sm:border sm:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <img
            src="/images/logo.png"
            alt="CineMax Logo"
            className="h-8 w-auto sm:h-10"
            decoding="async"
          />
        </Link>

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
                    : "text-white/80 hover:scale-105 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 h-1 -translate-x-1/2 rounded-full bg-purple-500 transition-all duration-300 ${
                    isActive
                      ? "w-4 opacity-100 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative" ref={panelRef}>
            <button
              onClick={() => {
                setShowNotifPanel(!showNotifPanel);
                if (!showNotifPanel) {
                  markAllAsRead();
                }
              }}
              className={`relative rounded-full bg-white/10 p-2 text-white transition-all active:scale-90 hover:text-purple-400 ${
                showNotifPanel ? "bg-white/20 text-purple-400" : ""
              }`}
            >
              <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-black shadow-lg duration-300 animate-in zoom-in sm:h-5 sm:w-5">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifPanel && (
              <div className="absolute right-[-80px] mt-6 w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-2xl duration-300 animate-in fade-in slide-in-from-top-4 sm:right-0 sm:w-80 sm:rounded-[2rem]">
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                  <h3 className="text-sm font-black uppercase tracking-tighter italic">
                    Notifications
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-red-400"
                    title="Clear All"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="no-scrollbar max-h-[400px] overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-10 text-center">
                      <BellIcon className="mx-auto mb-3 h-8 w-8 text-gray-700 opacity-50" />
                      <p className="text-[10px] font-bold uppercase leading-relaxed tracking-widest text-gray-500">
                        No new alerts.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {history.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex gap-4 border-b border-white/5 px-6 py-4 transition-colors hover:bg-white/5"
                        >
                          <div className="mt-1 flex-shrink-0">{getIcon(notif.type, true)}</div>
                          <div className="min-w-0 flex-1">
                            <p className="mb-1 text-[10px] font-bold leading-relaxed text-white/90 sm:text-xs">
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

          <div className="hidden items-center gap-4 sm:flex">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 rounded-full border px-4 py-1.5 transition-all hover:bg-white/10 ${
                    location.pathname === "/profile"
                      ? "border-purple-500/50 bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  {renderUserAvatar(
                    "h-6 w-6 rounded-full object-cover",
                    "flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-[10px] font-black uppercase",
                  )}
                  <span className="max-w-[100px] truncate text-sm font-bold">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 transition-all hover:scale-110 hover:text-red-500"
                >
                  <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-purple-500/50 px-5 py-1.5 text-sm font-bold transition-all hover:bg-purple-600"
              >
                Sign in
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 text-white transition-colors hover:text-purple-500 lg:hidden"
          >
            {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-[90] duration-300 animate-in fade-in slide-in-from-top-4 sm:top-[76px] lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative z-10 flex flex-col gap-6 p-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-black uppercase tracking-tighter ${
                  checkActive(link.path)
                    ? "border-l-4 border-purple-500 px-4 text-purple-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="my-4 h-px bg-white/5" />

            {isAuthenticated ? (
              <div className="flex flex-col gap-6">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4"
                >
                  {renderUserAvatar(
                    "h-10 w-10 rounded-2xl object-cover",
                    "flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 font-black text-xl",
                  )}
                  <span className="text-xl font-bold transition-colors group-hover:text-purple-500">
                    {user?.name}
                  </span>
                </Link>
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await handleLogout();
                  }}
                  className="py-2 text-left text-sm font-black uppercase tracking-widest text-red-500"
                >
                  Logout Connection
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl bg-purple-600 py-4 text-center font-black uppercase tracking-widest text-white"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
