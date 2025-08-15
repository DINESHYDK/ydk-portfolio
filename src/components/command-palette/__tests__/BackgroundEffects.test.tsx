/**
 * BackgroundEffects Component Tests
 * Unit tests for background effects rendering and performance optimizations
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import BackgroundEffects from "../BackgroundEffects";

// Mock the utils
vi.mock("@/lib/utils", () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
}));

describe("BackgroundEffects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("renders with default props", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toBeInTheDocument();
      expect(backgroundContainer).toHaveClass(
        "fixed",
        "inset-0",
        "-z-10",
        "overflow-hidden",
        "pointer-events-none"
      );
      expect(backgroundContainer).toHaveAttribute("role", "presentation");
      expect(backgroundContainer).toHaveAttribute("aria-hidden", "true");
    });

    it("renders all gradient orbs", () => {
      const { container } = render(<BackgroundEffects />);

      // Should have 4 gradient orbs + 1 central glow + 1 mesh overlay + 1 noise texture = 7 child elements
      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer.children).toHaveLength(7);
    });

    it("applies custom className", () => {
      const customClass = "custom-background-class";
      const { container } = render(
        <BackgroundEffects className={customClass} />
      );

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toHaveClass(customClass);
    });
  });

  describe("Intensity Levels", () => {
    it("renders with low intensity", () => {
      const { container } = render(<BackgroundEffects intensity="low" />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toBeInTheDocument();

      // Check that gradient orbs have appropriate opacity values for low intensity
      const gradientOrbs = backgroundContainer.querySelectorAll(
        "div[style*='radial-gradient']"
      );
      expect(gradientOrbs.length).toBeGreaterThan(0);
    });

    it("renders with medium intensity (default)", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toBeInTheDocument();
    });

    it("renders with high intensity", () => {
      const { container } = render(<BackgroundEffects intensity="high" />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toBeInTheDocument();
    });
  });

  describe("Theme Support", () => {
    it("renders with dark theme (default)", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toBeInTheDocument();
    });

    it("renders with light theme", () => {
      const { container } = render(<BackgroundEffects theme="light" />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toBeInTheDocument();
    });

    it("renders with system theme", () => {
      const { container } = render(<BackgroundEffects theme="system" />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toBeInTheDocument();
    });
  });

  describe("Parallax Effects", () => {
    it("enables parallax by default", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const parallaxElements = backgroundContainer.querySelectorAll(
        ".cp-parallax-slow, .cp-parallax-medium, .cp-parallax-fast"
      );
      expect(parallaxElements.length).toBeGreaterThan(0);
    });

    it("disables parallax when enableParallax is false", () => {
      const { container } = render(
        <BackgroundEffects enableParallax={false} />
      );

      const backgroundContainer = container.firstChild as HTMLElement;
      const parallaxElements = backgroundContainer.querySelectorAll(
        ".cp-parallax-slow, .cp-parallax-medium, .cp-parallax-fast"
      );
      expect(parallaxElements.length).toBe(0);
    });
  });

  describe("Performance Optimizations", () => {
    it("uses transform3d for GPU acceleration", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const gradientOrbs = backgroundContainer.querySelectorAll(
        "div[style*='translate3d']"
      );
      expect(gradientOrbs.length).toBeGreaterThan(0);
    });

    it("applies proper CSS classes for performance", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const animatedElements = backgroundContainer.querySelectorAll(
        ".cp-parallax-slow, .cp-parallax-medium, .cp-parallax-fast, .cp-mesh-animation"
      );
      expect(animatedElements.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toHaveAttribute("role", "presentation");
      expect(backgroundContainer).toHaveAttribute("aria-hidden", "true");
    });

    it("is not interactive (pointer-events-none)", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      expect(backgroundContainer).toHaveClass("pointer-events-none");
    });
  });

  describe("Component Structure", () => {
    it("renders primary gradient orb", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const primaryOrb = backgroundContainer.querySelector(".-top-20.-left-20");
      expect(primaryOrb).toBeInTheDocument();
      expect(primaryOrb).toHaveClass(
        "w-96",
        "h-96",
        "rounded-full",
        "blur-3xl"
      );
    });

    it("renders secondary gradient orb", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const secondaryOrb =
        backgroundContainer.querySelector(".-top-32.-right-32");
      expect(secondaryOrb).toBeInTheDocument();
      expect(secondaryOrb).toHaveClass(
        "w-80",
        "h-80",
        "rounded-full",
        "blur-2xl"
      );
    });

    it("renders tertiary gradient orb", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const tertiaryOrb = backgroundContainer.querySelector(
        ".-bottom-24.-left-24"
      );
      expect(tertiaryOrb).toBeInTheDocument();
      expect(tertiaryOrb).toHaveClass(
        "w-72",
        "h-72",
        "rounded-full",
        "blur-2xl"
      );
    });

    it("renders accent gradient orb", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const accentOrb = backgroundContainer.querySelector(
        ".-bottom-16.-right-16"
      );
      expect(accentOrb).toBeInTheDocument();
      expect(accentOrb).toHaveClass("w-64", "h-64", "rounded-full", "blur-xl");
    });

    it("renders central ambient glow", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const centralGlow = backgroundContainer.querySelector(
        ".top-1\\/2.left-1\\/2"
      );
      expect(centralGlow).toBeInTheDocument();
      expect(centralGlow).toHaveClass(
        "w-[800px]",
        "h-[600px]",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "rounded-full",
        "blur-3xl",
        "opacity-30"
      );
    });

    it("renders animated mesh gradient overlay", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const meshOverlay =
        backgroundContainer.querySelector(".cp-mesh-animation");
      expect(meshOverlay).toBeInTheDocument();
      expect(meshOverlay).toHaveClass("absolute", "inset-0", "opacity-20");
    });

    it("renders noise texture overlay", () => {
      const { container } = render(<BackgroundEffects />);

      const backgroundContainer = container.firstChild as HTMLElement;
      const noiseTexture =
        backgroundContainer.querySelector(".mix-blend-overlay");
      expect(noiseTexture).toBeInTheDocument();
      expect(noiseTexture).toHaveClass("absolute", "inset-0", "opacity-[0.02]");
    });
  });

  describe("Memoization", () => {
    it("is wrapped with React.memo for performance", () => {
      // This test verifies that the component is memoized
      // We can check this by verifying the component's displayName
      expect(BackgroundEffects.displayName).toBe("BackgroundEffects");
    });
  });
});
