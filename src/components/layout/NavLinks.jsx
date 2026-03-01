import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = ({ navLinks, checkActive }) => {
    return (
        <div className="hidden lg:flex gap-10">
            {navLinks.map((link) => {
                const isActive = checkActive(link.path);
                return (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`relative py-1 transition-all duration-300 font-bold tracking-wide group ${
                            isActive ? "text-purple-500 scale-105" : "text-white/80 hover:text-white hover:scale-105"
                        }`}
                    >
                        {link.name}
                        <span
                            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 bg-purple-500 rounded-full transition-all duration-300 ${
                                isActive
                                    ? "w-4 opacity-100 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                                    : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                            }`}
                        />
                    </Link>
                );
            })}
        </div>
    );
};

export default NavLinks;
