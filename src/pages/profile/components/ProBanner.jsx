import { SparklesIcon } from "@heroicons/react/24/solid";

// Simple, clean header for the Profile page
const ProBanner = ({ user }) => {
  return (
    <section className="overflow-hidden rounded-[2.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-2xl backdrop-blur-2xl">
      <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-purple-200">
          <SparklesIcon className="h-4 w-4" />
          Profile Lounge
        </div>
        <h1 className="mt-6 text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
          {user?.name}
        </h1>
      </div>
    </section>
  );
};

export default ProBanner;
