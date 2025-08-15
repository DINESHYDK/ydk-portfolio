/**
 * BackgroundEffects Component
 * Ambient lighting effects with CSS gradients and performance-optimized rendering
 */

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundEffectsProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
  theme?: "dark" | "light" | "system";
  enableParallax?: boolean;
}

const BackgroundEffects = React.memo<BackgroundEffectsProps>(
  ({
    className,
    intensity = "medium",
    theme = "dark",
    enableParallax = true,
  }) => {
    // Get intensity-based opacity values
    const getIntensityValues = () => {
      switch (intensity) {
        case "low":
          return { primary: 0.1, secondary: 0.05, tertiary: 0.03 };
        case "high":
          return { primary: 0.4, secondary: 0.25, tertiary: 0.15 };
        default:
          return { primary: 0.2, secondary: 0.12, tertiary: 0.08 };
      }
    };

    const intensityValues = getIntensityValues();

    // Theme-aware color values
    const getThemeColors = () => {
      if (theme === "light") {
        return {
          primary: "195, 100%, 60%", // Electric blue
          secondary: "270, 100%, 70%", // Vibrant purple
          tertiary: "195, 100%, 70%", // Bright cyan
          accent: "270, 100%, 80%", // Bright purple
        };
      }

      // Dark theme colors
      return {
        primary: "195, 100%, 70%", // Brighter electric blue for dark
        secondary: "270, 100%, 80%", // Brighter purple for dark
        tertiary: "195, 100%, 85%", // Brighter cyan for dark
        accent: "270, 100%, 90%", // Brighter purple for dark
      };
    };

    const colors = getThemeColors();

    return (
      <div
        className={cn(
          "fixed inset-0 -z-10 overflow-hidden",
          "pointer-events-none",
          className
        )}
        role="presentation"
        aria-hidden="true"
      >
        {/* Primary gradient orb - top left */}
        <div
          className={cn(
            "absolute -top-20 -left-20",
            "w-96 h-96 rounded-full",
            "bg-gradient-radial",
            "blur-3xl",
            enableParallax && "cp-parallax-slow"
          )}
          style={{
            background: `radial-gradient(circle, hsla(${colors.primary}, ${intensityValues.primary}) 0%, transparent 70%)`,
            transform: enableParallax ? "translate3d(0, 0, 0)" : undefined,
          }}
        />

        {/* Secondary gradient orb - top right */}
        <div
          className={cn(
            "absolute -top-32 -right-32",
            "w-80 h-80 rounded-full",
            "blur-2xl",
            enableParallax && "cp-parallax-medium"
          )}
          style={{
            background: `radial-gradient(circle, hsla(${colors.secondary}, ${intensityValues.secondary}) 0%, transparent 60%)`,
            transform: enableParallax ? "translate3d(0, 0, 0)" : undefined,
          }}
        />

        {/* Tertiary gradient orb - bottom left */}
        <div
          className={cn(
            "absolute -bottom-32 -left-32",
            "w-72 h-72 rounded-full",
            "blur-2xl",
            enableParallax && "cp-parallax-fast"
          )}
          style={{
            background: `radial-gradient(circle, hsla(${colors.tertiary}, ${intensityValues.tertiary}) 0%, transparent 65%)`,
            transform: enableParallax ? "translate3d(0, 0, 0)" : undefined,
          }}
        />

        {/* Accent gradient orb - bottom right */}
        <div
          className={cn(
            "absolute -bottom-20 -right-20",
            "w-64 h-64 rounded-full",
            "blur-xl",
            enableParallax && "cp-parallax-medium"
          )}
          style={{
            background: `radial-gradient(circle, hsla(${colors.accent}, ${intensityValues.tertiary}) 0%, transparent 55%)`,
            transform: enableParallax ? "translate3d(0, 0, 0)" : undefined,
          }}
        />

        {/* Mesh gradient overlay for depth */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-br",
            "from-transparent",
            "via-transparent",
            "to-transparent",
            enableParallax && "cp-mesh-animation"
          )}
          style={{
            background: `
              radial-gradient(circle at 20% 80%, hsla(${colors.primary}, ${intensityValues.primary * 0.5}) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, hsla(${colors.secondary}, ${intensityValues.secondary * 0.5}) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, hsla(${colors.tertiary}, ${intensityValues.tertiary * 0.5}) 0%, transparent 50%)
            `,
            backgroundSize: "100% 100%, 100% 100%, 100% 100%",
            backgroundPosition: "0% 0%, 100% 100%, 50% 50%",
            mixBlendMode: "screen",
            opacity: 0.3,
          }}
        />
      </div>
    );
  }
);

BackgroundEffects.displayName = "BackgroundEffects";

export default BackgroundEffects;
