import {
  EnvelopeIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const FIELD_CLASS =
  "w-full rounded-xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-sky-300/50 focus:bg-slate-950/55";

const FIELDS = [
  {
    name: "name",
    label: "Display Name",
    type: "text",
    icon: UserIcon,
    placeholder: "",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    icon: EnvelopeIcon,
    placeholder: "",
    locked: true,
  },
  {
    name: "favoriteGenre",
    label: "Favorite Genre",
    type: "text",
    icon: SparklesIcon,
    placeholder: "e.g., Sci-Fi, Thriller, Indie drama...",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    icon: GlobeAltIcon,
    placeholder: "Phnom Penh, Cambodia",
  },
];

const ProfileForm = ({
  isEditing,
  formData,
  isDirty,
  onFieldChange,
  onStartEditing,
  onCancelEditing,
  onSubmit,
}) => (
  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-sm sm:p-8">
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
          Profile
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          Your details
        </h2>
        <p className="mt-1 text-sm text-gray-400">Update what you are into.</p>
      </div>
      <button
        type="button"
        onClick={isEditing ? onCancelEditing : onStartEditing}
        className={`w-full rounded-xl px-4 py-2 text-sm font-medium transition-all sm:w-auto ${
          isEditing
            ? "bg-white text-slate-950 hover:bg-gray-200"
            : "bg-sky-400 text-slate-950 hover:bg-sky-300"
        }`}
      >
        {isEditing ? "Cancel" : "Edit"}
      </button>
    </div>

    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {FIELDS.map((field) => {
          const FieldIcon = field.icon;

          return (
            <label key={field.name} className="space-y-2">
              <span className="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                {field.label}
              </span>
              <div className="relative">
                <FieldIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={onFieldChange}
                  readOnly={field.locked || !isEditing}
                  placeholder={field.placeholder}
                  className={`${FIELD_CLASS} ${field.locked ? "cursor-not-allowed border-white/5 text-gray-500" : !isEditing ? "cursor-default" : ""}`}
                  style={{ paddingLeft: 28 }}
                />
              </div>
            </label>
          );
        })}
      </div>

      <label className="block space-y-2">
        <span className="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
          Bio
        </span>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={onFieldChange}
          readOnly={!isEditing}
          placeholder="Tell people what you watch and recommend."
          className="h-28 w-full resize-none rounded-xl border border-white/10 bg-slate-950/35 p-4 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-sky-300/50 focus:bg-slate-950/55"
        />
      </label>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <PencilSquareIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
          <div>
            <p className="text-sm font-medium text-white">Saved locally</p>
            <p className="mt-1 text-sm text-gray-400">
              Your changes stay in this browser.
            </p>
          </div>
        </div>
        {isEditing && (
          <button
            type="submit"
            disabled={!isDirty}
            className="w-full rounded-xl bg-sky-400 px-6 py-3 text-sm font-medium text-slate-950 transition-all hover:bg-sky-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500 sm:w-auto"
          >
            Save
          </button>
        )}
      </div>
    </form>
  </div>
);

export default ProfileForm;
