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
          primary: "266, 85%, 58%", // Purple
          secondary: "220, 100%, 70%", // Blue
          tertiary: "176, 100%, 76%", // Cyan
          accent: "283, 100%, 73%", // Magenta
        };
      }

      // Dark theme colors
      return {
        primary: "266, 100%, 70%", // Brighter purple for dark
        secondary: "220, 100%, 80%", // Brighter blue for dark
        tertiary: "176, 100%, 85%", // Brighter cyan for dark
        accent: "283, 100%, 80%", // Brighter magenta for dark
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
            "absolute -bottom-24 -left-24",
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
            "absolute -bottom-16 -right-16",
            "w-64 h-64 rounded-full",
            "blur-xl",
            enableParallax && "cp-parallax-medium"
          )}
          style={{
            background: `radial-gradient(circle, hsla(${colors.accent}, ${intensityValues.secondary}) 0%, transparent 55%)`,
            transform: enableParallax ? "translate3d(0, 0, 0)" : undefined,
          }}
        />

        {/* Central ambient glow */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2",
            "w-[800px] h-[600px]",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-full",
            "blur-3xl opacity-30",
            enableParallax && "cp-parallax-slow"
          )}
          style={{
            background: `conic-gradient(
              from 0deg,
              hsla(${colors.primary}, 0.1) 0deg,
              hsla(${colors.secondary}, 0.08) 90deg,
              hsla(${colors.tertiary}, 0.06) 180deg,
              hsla(${colors.accent}, 0.08) 270deg,
              hsla(${colors.primary}, 0.1) 360deg
            )`,
            transform: enableParallax
              ? "translate3d(-50%, -50%, 0)"
              : undefined,
          }}
        />

        {/* Animated mesh gradient overlay */}
        <div
          className={cn("absolute inset-0", "opacity-20", "cp-mesh-animation")}
          style={{
            background: `
              radial-gradient(circle at 20% 80%, hsla(${colors.primary}, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, hsla(${colors.secondary}, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, hsla(${colors.tertiary}, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 60% 80%, hsla(${colors.accent}, 0.08) 0%, transparent 50%)
            `,
          }}
        />

        {/* Subtle noise texture overlay */}
        <div
          className={cn(
            "absolute inset-0",
            "opacity-[0.02]",
            "mix-blend-overlay"
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    );
  }
);

BackgroundEffects.displayName = "BackgroundEffects";

export default BackgroundEffects;
