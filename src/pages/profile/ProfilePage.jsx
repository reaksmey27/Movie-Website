import React from "react";
import { Link } from "react-router-dom";
import {
  FilmIcon,
  HeartIcon,
  PlayIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import LoginButton from "../../components/auth/LoginButton";
import useProfile from "../../hooks/auth/useProfile";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileStats from "./components/ProfileStats";
import ProfileForm from "./components/ProfileForm";
import ProfileCollection from "./components/ProfileCollection";

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

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 pb-24 pt-32 sm:px-8">
        <div className="absolute left-[-120px] top-24 -z-10 h-[420px] w-[420px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute bottom-[-120px] right-[-40px] -z-10 h-[420px] w-[420px] rounded-full bg-blue-500/15 blur-[120px]" />

        <div className="w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-white/10 p-10 lg:border-b-0 lg:border-r">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">
                <SparklesIcon className="h-4 w-4" />
                Profile Hub
              </div>

              <h1 className="mt-6 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
                Build a profile that feels like your taste.
              </h1>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-gray-300">
                Sign in with Google to unlock your avatar, keep favorites close, and shape a
                movie identity that stays ready for every visit.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold text-white/80">
                  Saved favorites dashboard
                </div>
                <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold text-white/80">
                  Personalized profile notes
                </div>
                <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold text-white/80">
                  Quick movie shortcuts
                </div>
              </div>
            </div>

            <div className="p-10">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
                Unlock your account
              </h2>
              <p className="mt-3 text-sm font-medium text-gray-400">
                One sign-in gives you access to synced identity, personalized details, and a
                smoother favorites experience.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
                  <p className="text-sm font-bold text-white">Google-powered account card</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Pull in your name and avatar instantly, then refine the rest locally.
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
                  <p className="text-sm font-bold text-white">Collection insights</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Track favorite counts, average ratings, and your strongest genre trends.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <LoginButton />
                <Link
                  to="/movies"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition-all hover:bg-white/10"
                >
                  <PlayIcon className="h-4 w-4" />
                  Browse Movies First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const memberSinceLabel = user.memberSince
    ? new Date(user.memberSince).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "this season";
  const profileCompletion = Math.round(
    ([user.name, user.location, user.favoriteGenre, user.bio].filter(Boolean).length / 4) *
      100,
  );
  const profileMilestones = [
    { label: "Collection mode", value: "Favorites + identity" },
    { label: "Member since", value: memberSinceLabel },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-24 pt-40 sm:px-12 lg:px-24 xl:px-40">
      <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute left-1/2 top-40 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[140px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(180deg,rgba(124,58,237,0.14),rgba(15,23,42,0))]" />

      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[2.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-2xl backdrop-blur-2xl">
          <div className="grid gap-8 px-8 py-10 sm:px-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div className="animate-in slide-in-from-left-6 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-purple-200">
                <SparklesIcon className="h-4 w-4" />
                Member Lounge
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase tracking-[-0.05em] text-white sm:text-5xl">
                {user.name}, your watchlist universe is ready for the next favorite.
              </h1>
              <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-300">
                Keep your profile polished, make your taste easier to read, and jump back
                into the movies that match your mood without digging around.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/favorites"
                  className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-black transition-all hover:-translate-y-0.5"
                >
                  <HeartIcon className="h-4 w-4" />
                  Open Favorites
                </Link>
                <Link
                  to="/movies"
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-white transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <PlayIcon className="h-4 w-4" />
                  Discover Something New
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:max-w-2xl">
                {profileMilestones.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.6rem] border border-white/10 bg-slate-950/35 p-4"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 animate-in slide-in-from-right-6 duration-700">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                  Profile Complete
                </p>
                <p className="mt-2 text-4xl font-black text-white">{profileCompletion}%</p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  A few details left and your member card will feel fully dialed in.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6">
                <div className="flex items-center gap-3 text-cyan-200">
                  <div className="rounded-2xl bg-cyan-400/10 p-3">
                    <FilmIcon className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    Signature Taste
                  </p>
                </div>
                <p className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
                  {user.favoriteGenre || "Still defining it"}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Add your favorite genre to make recommendations feel more personal.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.14),rgba(168,85,247,0.12))] p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-100/70">
                  Next Move
                </p>
                <p className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                  Finish your bio and sharpen your taste profile.
                </p>
                <p className="mt-2 text-sm text-slate-200/90">
                  Small details make the whole account page feel much more complete.
                </p>
              </div>
            </div>
          </div>
        </section>

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
