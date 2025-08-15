/**
 * GlowingBorder Component
 * Animated border effect component with CSS custom properties for dynamic positioning
 * Features gradient animation along border path using CSS keyframes and GPU acceleration
 */

import React from "react";
import { cn } from "@/lib/utils";
import { GlowingBorderProps } from "@/types/command-palette";
import { GLOW_INTENSITIES } from "@/lib/command-palette-constants";

const GlowingBorder = React.forwardRef<HTMLDivElement, GlowingBorderProps>(
  (
    {
      intensity = "medium",
      color,
      animationSpeed = 3,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Get intensity settings
    const intensityConfig =
      GLOW_INTENSITIES[
        intensity.toUpperCase() as keyof typeof GLOW_INTENSITIES
      ];

    // Generate CSS custom properties for dynamic positioning and animation
    const customProperties = {
      "--glow-color": color || "hsl(var(--cp-glow))",
      "--glow-blur": intensityConfig.blur,
      "--glow-spread": intensityConfig.spread,
      "--glow-opacity": intensityConfig.opacity,
      "--animation-duration": `${animationSpeed}s`,
      "--border-radius": "var(--cp-border-radius)",
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          "glowing-border-container",
          "relative",
          "will-change-transform", // GPU acceleration hint
          className
        )}
        style={customProperties}
        {...props}
      >
        {/* Animated gradient border */}
        <div
          className={cn(
            "glowing-border-gradient",
            "absolute",
            "inset-0",
            "rounded-[var(--border-radius)]",
            "opacity-0",
            "transition-opacity",
            "duration-300",
            "ease-out",
            "pointer-events-none",
            "will-change-transform" // GPU acceleration
          )}
          style={{
            background: `
            linear-gradient(
              45deg,
              var(--glow-color),
              transparent 30%,
              transparent 70%,
              var(--glow-color)
            ),
            linear-gradient(
              135deg,
              transparent 30%,
              var(--glow-color),
              transparent 70%
            ),
            linear-gradient(
              225deg,
              var(--glow-color),
              transparent 30%,
              transparent 70%,
              var(--glow-color)
            ),
            linear-gradient(
              315deg,
              transparent 30%,
              var(--glow-color),
              transparent 70%
            )
          `,
            backgroundSize: "200% 200%",
            animation: `glowing-border-animation var(--animation-duration) ease-in-out infinite`,
            filter: `blur(var(--glow-blur))`,
            transform: "translateZ(0)", // Force GPU layer
          }}
        />

        {/* Static border for fallback */}
        <div
          className={cn(
            "glowing-border-static",
            "absolute",
            "inset-0",
            "rounded-[var(--border-radius)]",
            "border",
            "border-cp-border",
            "opacity-100",
            "transition-opacity",
            "duration-300",
            "ease-out",
            "pointer-events-none"
          )}
        />

        {/* Glow effect layers */}
        <div
          className={cn(
            "glowing-border-glow",
            "absolute",
            "inset-0",
            "rounded-[var(--border-radius)]",
            "opacity-0",
            "transition-opacity",
            "duration-300",
            "ease-out",
            "pointer-events-none",
            "will-change-transform"
          )}
          style={{
            boxShadow: `
            0 0 calc(var(--glow-blur) * 0.5) var(--glow-color),
            0 0 var(--glow-blur) var(--glow-color),
            0 0 calc(var(--glow-blur) * 2) var(--glow-color)
          `,
            opacity: "var(--glow-opacity)",
            transform: "translateZ(0)",
          }}
        />

        {/* Content container */}
        <div
          className={cn(
            "glowing-border-content",
            "relative",
            "z-10",
            "h-full",
            "w-full",
            "rounded-[var(--border-radius)]",
            "bg-cp-surface",
            "transition-all",
            "duration-300",
            "ease-out"
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

GlowingBorder.displayName = "GlowingBorder";

export default GlowingBorder;
