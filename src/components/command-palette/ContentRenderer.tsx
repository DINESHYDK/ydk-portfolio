/**
 * ContentRenderer Component
 * Dynamic content display based on selected navigation with smooth transitions
 */

import React, { useState, useEffect, Suspense } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentRendererProps } from "@/types/command-palette";
import { ANIMATION_DURATIONS } from "@/lib/command-palette-constants";
import LoadingSkeleton from "./LoadingSkeleton";

// Lazy load portfolio components
const Hero = React.lazy(() => import("@/components/sections/Hero"));
const Projects = React.lazy(() => import("@/components/sections/Projects"));
const Skills = React.lazy(() => import("@/components/sections/Skills"));
const CodingStatsSection = React.lazy(
  () => import("@/components/sections/CodingStatsSection")
);
const ContactChatbot = React.lazy(
  () => import("@/components/sections/ContactChatbot")
);

interface ContentState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

const ContentRenderer = React.memo(
  React.forwardRef<HTMLDivElement, ContentRendererProps>(
    ({ activeSection, data, onBack, className, ...props }, ref) => {
      const [contentState, setContentState] = useState<ContentState>({
        isLoading: false,
        error: null,
        data: data,
      });

      // Simulate content loading with error handling
      useEffect(() => {
        if (activeSection) {
          setContentState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
          }));

          // Simulate API call or content loading with potential errors
          const timer = setTimeout(() => {
            // Simulate random errors for demonstration (remove in production)
            const shouldError = Math.random() < 0.1; // 10% chance of error

            if (shouldError && process.env.NODE_ENV === "development") {
              setContentState((prev) => ({
                ...prev,
                isLoading: false,
                error: "Failed to load content. Please try again.",
              }));
            } else {
              setContentState((prev) => ({
                ...prev,
                isLoading: false,
                data: data || { section: activeSection, timestamp: Date.now() },
              }));
            }
          }, 500);

          return () => clearTimeout(timer);
        }
      }, [activeSection, data]);

      // Render loading skeleton
      const renderLoadingSkeleton = () => <LoadingSkeleton variant="content" />;

      // Render error state
      const renderError = () => (
        <div className="text-center py-8">
          <div className="text-cp-error text-lg font-semibold mb-2">
            Failed to load content
          </div>
          <div className="text-cp-text-secondary text-sm mb-4">
            {contentState.error || "An unexpected error occurred"}
          </div>
          <button
            onClick={() =>
              setContentState((prev) => ({
                ...prev,
                error: null,
                isLoading: true,
              }))
            }
            className={cn(
              "px-4 py-2",
              "bg-cp-accent/10 hover:bg-cp-accent/20",
              "text-cp-accent",
              "border border-cp-accent/30",
              "rounded-lg",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-cp-focus/50"
            )}
          >
            Try Again
          </button>
        </div>
      );

      // Render content based on active section
      const renderContent = () => {
        const contentWrapper = (children: React.ReactNode) => (
          <div className="min-h-[400px] bg-cp-background text-cp-text-primary">
            <Suspense fallback={<LoadingSkeleton variant="content" />}>
              {children}
            </Suspense>
          </div>
        );

        switch (activeSection) {
          case "home":
          case "portfolio":
            return contentWrapper(<Hero />);

          case "projects":
            return contentWrapper(<Projects />);

          case "skills":
            return contentWrapper(<Skills />);

          case "stats":
          case "coding-stats":
            return contentWrapper(<CodingStatsSection />);

          case "contact":
            return contentWrapper(<ContactChatbot />);

          case "resume":
            return (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-cp-text-primary mb-2">
                    Resume
                  </h2>
                  <p className="text-cp-text-secondary">
                    My professional experience and qualifications.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-cp-hover/30 rounded-lg border border-cp-border/20">
                    <h3 className="font-semibold text-cp-text-primary mb-2">
                      Experience
                    </h3>
                    <p className="text-sm text-cp-text-secondary">
                      Professional roles and achievements in software
                      development.
                    </p>
                  </div>
                  <div className="p-4 bg-cp-hover/30 rounded-lg border border-cp-border/20">
                    <h3 className="font-semibold text-cp-text-primary mb-2">
                      Education
                    </h3>
                    <p className="text-sm text-cp-text-secondary">
                      Academic background and certifications.
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      className="px-4 py-2 bg-cp-accent/20 text-cp-accent rounded-lg text-sm hover:bg-cp-accent/30 transition-colors"
                      onClick={() => window.open("/resume", "_blank")}
                    >
                      View Full Resume
                    </button>
                  </div>
                </div>
              </div>
            );

          case "about":
            return (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-cp-text-primary mb-2">
                    About Me
                  </h2>
                  <p className="text-cp-text-secondary">
                    Learn more about my background and journey.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-cp-hover/30 rounded-lg border border-cp-border/20">
                    <h3 className="font-semibold text-cp-text-primary mb-2">
                      Background
                    </h3>
                    <p className="text-sm text-cp-text-secondary">
                      I'm a passionate AI engineer and software developer with
                      expertise in modern web technologies and machine learning.
                    </p>
                  </div>
                  <div className="p-4 bg-cp-hover/30 rounded-lg border border-cp-border/20">
                    <h3 className="font-semibold text-cp-text-primary mb-2">
                      Interests
                    </h3>
                    <p className="text-sm text-cp-text-secondary">
                      When I'm not coding, I enjoy exploring new technologies,
                      contributing to open source, and sharing knowledge with
                      the developer community.
                    </p>
                  </div>
                </div>
              </div>
            );

          default:
            return (
              <div className="text-center py-8">
                <div className="text-cp-text-secondary">
                  Select a section to view its content
                </div>
              </div>
            );
        }
      };

      return (
        <div
          ref={ref}
          className={cn(
            "relative",
            "w-full",
            "h-full",
            "bg-cp-surface/95",
            "backdrop-blur-xl",
            "border border-cp-border/50",
            "rounded-xl",
            "overflow-hidden",
            "shadow-2xl",
            className
          )}
          {...props}
        >
          {/* Header with back button */}
          <div className="flex-shrink-0 flex items-center gap-3 p-4 border-b border-cp-border/30">
            {onBack && (
              <button
                onClick={onBack}
                className={cn(
                  "flex items-center justify-center",
                  "w-8 h-8",
                  "rounded-lg",
                  "text-cp-text-secondary",
                  "hover:text-cp-text-primary",
                  "hover:bg-cp-hover",
                  "transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-cp-focus/50"
                )}
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div className="flex-1">
              <h1 className="text-lg font-semibold text-cp-text-primary capitalize">
                {activeSection || "Content"}
              </h1>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {contentState.isLoading && renderLoadingSkeleton()}

              {contentState.error && renderError()}

              {!contentState.isLoading && !contentState.error && (
                <div
                  className="animate-fade-in"
                  style={{
                    animationDuration: `${ANIMATION_DURATIONS.NORMAL}ms`,
                  }}
                >
                  {renderContent()}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  )
);

ContentRenderer.displayName = "ContentRenderer";

export default ContentRenderer;
