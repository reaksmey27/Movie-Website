import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  MapPinIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

const ProfileAvatar = ({ user, onLogout }) => {
  const userInitial = (user.name || user.email || "?").charAt(0).toUpperCase();
  const userHandle = user.email?.split("@")[0]?.replace(/\s+/g, "").toLowerCase() || "moviefan";
  const joinedOn = user.memberSince
    ? new Date(user.memberSince).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";
  const favoriteGenreLabel = user.favoriteGenre || "Open taste";
  const locationLabel = user.location || "Add your city or timezone";

  return (
    <div className="group relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-[#131a31]/95 p-8 shadow-[0_30px_90px_rgba(7,10,26,0.55)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(172,94,255,0.22),_transparent_40%),linear-gradient(180deg,rgba(98,67,198,0.18)_0%,rgba(15,23,42,0)_40%,rgba(59,130,246,0.1)_100%)]" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute right-[-68px] top-[-88px] h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute left-[-48px] top-20 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl transition-transform duration-700 group-hover:scale-110" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-emerald-200">
          <CheckBadgeIcon className="h-4 w-4" />
          Synced identity
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-white/65">
          CinePass ID
        </div>
      </div>

      <div className="relative mx-auto mb-6 mt-7 h-36 w-36">
        <div className="absolute inset-0 rounded-[2.85rem] bg-gradient-to-br from-cyan-400/25 via-violet-500/25 to-fuchsia-500/25 blur-xl" />
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "Profile avatar"}
            className="relative h-full w-full rounded-[2.7rem] border border-white/10 object-cover shadow-2xl shadow-sky-950/40"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center rounded-[2.7rem] border border-white/10 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-blue-500 text-4xl font-black uppercase text-white shadow-2xl shadow-sky-950/40">
            {userInitial}
          </div>
        )}

        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/88 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-slate-100 shadow-lg shadow-slate-950/50 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          Verified
        </div>
      </div>

      <div className="mb-2 mt-10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-violet-200">
        <CheckBadgeIcon className="h-4 w-4" />
        CinePass Member
      </div>

      <h2 className="mb-1 text-center text-3xl font-black uppercase tracking-[-0.04em] text-white">
        {user.name}
      </h2>
      <p className="text-center text-sm font-semibold tracking-wide text-white/45">@{userHandle}</p>
      <p className="mt-3 text-center text-sm font-bold text-slate-300">{user.email}</p>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
              Signature taste
            </p>
            <p className="mt-2 text-base font-bold text-white">{favoriteGenreLabel}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
              Status
            </p>
            <p className="mt-2 text-base font-bold text-emerald-200">Active member</p>
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-[1.5rem] border border-white/8 bg-black/20 p-4">
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <MapPinIcon className="h-5 w-5 text-fuchsia-300" />
            <span>{locationLabel}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <CalendarDaysIcon className="h-5 w-5 text-cyan-300" />
            <span>Joined {joinedOn}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Link
          to="/movies"
          className="flex w-full items-center justify-center gap-3 rounded-[1.6rem] bg-gradient-to-r from-white via-slate-100 to-slate-200 py-4 text-[10px] font-black uppercase tracking-[0.28em] text-slate-950 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <PlayIcon className="h-4 w-4" />
          Browse Movies
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-3 rounded-[1.6rem] border border-rose-400/10 bg-rose-400/8 py-4 text-[10px] font-black uppercase tracking-[0.28em] text-rose-300 transition-all hover:border-rose-300/20 hover:bg-rose-400/16 active:scale-[0.98]"
        >
          <ArrowLeftOnRectangleIcon className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileAvatar;
