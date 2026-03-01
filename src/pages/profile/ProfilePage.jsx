import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useNotification } from '../../context/NotificationContext';
import {
    UserIcon,
    EnvelopeIcon,
    HeartIcon,
    CameraIcon,
    CheckCircleIcon,
    ArrowLeftOnRectangleIcon,
    TicketIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const { favorites } = useFavorites();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setIsEditing(false);
        showNotification("Profile settings updated successfully!", "success");
    };

    const stats = [
        { label: "Favorite Movies", value: favorites.length, icon: <HeartIcon className="h-5 w-5 text-red-500" /> },
        { label: "Points Earned", value: "1,250", icon: <TicketIcon className="h-5 w-5 text-purple-500" /> },
        { label: "Account Rank", value: "Cinephile", icon: <CheckCircleIcon className="h-5 w-5 text-blue-500" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-80 space-y-6 flex-shrink-0 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 text-center shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative mx-auto w-32 h-32 mb-6">
                            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] flex items-center justify-center text-4xl font-black uppercase shadow-2xl shadow-purple-600/30">
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
                                onClick={logout}
                                className="w-full flex items-center justify-center gap-3 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-[0.98]"
                            >
                                <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>

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
                </div>

                <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Profile Settings</h1>
                                <p className="text-sm text-gray-500 font-medium">Manage your cinematic identity and preferences.</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${isEditing
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-600/20"
                                    }`}
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Display Name</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            defaultValue={user.name}
                                            className="w-full bg-black/40 border-2 border-white/5 focus:border-purple-500/50 outline-none text-white px-12 py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
                                        <input
                                            type="email"
                                            disabled={!isEditing}
                                            defaultValue={user.email}
                                            className="w-full bg-black/40 border-2 border-white/5 focus:border-purple-500/50 outline-none text-white px-12 py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Account Biography</label>
                                <textarea
                                    disabled={!isEditing}
                                    placeholder="Tell the community about your taste in movies..."
                                    className="w-full h-32 bg-black/40 border-2 border-white/5 focus:border-purple-500/50 outline-none text-white p-6 rounded-[1.5rem] font-bold transition-all disabled:opacity-50 resize-none"
                                />
                            </div>

                            {isEditing && (
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-purple-600/20 active:scale-[0.98]"
                                >
                                    Save Changes
                                </button>
                            )}
                        </form>
                    </div>

                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Join Pro Membership</h3>
                                <p className="text-white/80 font-medium max-w-md">Unlock early access to upcoming trailers and high-definition streaming for your favorites.</p>
                            </div>
                            <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
