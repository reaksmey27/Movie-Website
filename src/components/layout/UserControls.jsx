import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

const UserControls = ({ isAuthenticated, user, location, logout, navigate }) => {
    return (
        <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
                <>
                    <Link
                        to="/profile"
                        className={`flex items-center gap-2 bg-white/5 border px-4 py-1.5 rounded-full transition-all hover:bg-white/10 ${
                            location.pathname === '/profile' ? 'border-purple-500/50 bg-white/10' : 'border-white/10'
                        }`}
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
    );
};

export default UserControls;
