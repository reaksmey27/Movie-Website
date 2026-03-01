import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = ({ 
    isMenuOpen, 
    setIsMenuOpen, 
    navLinks, 
    checkActive, 
    isAuthenticated, 
    user, 
    logout, 
    navigate 
}) => {
    if (!isMenuOpen) return null;

    return (
        <div className="fixed inset-0 top-[60px] sm:top-[76px] z-[90] lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={() => setIsMenuOpen(false)} />
            <div className="relative z-10 p-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-2xl font-black uppercase tracking-tighter ${
                            checkActive(link.path) ? 'text-purple-500 px-4 border-l-4 border-purple-500' : 'text-gray-400 hover:text-white'
                        }`}
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
    );
};

export default MobileMenu;
