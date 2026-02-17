import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              CineMax
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for the latest blockbusters and timeless classics. 
              Explore, discover, and enjoy the world of cinema.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
              <h3 className="text-white font-semibold mb-2">Explore</h3>
              <a href="#" className="hover:text-purple-400 transition-colors">Movies</a>
              <a href="#" className="hover:text-purple-400 transition-colors">TV Shows</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Trending</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Favorite</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Upcoming</a>
            </div>
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
              <h3 className="text-white font-semibold mb-2">Legal</h3>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Use</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Stay Updated</h3>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} MovieHub. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-500 text-xs">
            <span>Made with ❤️ for Cinema</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer