import React from "react";
import { UserIcon, BellIcon, FilmIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  return (
    <div className="fixed top-6 left-0 w-full px-4 sm:px-12 lg:px-24 xl:px-40 z-50">
      <nav
        className="flex justify-between items-center px-8 py-3 rounded-full 
           backdrop-blur-md bg-black/60 border border-white/10 
           ring-1 ring-white/5 text-white shadow-2xl transition-all">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg shadow-lg">
            <FilmIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CineMax
          </span>
        </div>

        <div className="hidden lg:flex gap-8">
          <a href="#home" className="text-purple-500 font-bold">Home</a>
          <a href="#movies" className="hover:text-purple-500 transition-colors">Movies</a>
          <a href="#tv" className="hover:text-purple-500 transition-colors">Trending</a>
          <a href="#favorites" className="hover:text-purple-500 transition-colors">Favorites</a>
          <a href="#upcoming" className="hover:text-purple-500 transition-colors">Upcoming</a>
        </div>

        <div className="flex items-center gap-5">
          <button className="text-white hover:text-purple-400 transition-colors bg-white/10 rounded-full p-1">
            <BellIcon className="h-6 w-6"/>
          </button>

          <button className="flex items-center gap-2 border border-purple-500/50 px-5 py-1.5 rounded-full hover:bg-purple-600 transition-all duration-300">
            <UserIcon className="h-4 w-4 text-gray-300" />
            <span className="text-sm">Sign in</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
