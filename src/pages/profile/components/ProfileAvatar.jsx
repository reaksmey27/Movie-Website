import React from 'react';
import { CameraIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

const ProfileAvatar = ({ user, onLogout }) => {
    return (
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 text-center shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] flex items-center justify-center text-4xl font-black uppercase shadow-2xl shadow-purple-600/30 text-white">
                    {user.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 bg-white text-black p-2.5 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                    <CameraIcon className="h-5 w-5" />
                </button>
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">{user.name}</h2>
            <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">{user.email}</span>

            <div className="pt-8 mt-8 border-t border-white/5 flex flex-col gap-3">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-[0.98]"
                >
                    <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default ProfileAvatar;
