import React from 'react';
import useProfile from '../../hooks/auth/useProfile';
import ProfileAvatar from './components/ProfileAvatar';
import ProfileStats from './components/ProfileStats';
import ProfileForm from './components/ProfileForm';
import ProBanner from './components/ProBanner';

const ProfilePage = () => {
    const { user, logout, isEditing, setIsEditing, handleUpdateProfile } = useProfile();

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-950 pt-40 pb-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* Left Sidebar */}
                <div className="w-full lg:w-80 space-y-6 flex-shrink-0 animate-in fade-in slide-in-from-left-8 duration-700">
                    <ProfileAvatar user={user} onLogout={logout} />
                    <ProfileStats />
                </div>

                {/* Right Content */}
                <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <ProfileForm
                        user={user}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        onSubmit={handleUpdateProfile}
                    />
                    <ProBanner />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
