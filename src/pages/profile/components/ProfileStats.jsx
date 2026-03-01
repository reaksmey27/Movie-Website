import React from 'react';
import { HeartIcon, CheckCircleIcon, TicketIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '../../../context/FavoritesContext';

const ProfileStats = () => {
    const { favorites } = useFavorites();

    const stats = [
        { label: 'Favorite Movies', value: favorites.length, icon: <HeartIcon className="h-5 w-5 text-red-500" /> },
        { label: 'Points Earned', value: '1,250', icon: <TicketIcon className="h-5 w-5 text-purple-500" /> },
        { label: 'Account Rank', value: 'Cinephile', icon: <CheckCircleIcon className="h-5 w-5 text-blue-500" /> },
    ];

    return (
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-xl">
            {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4 group">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                        <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfileStats;
