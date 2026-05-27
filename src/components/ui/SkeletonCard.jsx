import React, { memo } from "react";

const SkeletonCard = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative h-[18.5rem] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl min-[380px]:h-[21rem] min-[420px]:h-[24rem] sm:h-[26rem] md:h-[30rem] lg:h-[32rem] ${className}`}
    >
      <div className="absolute inset-0 skeleton-shimmer opacity-60" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-slate-900/25" />

      <div className="absolute right-2 top-2 z-10 flex flex-col gap-2 sm:right-4 sm:top-4 sm:gap-3">
        <span className="h-8 w-8 rounded-xl border border-white/10 bg-slate-800/90 skeleton-shimmer sm:h-10 sm:w-10" />
        <span className="h-8 w-8 rounded-xl border border-white/10 bg-slate-800/90 skeleton-shimmer sm:h-10 sm:w-10" />
      </div>

      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
        <span className="block h-14 w-14 rounded-full border border-white/10 bg-slate-800/90 skeleton-shimmer" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <span className="block h-4 w-4/5 rounded-md bg-slate-200/15 skeleton-shimmer min-[420px]:h-[1.1rem] sm:h-6 md:h-7" />
            <span className="block h-4 w-3/5 rounded-md bg-slate-200/15 skeleton-shimmer min-[420px]:h-[1.1rem] sm:h-6 md:h-7" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="h-5 w-14 rounded-md bg-slate-200/20 skeleton-shimmer" />
            <span className="h-6 w-22 rounded-md bg-slate-200/15 skeleton-shimmer" />
            <span className="h-3 w-24 rounded-full bg-slate-200/10 skeleton-shimmer min-[420px]:ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SkeletonCard);
