import React from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import { useNavbarLogic } from "../../hooks/useNavbarLogic";

import NavLinks from "./NavLinks";
import NotificationPanel from "./NotificationPanel";
import UserControls from "./UserControls";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const {
    user,
    logout,
    isAuthenticated,
    history,
    unreadCount,
    markAllAsRead,
    clearHistory,
    getIcon,
    showNotifPanel,
    setShowNotifPanel,
    isMenuOpen,
    setIsMenuOpen,
    panelRef,
    navLinks,
    checkActive,
    formatTime,
    location,
    navigate
  } = useNavbarLogic();

  return (
    <div className="fixed top-0 sm:top-6 left-0 w-full px-0 sm:px-12 lg:px-24 xl:px-40 z-[100]">
      <nav
        className="flex justify-between items-center px-6 sm:px-8 py-3 sm:rounded-full 
           backdrop-blur-md bg-black/60 border-b sm:border border-white/10 
           ring-1 ring-white/5 text-white shadow-2xl transition-all">

        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <img src="/images/logo.png" alt="CineMax Logo" className="h-8 w-auto sm:h-10" />
        </Link>

        <NavLinks navLinks={navLinks} checkActive={checkActive} />

        <div className="flex items-center gap-3 sm:gap-5">
          <NotificationPanel 
            showNotifPanel={showNotifPanel}
            setShowNotifPanel={setShowNotifPanel}
            unreadCount={unreadCount}
            history={history}
            markAllAsRead={markAllAsRead}
            clearHistory={clearHistory}
            getIcon={getIcon}
            formatTime={formatTime}
            panelRef={panelRef}
          />

          <UserControls 
            isAuthenticated={isAuthenticated}
            user={user}
            location={location}
            logout={logout}
            navigate={navigate}
          />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-1 hover:text-purple-500 transition-colors"
          >
            {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navLinks={navLinks}
        checkActive={checkActive}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        navigate={navigate}
      />
    </div>
  );
};

export default Navbar;
