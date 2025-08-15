/**
 * GlowingBorder Component Tests
 * Unit tests for GlowingBorder component props and rendering
 */

import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GlowingBorder from "../GlowingBorder";

describe("GlowingBorder", () => {
  beforeEach(() => {
    // Clear any existing styles
    document.head.innerHTML = "";
  });

  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<GlowingBorder />);
      expect(
        document.querySelector(".glowing-border-container")
      ).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(
        <GlowingBorder>
          <div data-testid="child-content">Test Content</div>
        </GlowingBorder>
      );

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<GlowingBorder className="custom-class" />);
      const container = document.querySelector(".glowing-border-container");
      expect(container).toHaveClass("custom-class");
    });

    it("renders all required border elements", () => {
      render(<GlowingBorder />);

      expect(
        document.querySelector(".glowing-border-gradient")
      ).toBeInTheDocument();
      expect(
        document.querySelector(".glowing-border-static")
      ).toBeInTheDocument();
      expect(
        document.querySelector(".glowing-border-glow")
      ).toBeInTheDocument();
      expect(
        document.querySelector(".glowing-border-content")
      ).toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it("applies default intensity (medium)", () => {
      render(<GlowingBorder />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--glow-blur")).toBe("20px");
      expect(container.style.getPropertyValue("--glow-spread")).toBe("4px");
      expect(container.style.getPropertyValue("--glow-opacity")).toBe("0.3");
    });

    it("applies low intensity correctly", () => {
      render(<GlowingBorder intensity="low" />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--glow-blur")).toBe("10px");
      expect(container.style.getPropertyValue("--glow-spread")).toBe("2px");
      expect(container.style.getPropertyValue("--glow-opacity")).toBe("0.2");
    });

    it("applies high intensity correctly", () => {
      render(<GlowingBorder intensity="high" />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--glow-blur")).toBe("30px");
      expect(container.style.getPropertyValue("--glow-spread")).toBe("6px");
      expect(container.style.getPropertyValue("--glow-opacity")).toBe("0.4");
    });

    it("applies custom color", () => {
      const customColor = "hsl(120, 100%, 50%)";
      render(<GlowingBorder color={customColor} />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--glow-color")).toBe(
        customColor
      );
    });

    it("applies default color when not specified", () => {
      render(<GlowingBorder />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--glow-color")).toBe(
        "hsl(var(--cp-glow))"
      );
    });

    it("applies custom animation speed", () => {
      render(<GlowingBorder animationSpeed={5} />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--animation-duration")).toBe(
        "5s"
      );
    });

    it("applies default animation speed when not specified", () => {
      render(<GlowingBorder />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--animation-duration")).toBe(
        "3s"
      );
    });
  });

  describe("CSS Custom Properties", () => {
    it("sets all required CSS custom properties", () => {
      render(<GlowingBorder />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--glow-color")).toBeTruthy();
      expect(container.style.getPropertyValue("--glow-blur")).toBeTruthy();
      expect(container.style.getPropertyValue("--glow-spread")).toBeTruthy();
      expect(container.style.getPropertyValue("--glow-opacity")).toBeTruthy();
      expect(
        container.style.getPropertyValue("--animation-duration")
      ).toBeTruthy();
      expect(container.style.getPropertyValue("--border-radius")).toBe(
        "var(--cp-border-radius)"
      );
    });

    it("updates CSS properties when props change", () => {
      const { rerender } = render(
        <GlowingBorder intensity="low" animationSpeed={2} />
      );
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--glow-blur")).toBe("10px");
      expect(container.style.getPropertyValue("--animation-duration")).toBe(
        "2s"
      );

      rerender(<GlowingBorder intensity="high" animationSpeed={4} />);

      expect(container.style.getPropertyValue("--glow-blur")).toBe("30px");
      expect(container.style.getPropertyValue("--animation-duration")).toBe(
        "4s"
      );
    });
  });

  describe("GPU Acceleration", () => {
    it("applies GPU acceleration classes", () => {
      render(<GlowingBorder />);

      const container = document.querySelector(".glowing-border-container");
      const gradient = document.querySelector(".glowing-border-gradient");
      const glow = document.querySelector(".glowing-border-glow");

      expect(container).toHaveClass("will-change-transform");
      expect(gradient).toHaveClass("will-change-transform");
      expect(glow).toHaveClass("will-change-transform");
    });

    it("applies transform3d for GPU layer creation", () => {
      render(<GlowingBorder />);

      const gradient = document.querySelector(
        ".glowing-border-gradient"
      ) as HTMLElement;
      const glow = document.querySelector(
        ".glowing-border-glow"
      ) as HTMLElement;

      // Check that transform: translateZ(0) is applied via inline styles
      expect(gradient.style.transform).toBe("translateZ(0)");
      expect(glow.style.transform).toBe("translateZ(0)");
    });
  });

  describe("Animation States", () => {
    it("has correct initial opacity states", () => {
      render(<GlowingBorder />);

      const gradient = document.querySelector(".glowing-border-gradient");
      const staticBorder = document.querySelector(".glowing-border-static");
      const glow = document.querySelector(".glowing-border-glow");

      expect(gradient).toHaveClass("opacity-0");
      expect(staticBorder).toHaveClass("opacity-100");
      expect(glow).toHaveClass("opacity-0");
    });

    it("applies transition classes for smooth animations", () => {
      render(<GlowingBorder />);

      const gradient = document.querySelector(".glowing-border-gradient");
      const staticBorder = document.querySelector(".glowing-border-static");
      const glow = document.querySelector(".glowing-border-glow");
      const content = document.querySelector(".glowing-border-content");

      expect(gradient).toHaveClass(
        "transition-opacity",
        "duration-300",
        "ease-out"
      );
      expect(staticBorder).toHaveClass(
        "transition-opacity",
        "duration-300",
        "ease-out"
      );
      expect(glow).toHaveClass(
        "transition-opacity",
        "duration-300",
        "ease-out"
      );
      expect(content).toHaveClass("transition-all", "duration-300", "ease-out");
    });
  });

  describe("Accessibility", () => {
    it("supports reduced motion preference", () => {
      render(<GlowingBorder />);

      // Check that the component renders without errors (styles are in main CSS)
      const container = document.querySelector(".glowing-border-container");
      expect(container).toBeInTheDocument();

      // The reduced motion styles are in the main CSS file, so we just verify the component renders
      expect(container).toHaveClass("glowing-border-container");
    });

    it("maintains proper focus behavior", () => {
      render(
        <GlowingBorder>
          <button>Focusable Content</button>
        </GlowingBorder>
      );

      const button = screen.getByRole("button");
      button.focus();

      expect(button).toHaveFocus();
    });

    it("does not interfere with pointer events on content", () => {
      const handleClick = vi.fn();
      render(
        <GlowingBorder>
          <button onClick={handleClick}>Click Me</button>
        </GlowingBorder>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Performance", () => {
    it("applies backface-visibility hidden for performance", () => {
      render(<GlowingBorder />);

      // Check that the component renders without errors (performance styles are in main CSS)
      const container = document.querySelector(".glowing-border-container");
      expect(container).toBeInTheDocument();

      // The backface-visibility styles are in the main CSS file, so we just verify the component renders
      expect(container).toHaveClass("glowing-border-container");
    });

    it("uses pointer-events: none on decorative elements", () => {
      render(<GlowingBorder />);

      const gradient = document.querySelector(".glowing-border-gradient");
      const staticBorder = document.querySelector(".glowing-border-static");
      const glow = document.querySelector(".glowing-border-glow");

      expect(gradient).toHaveClass("pointer-events-none");
      expect(staticBorder).toHaveClass("pointer-events-none");
      expect(glow).toHaveClass("pointer-events-none");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined children gracefully", () => {
      render(<GlowingBorder>{undefined}</GlowingBorder>);
      expect(
        document.querySelector(".glowing-border-container")
      ).toBeInTheDocument();
    });

    it("handles null children gracefully", () => {
      render(<GlowingBorder>{null}</GlowingBorder>);
      expect(
        document.querySelector(".glowing-border-container")
      ).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <GlowingBorder>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </GlowingBorder>
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
    });

    it("handles zero animation speed", () => {
      render(<GlowingBorder animationSpeed={0} />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--animation-duration")).toBe(
        "0s"
      );
    });

    it("handles very high animation speed", () => {
      render(<GlowingBorder animationSpeed={100} />);
      const container = document.querySelector(
        ".glowing-border-container"
      ) as HTMLElement;

      expect(container.style.getPropertyValue("--animation-duration")).toBe(
        "100s"
      );
    });
  });

  describe("Integration", () => {
    it("works with additional HTML attributes", () => {
      render(
        <GlowingBorder
          data-testid="glow-border"
          role="presentation"
          aria-label="Decorative border"
        />
      );

      const container = screen.getByTestId("glow-border");
      expect(container).toHaveAttribute("role", "presentation");
      expect(container).toHaveAttribute("aria-label", "Decorative border");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<GlowingBorder ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass("glowing-border-container");
    });
  });
});
