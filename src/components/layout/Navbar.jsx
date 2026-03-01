import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserIcon, BellIcon, FilmIcon, ArrowLeftOnRectangleIcon, TrashIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { history, unreadCount, markAllAsRead, clearHistory, getIcon } = useNotification();

  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowNotifPanel(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Trending", path: "/trending" },
    { name: "Favorites", path: "/favorites" },
    { name: "Upcoming", path: "/upcoming" },
  ];

  const checkActive = (linkPath) => {
    if (linkPath.includes("#")) {
      const pathPart = linkPath.split("#")[0] || "/";
      const hashPart = "#" + linkPath.split("#")[1];
      return location.pathname === pathPart && currentHash === hashPart;
    }
    if (linkPath === "/") {
      return location.pathname === "/" && !currentHash;
    }
    return location.pathname === linkPath;
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed top-0 sm:top-6 left-0 w-full px-0 sm:px-12 lg:px-24 xl:px-40 z-[100]">
      <nav
        className="flex justify-between items-center px-6 sm:px-8 py-3 sm:rounded-full 
           backdrop-blur-md bg-black/60 border-b sm:border border-white/10 
           ring-1 ring-white/5 text-white shadow-2xl transition-all">

        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <img src="/images/logo.png" alt="CineMax Logo" className="h-8 w-auto sm:h-10" />
        </Link>

        <div className="hidden lg:flex gap-10">
          {navLinks.map((link) => {
            const isActive = checkActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-1 transition-all duration-300 font-bold tracking-wide group ${isActive ? "text-purple-500 scale-105" : "text-white/80 hover:text-white hover:scale-105"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 bg-purple-500 rounded-full transition-all duration-300 ${isActive
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
                if (!showNotifPanel) markAllAsRead();
              }}
              className={`relative text-white hover:text-purple-400 transition-all bg-white/10 rounded-full p-2 active:scale-90 ${showNotifPanel ? 'bg-white/20 text-purple-400' : ''}`}
            >
              <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black shadow-lg animate-in zoom-in duration-300">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifPanel && (
              <div className="absolute right-[-80px] sm:right-0 mt-6 w-[280px] sm:w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-black uppercase tracking-tighter text-sm italic">Notifications</h3>
                  <button onClick={clearHistory} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-red-400" title="Clear All">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                  {history.length === 0 ? (
                    <div className="p-10 text-center">
                      <BellIcon className="h-8 w-8 text-gray-700 mx-auto mb-3 opacity-50" />
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">No new alerts.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {history.map((notif) => (
                        <div key={notif.id} className="px-6 py-4 hover:bg-white/5 border-b border-white/5 transition-colors flex gap-4">
                          <div className="mt-1 flex-shrink-0">
                            {getIcon(notif.type, true)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-xs font-bold text-white/90 leading-relaxed mb-1">{notif.message}</p>
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{formatTime(notif.timestamp)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 bg-white/5 border px-4 py-1.5 rounded-full transition-all hover:bg-white/10 ${location.pathname === '/profile' ? 'border-purple-500/50 bg-white/10' : 'border-white/10'}`}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-[10px] font-black uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold truncate max-w-[80px]">{user.name}</span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-gray-500 hover:text-red-500 transition-all hover:scale-110"
                >
                  <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="border border-purple-500/50 px-5 py-1.5 rounded-full hover:bg-purple-600 transition-all text-sm font-bold"
              >
                Sign in
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-1 hover:text-purple-500 transition-colors"
          >
            {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 top-[60px] sm:top-[76px] z-[90] lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={() => setIsMenuOpen(false)} />
          <div className="relative z-10 p-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-black uppercase tracking-tighter ${checkActive(link.path) ? 'text-purple-500 px-4 border-l-4 border-purple-500' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-white/5 my-4" />

            {isAuthenticated ? (
              <div className="flex flex-col gap-6">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center font-black text-xl">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xl font-bold group-hover:text-purple-500 transition-colors">{user.name}</span>
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}
                  className="text-left py-2 text-red-500 font-black uppercase tracking-widest text-sm"
                >
                  Logout Connection
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-purple-600 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest"
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
