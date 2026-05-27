import React, { memo } from "react";
import SkeletonCard from "./SkeletonCard";

const MovieGridSkeleton = ({ count = 12 }) => {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 gap-x-3 gap-y-5 min-[390px]:grid-cols-2 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
};

export default memo(MovieGridSkeleton);
