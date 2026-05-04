import React from "react";
import {
  EnvelopeIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const fieldClassName =
  "w-full rounded-2xl border border-white/10 bg-black/40 px-12 py-4 font-semibold text-white outline-none transition-all placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-black/60";

const ProfileForm = ({
  isEditing,
  formData,
  isDirty,
  onFieldChange,
  onStartEditing,
  onCancelEditing,
  onSubmit,
}) => {
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-2xl">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            Profile Studio
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tighter text-white">
            Shape your cinema identity
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium text-gray-400">
            Personalize how this account feels on this device. Your Google email stays locked,
            but your name, vibe, and preferences can evolve.
          </p>
        </div>

        <button
          type="button"
          onClick={isEditing ? onCancelEditing : onStartEditing}
          className={`rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all ${
            isEditing
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-purple-600 text-white shadow-lg shadow-purple-600/20 hover:bg-purple-500"
          }`}
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="ml-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
              Display Name
            </span>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onFieldChange}
                readOnly={!isEditing}
                className={`${fieldClassName} ${!isEditing ? "cursor-default" : ""}`}
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="ml-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
              Email Address
            </span>
            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className={`${fieldClassName} cursor-not-allowed border-white/5 text-gray-400`}
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="ml-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
              Favorite Genre
            </span>
            <div className="relative">
              <SparklesIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                name="favoriteGenre"
                value={formData.favoriteGenre}
                onChange={onFieldChange}
                readOnly={!isEditing}
                placeholder="Sci-Fi, Thriller, Indie drama..."
                className={`${fieldClassName} ${!isEditing ? "cursor-default" : ""}`}
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="ml-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
              Location
            </span>
            <div className="relative">
              <GlobeAltIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onFieldChange}
                readOnly={!isEditing}
                placeholder="Phnom Penh, Cambodia"
                className={`${fieldClassName} ${!isEditing ? "cursor-default" : ""}`}
              />
            </div>
          </label>
        </div>

        <label className="block space-y-2">
          <span className="ml-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
            Bio
          </span>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={onFieldChange}
            readOnly={!isEditing}
            placeholder="Tell people what kind of movies you chase, rewatch, and recommend."
            className="h-36 w-full resize-none rounded-[1.75rem] border border-white/10 bg-black/40 p-6 font-semibold text-white outline-none transition-all placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-black/60"
          />
        </label>

        <div className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-black/25 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <PencilSquareIcon className="mt-0.5 h-5 w-5 text-purple-300" />
            <div>
              <p className="text-sm font-bold text-white">Local profile personalization</p>
              <p className="mt-1 text-sm text-gray-400">
                Changes are stored in this browser so your profile feels tailored every time
                you come back.
              </p>
            </div>
          </div>

          {isEditing ? (
            <button
              type="submit"
              disabled={!isDirty}
              className="rounded-2xl bg-purple-600 px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-xl shadow-purple-600/20 transition-all hover:bg-purple-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500"
            >
              Save Profile
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
