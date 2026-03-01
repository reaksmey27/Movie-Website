import React from 'react';
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const ProfileForm = ({ user, isEditing, setIsEditing, onSubmit }) => {
    return (
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Profile Settings</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage your cinematic identity and preferences.</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
                        isEditing
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-600/20'
                    }`}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-8">
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
    );
};

export default ProfileForm;
