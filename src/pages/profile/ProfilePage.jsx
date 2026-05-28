import useProfile from "../../hooks/auth/useProfile";
import GuestBanner from "./components/Guestbanner";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileCollection from "./components/ProfileCollection";
import ProfileForm from "./components/ProfileForm";
import ProfileStats from "./components/ProfileStats";

// ─── Component ────────────────────────────────────────────────────────────────

const ProfilePage = () => {
  const {
    user,
    logout,
    isEditing,
    setIsEditing,
    formData,
    isDirty,
    handleFieldChange,
    handleCancelEditing,
    handleUpdateProfile,
  } = useProfile();

  if (!user) return <GuestBanner />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-20 pt-28 sm:px-12 sm:pb-24 sm:pt-36 lg:px-24 xl:px-40">
      {/* ── Background glows ── */}
      <div className="absolute right-0 top-0 -z-10 h-150 w-150 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-125 w-125 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute left-1/2 top-40 -z-10 h-105 w-105 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[140px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(180deg,rgba(124,58,237,0.14),rgba(15,23,42,0))]" />

      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4">
            <ProfileAvatar user={user} onLogout={logout} />
            <ProfileStats user={user} />
          </div>

          <div className="space-y-8 lg:col-span-8">
            <ProfileForm
              isEditing={isEditing}
              formData={formData}
              isDirty={isDirty}
              onFieldChange={handleFieldChange}
              onStartEditing={() => setIsEditing(true)}
              onCancelEditing={handleCancelEditing}
              onSubmit={handleUpdateProfile}
            />
            <ProfileCollection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
