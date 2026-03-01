import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4">
            <img src="/images/logo.png" alt="CineMax Logo" className="h-8 w-auto sm:h-10" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for the latest blockbusters and timeless classics.
              Explore, discover, and enjoy the world of cinema.
            </p>
          </div>

          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <h3 className="text-white font-semibold mb-2">Explore</h3>
            <Link to="/" className="hover:text-purple-400">Home</Link>
            <Link to="/movies" className="hover:text-purple-400">Movies</Link>
            <Link to="/trending" className="hover:text-purple-400">Trending</Link>
            <Link to="/favorites" className="hover:text-purple-400">Favorites</Link>
            <Link to="/upcoming" className="hover:text-purple-400">Upcoming</Link>
          </div>

          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <Link to="/privacy" className="hover:text-purple-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-purple-400">Terms of Use</Link>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Stay Updated</h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm 
                           focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 
                           rounded-lg text-sm font-medium transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row 
                        justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} CineMax. All rights reserved.
          </p>

          <div className="flex space-x-5 text-gray-500">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaLinkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;