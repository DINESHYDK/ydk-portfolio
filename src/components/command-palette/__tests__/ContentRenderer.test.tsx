/**
 * ContentRenderer Component Tests
 * Tests for dynamic content display with smooth transitions and navigation states
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ContentRenderer from "../ContentRenderer";
import { ContentRendererProps } from "@/types/command-palette";

// Mock the utils
vi.mock("@/lib/utils", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ArrowLeft: ({
    className,
    ...props
  }: {
    className?: string;
    [key: string]: unknown;
  }) => <div data-testid="arrow-left-icon" className={className} {...props} />,
  Loader2: ({
    className,
    ...props
  }: {
    className?: string;
    [key: string]: unknown;
  }) => <div data-testid="loader-icon" className={className} {...props} />,
}));

// Mock constants
vi.mock("@/lib/command-palette-constants", () => ({
  ANIMATION_DURATIONS: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
}));

describe("ContentRenderer", () => {
  const defaultProps: ContentRendererProps = {
    activeSection: "portfolio",
    data: null,
    onBack: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<ContentRenderer {...defaultProps} />);
      // Check for the header text which is lowercase due to capitalize CSS class
      expect(screen.getByText("portfolio")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <ContentRenderer {...defaultProps} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("renders back button when onBack is provided", () => {
      render(<ContentRenderer {...defaultProps} />);
      expect(screen.getByLabelText("Go back")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
    });

    it("does not render back button when onBack is not provided", () => {
      render(<ContentRenderer {...defaultProps} onBack={undefined} />);
      expect(screen.queryByLabelText("Go back")).not.toBeInTheDocument();
    });

    it("displays the active section name in header", () => {
      render(<ContentRenderer {...defaultProps} activeSection="projects" />);
      // Header text is lowercase due to capitalize CSS class
      expect(screen.getByText("projects")).toBeInTheDocument();
    });

    it("displays default content text when activeSection is not provided", () => {
      render(<ContentRenderer {...defaultProps} activeSection="" />);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Loading States", () => {
    it("shows loading state initially when activeSection changes", () => {
      render(<ContentRenderer {...defaultProps} />);

      // Should show loading initially
      expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("calls onBack when back button is clicked", () => {
      const onBackMock = vi.fn();
      render(<ContentRenderer {...defaultProps} onBack={onBackMock} />);

      const backButton = screen.getByLabelText("Go back");
      fireEvent.click(backButton);

      expect(onBackMock).toHaveBeenCalledTimes(1);
    });

    it("back button has correct accessibility attributes", () => {
      render(<ContentRenderer {...defaultProps} />);

      const backButton = screen.getByLabelText("Go back");
      expect(backButton).toHaveAttribute("aria-label", "Go back");
    });
  });

  describe("Accessibility", () => {
    it("back button is focusable", () => {
      render(<ContentRenderer {...defaultProps} />);

      const backButton = screen.getByLabelText("Go back");
      expect(backButton).toBeInTheDocument();

      // Test focus
      backButton.focus();
      expect(document.activeElement).toBe(backButton);
    });
  });

  describe("Error Handling", () => {
    it("handles missing data gracefully", () => {
      render(<ContentRenderer {...defaultProps} data={undefined} />);
      // Should still render the header
      expect(screen.getByText("portfolio")).toBeInTheDocument();
    });

    it("handles empty activeSection gracefully", () => {
      render(<ContentRenderer {...defaultProps} activeSection="" />);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("has proper container structure", () => {
      const { container } = render(<ContentRenderer {...defaultProps} />);

      // Check for main container classes
      expect(container.firstChild).toHaveClass("relative");
      expect(container.firstChild).toHaveClass("w-full");
      expect(container.firstChild).toHaveClass("h-full");
    });

    it("has header and content sections", () => {
      render(<ContentRenderer {...defaultProps} />);

      // Check for header section
      expect(screen.getByText("portfolio")).toBeInTheDocument();

      // Check for loading content (initial state)
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("handles different activeSection values", () => {
      const sections = ["portfolio", "projects", "contact", "resume"];

      sections.forEach((section) => {
        const { unmount } = render(
          <ContentRenderer {...defaultProps} activeSection={section} />
        );
        expect(screen.getByText(section)).toBeInTheDocument();
        unmount();
      });
    });

    it("handles custom data prop", () => {
      const customData = { test: "data" };
      render(<ContentRenderer {...defaultProps} data={customData} />);

      // Should still render normally with custom data
      expect(screen.getByText("portfolio")).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive classes correctly", () => {
      const { container } = render(<ContentRenderer {...defaultProps} />);

      // Check for responsive classes in the component structure
      expect(container.querySelector(".overflow-y-auto")).toBeInTheDocument();
      expect(container.querySelector(".flex-1")).toBeInTheDocument();
    });
  });
});
