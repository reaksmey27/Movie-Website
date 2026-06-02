import { Link } from "react-router-dom";
import { ArrowRightIcon, BookmarkSquareIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";

const featureBlocks = [
  {
    icon: MagnifyingGlassIcon,
    title: "Discover faster",
    text:
      "Use the home page as a guided starting point instead of a blank search field. Trending rows surface the movies people are talking about now, while upcoming titles help you see what is arriving soon. Top rated selections make it easier to move from casual browsing to a confident choice without opening a dozen tabs.",
  },
  {
    icon: SparklesIcon,
    title: "Choose by mood",
    text:
      "The genre rows are designed for moments when you already know the feeling you want, even if you do not know the title yet. Action, comedy, science fiction, fantasy, crime, and animation each create a different path through the catalog, so the homepage works just as well for deliberate planning as it does for spontaneous movie nights.",
  },
  {
    icon: BookmarkSquareIcon,
    title: "Save what matters",
    text:
      "CineMax is not only about discovery. Once you find a title that looks promising, you can open the detail page, watch the trailer, review the synopsis, and save it to your favorites or watchlist. That keeps your best picks organized so you do not have to remember them later.",
  },
];

const processSteps = [
  {
    title: "Scan the hero",
    text:
      "Start with the featured movie banner at the top of the page. It highlights one strong recommendation at a time and gives you a quick sense of tone, genre, and rating before you scroll any further.",
  },
  {
    title: "Compare the rows",
    text:
      "Move through the carousels to compare categories side by side. Trending now, upcoming releases, top rated films, and curated genre rows each answer a different question, which makes the page feel more useful than a single static list.",
  },
  {
    title: "Open the detail view",
    text:
      "When a title catches your eye, open the movie detail page to get the full story. You can check the plot summary, explore additional artwork, see the rating and release information, and decide whether it belongs in your favorites or watchlist.",
  },
];

const HomeInfoSection = () => {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-24 xl:px-40">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-6">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                Explore More Than a Catalog
              </p>
              <h2 className="text-3xl font-black uppercase leading-none tracking-tighter text-white sm:text-4xl lg:text-5xl">
                A home page built for discovery, not just decoration
              </h2>
              <p className="text-sm font-medium leading-7 text-gray-400 sm:text-base sm:leading-8">
                CineMax is designed to help visitors move from curiosity to action quickly. Instead of forcing people to dig through menus or search blindly, the homepage gives them an immediate overview of what is popular, what is coming next, and what is worth saving for later. That matters for usability and for search engines too, because a page with clear context, descriptive headings, and useful body copy tells both people and crawlers exactly what the site offers. In practice, the result is a homepage that feels like a movie guide, a watchlist assistant, and a launchpad for browsing all at once.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {featureBlocks.map((feature) => {
                const FeatureIcon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10 backdrop-blur-sm"
                  >
                    <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-purple-600/15 p-3 text-purple-300">
                      <FeatureIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-lg font-black uppercase tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-medium leading-7 text-gray-400">
                      {feature.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-linear-to-b from-white/8 to-white/4 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
              How It Works
            </p>
            <h3 className="mt-3 text-2xl font-black uppercase tracking-tighter text-white sm:text-3xl">
              A simple path from browsing to watching
            </h3>
            <div className="mt-6 space-y-5">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-black text-white">
                      0{index + 1}
                    </span>
                    <h4 className="text-base font-black uppercase tracking-tight text-white">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-sm font-medium leading-7 text-gray-400">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-600/10 p-5">
              <h4 className="text-base font-black uppercase tracking-tight text-white">
                Why this helps the page
              </h4>
              <p className="mt-3 text-sm font-medium leading-7 text-gray-300">
                Search engines look for pages that answer a real user need, and people do too. A homepage with clear explanations, descriptive section headings, and supporting paragraphs is easier to scan, easier to trust, and more likely to keep visitors engaged long enough to explore other parts of the site.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/movies"
                className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-purple-500 active:scale-95"
              >
                Browse Movies
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                to="/trending"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-white/10 active:scale-95"
              >
                View Trending
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10 sm:p-8 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-white sm:text-2xl">
              More reasons to keep scrolling
            </h3>
            <p className="text-sm font-medium leading-7 text-gray-400 sm:text-base sm:leading-8">
              The sections below the hero are intentionally broad so they support a wide range of visitor intent. Someone in a hurry can jump straight into a trending row and pick a title in seconds. Someone planning a weekend lineup can check the upcoming section and save promising films ahead of time. Someone who already knows their favorite genre can use the dedicated rows to stay in a familiar lane while still discovering something new. That mix of depth and flexibility is what makes a homepage feel useful instead of empty.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium leading-7 text-gray-400 sm:text-base sm:leading-8">
              CineMax also supports the moments between decisions. If you are unsure what to watch, the site gives you enough context to narrow your options without overwhelming you with information. If you are ready to commit, the movie detail page helps you make the final call with a trailer, synopsis, and rating. If you are not ready yet, your favorites and watchlist keep the momentum for later. That combination of discovery, saving, and revisiting is exactly what turns a simple movie browser into a repeat destination.
            </p>
            <p className="text-sm font-medium leading-7 text-gray-400 sm:text-base sm:leading-8">
              The result is a landing page that does more than showcase artwork. It explains the value of the product, describes the browsing experience, and gives visitors multiple paths into the catalog. Those are the kinds of signals that improve both usability and page content depth, which is why this section is now part of the homepage instead of hiding in a separate page that few people will see.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeInfoSection;
