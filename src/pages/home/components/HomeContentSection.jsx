import { memo } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const HIGHLIGHTS = [
  {
    title: "Find something for every mood",
    description:
      "Browse trending hits, upcoming releases, top-rated stories, and genre collections that make it easier to move from casual scrolling to a movie you genuinely want to watch.",
  },
  {
    title: "Build your own personal cinema hub",
    description:
      "Save favorites, organize a watchlist, and keep the titles that caught your attention close by so movie night never starts with a blank screen.",
  },
  {
    title: "Explore faster with richer context",
    description:
      "Ratings, artwork, trailers, and quick summaries help you compare films at a glance before you commit to a full detail page.",
  },
  {
    title: "Return whenever your taste changes",
    description:
      "Fresh rows make it easy to revisit the homepage for new releases, familiar favorites, and different genres as your next movie mood shifts.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const HighlightCard = ({ title, description }) => (
  <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20 sm:p-5">
    <h3 className="text-lg font-extrabold tracking-tight text-white">{title}</h3>
    <p className="mt-3 text-sm leading-6 text-slate-300 sm:leading-7">{description}</p>
  </article>
);

// ─── Component ────────────────────────────────────────────────────────────────

const HomeContentSection = () => (
  <section className="px-4 py-6 sm:px-6 sm:py-10 lg:px-24 xl:px-40">
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-purple-950/20 backdrop-blur-sm sm:rounded-4xl">
      <div className="grid gap-8 px-5 py-6 sm:px-8 sm:py-10 lg:grid-cols-[1.25fr_0.95fr] lg:px-12 lg:py-14">

        {/* ── Left: editorial copy ── */}
        <div className="space-y-5">
          <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-purple-200 sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
            More To Explore
          </span>

          <h2 className="max-w-3xl text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            CineMax is built to help movie fans discover the right film, not just the loudest one.
          </h2>

          <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            The homepage is designed as a fast, cinematic guide for people who want more than a
            list of posters. Instead of making you guess what is worth your time, CineMax brings
            together trending movies, upcoming releases, top-rated favorites, and carefully grouped
            genres in one place. That means you can jump from science fiction to comedy, compare
            popular titles, and spot new releases without opening five different tabs or apps.
          </p>

          <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Whether you are planning a weekend watch party, looking for a quick recommendation
            after work, or building a personal list for later, the experience stays simple. Movie
            cards surface the visuals and details that matter most, the featured hero spotlights
            major picks with trailer access, and saved collections help you keep track of the
            stories you do not want to lose. The goal is to make discovery feel exciting,
            organized, and genuinely useful for everyday movie browsing.
          </p>

          <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            CineMax also helps when you do not know exactly what you want yet. Start with the
            biggest titles of the moment, move into a genre that matches your mood, then open a
            film page when something looks promising. Because each section has a clear purpose, the
            homepage works for quick decisions and slower browsing: you can chase a blockbuster,
            discover an animated favorite, check what is coming soon, or save a title for a calmer
            night without losing your place.
          </p>
        </div>

        {/* ── Right: highlight cards ── */}
        <div className="grid gap-4 self-start">
          {HIGHLIGHTS.map((item) => (
            <HighlightCard key={item.title} {...item} />
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default memo(HomeContentSection);
