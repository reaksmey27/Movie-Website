import { Link } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  MapPinIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getHandle  = (email) => email?.split("@")[0]?.replace(/\s+/g, "").toLowerCase() || "moviefan";
const getJoined  = (date)  => date
  ? new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  : "Recently";

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileAvatar = ({ user, onLogout }) => {
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="overflow-hidden rounded-[2.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">

      {/* ── Badges ── */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-emerald-200">
          <CheckBadgeIcon className="h-4 w-4" />
          Synced
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-white/50">
          CinePass
        </div>
      </div>

      {/* ── Avatar ── */}
      <div className="relative mx-auto mb-6 mt-7 h-32 w-32 sm:h-36 sm:w-36">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "Profile avatar"}
            className="h-full w-full rounded-[2.7rem] border border-white/10 object-cover shadow-2xl"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-[2.7rem] border border-white/10 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-blue-500 text-4xl font-black text-white shadow-2xl">
            {initial}
          </div>
        )}
        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/90 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-slate-100 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          Verified
        </div>
      </div>

      {/* ── Identity ── */}
      <div className="mt-10 text-center">
        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.35em] text-violet-300">
          CinePass Member
        </p>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">{user.name}</h2>
        <p className="text-sm font-semibold text-white/40">@{getHandle(user.email)}</p>
        <p className="mt-2 text-sm font-bold text-slate-400">{user.email}</p>
      </div>

      {/* ── Info grid ── */}
      <div className="mt-6 rounded-[2rem] border border-white/10 bg-slate-950/40 p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/3 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35">Genre</p>
            <p className="mt-2 text-sm font-bold text-white">{user.favoriteGenre || "Open taste"}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/3 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35">Status</p>
            <p className="mt-2 text-sm font-bold text-emerald-300">Active</p>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-4 space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <MapPinIcon className="h-4 w-4 shrink-0 text-fuchsia-400" />
            <span>{user.location || "Add your city"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <CalendarDaysIcon className="h-4 w-4 shrink-0 text-cyan-400" />
            <span>Joined {getJoined(user.memberSince)}</span>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="mt-5 flex flex-col gap-3">
        <Link
          to="/movies"
          className="flex w-full items-center justify-center gap-3 rounded-[1.6rem] bg-white py-4 text-[10px] font-black uppercase tracking-[0.28em] text-slate-950 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <PlayIcon className="h-4 w-4" />
          Browse Movies
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-3 rounded-[1.6rem] border border-rose-400/10 bg-rose-400/8 py-4 text-[10px] font-black uppercase tracking-[0.28em] text-rose-300 transition-all hover:border-rose-300/20 hover:bg-rose-400/15 active:scale-[0.98]"
        >
          <ArrowLeftOnRectangleIcon className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileAvatar;