/**
 * LoadingSkeleton Component
 * Skeleton UI for loading states in the command palette
 */

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: "suggestions" | "content" | "search";
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = "suggestions",
  className,
}) => {
  const renderSuggestionsSkeleton = () => (
    <div className="space-y-2">
      {/* Category header skeleton */}
      <div className="px-3 py-2">
        <div className="h-3 bg-cp-border/30 rounded w-20 animate-pulse" />
      </div>

      {/* Suggestion items skeleton */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          {/* Icon skeleton */}
          <div className="w-5 h-5 bg-cp-border/30 rounded animate-pulse" />

          {/* Content skeleton */}
          <div className="flex-1 space-y-1">
            <div className="h-4 bg-cp-border/30 rounded w-24 animate-pulse" />
            <div className="h-3 bg-cp-border/20 rounded w-32 animate-pulse" />
          </div>

          {/* Shortcut skeleton */}
          <div className="flex gap-1">
            <div className="w-6 h-4 bg-cp-border/30 rounded animate-pulse" />
            <div className="w-4 h-4 bg-cp-border/30 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderContentSkeleton = () => (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-cp-border/30 rounded w-48 animate-pulse" />
        <div className="h-4 bg-cp-border/20 rounded w-64 animate-pulse" />
      </div>

      {/* Content blocks skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="p-4 bg-cp-hover/30 rounded-lg border border-cp-border/20"
          >
            <div className="space-y-2">
              <div className="h-5 bg-cp-border/30 rounded w-32 animate-pulse" />
              <div className="h-4 bg-cp-border/20 rounded w-full animate-pulse" />
              <div className="h-4 bg-cp-border/20 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Additional content skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-cp-hover/20 rounded-lg">
            <div className="space-y-2">
              <div className="h-5 bg-cp-border/30 rounded w-40 animate-pulse" />
              <div className="h-4 bg-cp-border/20 rounded w-full animate-pulse" />
              <div className="flex gap-2 mt-2">
                <div className="h-6 bg-cp-border/30 rounded w-16 animate-pulse" />
                <div className="h-6 bg-cp-border/30 rounded w-20 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearchSkeleton = () => (
    <div className="flex items-center gap-3 px-3 py-3">
      {/* Search icon skeleton */}
      <div className="w-4 h-4 bg-cp-border/30 rounded animate-pulse" />

      {/* Input skeleton */}
      <div className="flex-1 h-4 bg-cp-border/20 rounded animate-pulse" />

      {/* Shortcut skeleton */}
      <div className="flex gap-1">
        <div className="w-6 h-4 bg-cp-border/30 rounded animate-pulse" />
        <div className="w-4 h-4 bg-cp-border/30 rounded animate-pulse" />
      </div>
    </div>
  );

  return (
    <div
      className={cn("animate-pulse", className)}
      role="status"
      aria-label="Loading..."
    >
      {variant === "suggestions" && renderSuggestionsSkeleton()}
      {variant === "content" && renderContentSkeleton()}
      {variant === "search" && renderSearchSkeleton()}

      {/* Screen reader text */}
      <span className="sr-only">Loading content...</span>
    </div>
  );
};

export default LoadingSkeleton;
