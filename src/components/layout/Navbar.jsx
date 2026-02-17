import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserIcon, BellIcon, FilmIcon, ArrowLeftOnRectangleIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { history, unreadCount, markAllAsRead, clearHistory, getIcon } = useNotification();

  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
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
    <div className="fixed top-6 left-0 w-full px-4 sm:px-12 lg:px-24 xl:px-40 z-[100]">
      <nav
        className="flex justify-between items-center px-8 py-3 rounded-full 
           backdrop-blur-md bg-black/60 border border-white/10 
           ring-1 ring-white/5 text-white shadow-2xl transition-all">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg shadow-lg transition-transform hover:scale-110">
            <FilmIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CineMax
          </span>
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
                {name === "Home" ? "Home" : link.name}
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

        <div className="flex items-center gap-5">
          {/* Notification Button */}
          <div className="relative" ref={panelRef}>
            <button
              onClick={() => {
                setShowNotifPanel(!showNotifPanel);
                if (!showNotifPanel) markAllAsRead();
              }}
              className={`relative text-white hover:text-purple-400 transition-all bg-white/10 rounded-full p-2 active:scale-90 ${showNotifPanel ? 'bg-white/20 text-purple-400' : ''}`}
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black shadow-lg animate-in zoom-in duration-300">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Panel */}
            {showNotifPanel && (
              <div className="absolute right-0 mt-6 w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-black uppercase tracking-tighter text-sm italic">Notifications</h3>
                  <div className="flex gap-2">
                    <button onClick={clearHistory} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-red-400 transition-colors" title="Clear All">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                  {history.length === 0 ? (
                    <div className="p-10 text-center">
                      <BellIcon className="h-10 w-10 text-gray-700 mx-auto mb-3 opacity-50" />
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-relaxed">No new alerts<br />for your world.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {history.map((notif) => (
                        <div key={notif.id} className="px-6 py-4 hover:bg-white/5 border-b border-white/5 transition-colors flex gap-4 group">
                          <div className="mt-1 flex-shrink-0">
                            {getIcon(notif.type, true)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white/90 leading-relaxed mb-1">{notif.message}</p>
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Today at {formatTime(notif.timestamp)}</span>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 ring-4 ring-purple-500/20" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {history.length > 0 && (
                  <div className="px-6 py-4 bg-white/5 border-t border-white/5 text-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">End of Transmission</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className={`flex items-center gap-2 bg-white/5 border px-4 py-1.5 rounded-full transition-all hover:bg-white/10 active:scale-95 ${location.pathname === '/profile' ? 'border-purple-500/50 shadow-lg shadow-purple-500/10 bg-white/10' : 'border-white/10'
                  }`}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-[10px] font-black uppercase shadow-lg shadow-purple-600/20">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-bold truncate max-w-[80px]">{user.name}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-gray-500 hover:text-red-500 transition-all hover:scale-110 active:scale-90"
                title="Logout"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 border border-purple-500/50 px-5 py-1.5 rounded-full hover:bg-purple-600 transition-all duration-300 active:scale-95 shadow-lg shadow-purple-600/10"
            >
              <UserIcon className="h-4 w-4 text-gray-300" />
              <span className="text-sm">Sign in</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
