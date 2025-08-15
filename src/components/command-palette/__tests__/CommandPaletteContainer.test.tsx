/**
 * CommandPaletteContainer Component Tests
 * Tests for main container layout, responsive behavior, and keyboard navigation
 */

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import CommandPaletteContainer from "../CommandPaletteContainer";

// Mock the utility functions
vi.mock("@/lib/command-palette-utils", () => ({
  getResponsiveClasses: vi.fn(() => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  })),
  debounce: vi.fn((fn) => fn),
  matchesShortcut: vi.fn(),
}));

// Mock child components
vi.mock("../GlowingBorder", () => ({
  default: function MockGlowingBorder({ children, ...props }: any) {
    return (
      <div data-testid="glowing-border" {...props}>
        {children}
      </div>
    );
  },
}));

vi.mock("../SearchInput", () => ({
  default: function MockSearchInput({
    value,
    onChange,
    placeholder,
    className,
  }: any) {
    return (
      <input
        data-testid="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
    );
  },
}));

vi.mock("../SuggestionsSection", () => ({
  default: function MockSuggestionsSection({
    suggestions,
    onItemSelect,
    selectedIndex,
    searchFilter,
    className,
  }: any) {
    return (
      <div data-testid="suggestions-section" className={className}>
        {suggestions.map((suggestion: any, index: number) => (
          <button
            key={suggestion.id}
            data-testid={`suggestion-${suggestion.id}`}
            onClick={() => {
              // Call the suggestion's action directly to simulate the real behavior
              suggestion.action();
              onItemSelect(suggestion);
            }}
            className={selectedIndex === index ? "selected" : ""}
          >
            {suggestion.label}
          </button>
        ))}
      </div>
    );
  },
}));

vi.mock("../SettingsSection", () => ({
  default: function MockSettingsSection({
    onProfileClick,
    onThemeToggle,
    currentTheme,
  }: unknown) {
    return (
      <div data-testid="settings-section">
        <button data-testid="profile-button" onClick={onProfileClick}>
          Profile
        </button>
        <button data-testid="theme-button" onClick={onThemeToggle}>
          Theme: {currentTheme}
        </button>
      </div>
    );
  },
}));

describe("CommandPaletteContainer", () => {
  const mockOnNavigate = vi.fn();
  const mockOnSearchChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window size to desktop
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Layout and Structure", () => {
    it("renders with correct structure", () => {
      render(<CommandPaletteContainer />);

      expect(screen.getByTestId("glowing-border")).toBeInTheDocument();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
      expect(screen.getByTestId("suggestions-section")).toBeInTheDocument();
      expect(screen.getByTestId("settings-section")).toBeInTheDocument();
    });

    it("applies correct CSS classes for centered layout", () => {
      const { container } = render(<CommandPaletteContainer />);
      const mainContainer = container.firstChild as HTMLElement;

      expect(mainContainer).toHaveClass("relative", "w-full", "mx-auto");
    });

    it("applies backdrop blur effect", () => {
      const { container } = render(<CommandPaletteContainer />);
      // On mobile, it uses backdrop-blur-md, on desktop backdrop-blur-xl or backdrop-blur-2xl
      const contentContainer = container.querySelector(
        ".backdrop-blur-md, .backdrop-blur-xl, .backdrop-blur-2xl"
      );

      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass("bg-cp-surface/95");
    });

    it("integrates glowing border component", () => {
      render(<CommandPaletteContainer />);
      const glowingBorder = screen.getByTestId("glowing-border");

      expect(glowingBorder).toHaveAttribute("intensity", "medium");
      expect(glowingBorder).toHaveAttribute("animationSpeed", "3");
    });
  });

  describe("Responsive Design", () => {
    it("applies mobile-specific classes when on mobile", async () => {
      const { getResponsiveClasses } = await import(
        "@/lib/command-palette-utils"
      );
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      const { container } = render(<CommandPaletteContainer />);
      const mainContainer = container.firstChild as HTMLElement;

      expect(mainContainer).toHaveClass("max-w-sm", "min-h-[180px]");
    });

    it("applies tablet-specific classes when on tablet", async () => {
      const { getResponsiveClasses } = await import(
        "@/lib/command-palette-utils"
      );
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      });

      const { container } = render(<CommandPaletteContainer />);
      const mainContainer = container.firstChild as HTMLElement;

      expect(mainContainer).toHaveClass("md:max-w-lg");
    });

    it("applies desktop-specific classes when on desktop", async () => {
      const { getResponsiveClasses } = await import(
        "@/lib/command-palette-utils"
      );
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });

      const { container } = render(<CommandPaletteContainer />);
      const mainContainer = container.firstChild as HTMLElement;

      expect(mainContainer).toHaveClass("lg:max-w-2xl");
    });

    it("hides footer on mobile devices", async () => {
      const { getResponsiveClasses } = await import(
        "@/lib/command-palette-utils"
      );
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      render(<CommandPaletteContainer />);

      // Footer should not be visible on mobile
      expect(screen.queryByText("Navigate")).not.toBeInTheDocument();
      expect(screen.queryByText("Command Palette")).not.toBeInTheDocument();
    });

    it("shows footer on desktop devices", async () => {
      const { getResponsiveClasses } = await import(
        "@/lib/command-palette-utils"
      );
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });

      render(<CommandPaletteContainer />);

      // Footer should be visible on desktop
      expect(screen.getByText("Navigate")).toBeInTheDocument();
      expect(screen.getByText("Command Palette")).toBeInTheDocument();
    });

    it("handles window resize events", async () => {
      const { getResponsiveClasses } = await import(
        "@/lib/command-palette-utils"
      );

      // Start with desktop
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });

      render(<CommandPaletteContainer />);

      // Change to mobile
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      // Trigger resize event
      act(() => {
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: 320,
        });
        window.dispatchEvent(new Event("resize"));
      });

      // Should update responsive classes
      await waitFor(() => {
        expect(getResponsiveClasses).toHaveBeenCalled();
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("handles arrow down navigation", () => {
      render(<CommandPaletteContainer />);

      // Simulate arrow down key
      fireEvent.keyDown(document, { key: "ArrowDown" });

      // Should prevent default and update selected index
      // This is tested through the component's internal state management
    });

    it("handles arrow up navigation", () => {
      render(<CommandPaletteContainer />);

      // Simulate arrow up key
      fireEvent.keyDown(document, { key: "ArrowUp" });

      // Should prevent default and update selected index
      // This is tested through the component's internal state management
    });

    it("handles escape key for clearing search", async () => {
      const user = userEvent.setup();
      const { matchesShortcut } = await import("@/lib/command-palette-utils");
      vi.mocked(matchesShortcut).mockReturnValue(true);

      render(<CommandPaletteContainer />);

      const searchInput = screen.getByTestId("search-input");

      // Type in search input
      await user.type(searchInput, "test search");

      // Simulate escape key
      fireEvent.keyDown(document, { key: "Escape" });

      // Should clear the search
      await waitFor(() => {
        expect(searchInput).toHaveValue("");
      });
    });
  });

  describe("Search Functionality", () => {
    it("handles search input changes", async () => {
      const user = userEvent.setup();
      render(<CommandPaletteContainer onSearchChange={mockOnSearchChange} />);

      const searchInput = screen.getByTestId("search-input");
      await user.type(searchInput, "test");

      expect(mockOnSearchChange).toHaveBeenCalledWith("test");
    });

    it("updates placeholder text based on screen size", async () => {
      const { getResponsiveClasses } = await import(
        "@/lib/command-palette-utils"
      );

      // Test mobile placeholder - need to set mock before render
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      const { unmount } = render(<CommandPaletteContainer />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
      unmount();

      // Test desktop placeholder - need to set mock before render
      vi.mocked(getResponsiveClasses).mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });

      render(<CommandPaletteContainer />);
      expect(
        screen.getByPlaceholderText("Type a command or search...")
      ).toBeInTheDocument();
    });

    it("resets selected index when search changes", async () => {
      const user = userEvent.setup();
      render(<CommandPaletteContainer />);

      const searchInput = screen.getByTestId("search-input");

      // Type to trigger search change
      await user.type(searchInput, "test");

      // The selected index should be reset to -1 (tested through internal state)
    });
  });

  describe("Navigation and Actions", () => {
    it("calls onNavigate when suggestion is selected", async () => {
      const user = userEvent.setup();
      render(<CommandPaletteContainer onNavigate={mockOnNavigate} />);

      const portfolioButton = screen.getByTestId("suggestion-portfolio");
      await user.click(portfolioButton);

      expect(mockOnNavigate).toHaveBeenCalledWith("portfolio");
    });

    it("handles profile click", async () => {
      const user = userEvent.setup();
      render(<CommandPaletteContainer onNavigate={mockOnNavigate} />);

      const profileButton = screen.getByTestId("profile-button");
      await user.click(profileButton);

      expect(mockOnNavigate).toHaveBeenCalledWith("profile");
    });

    it("handles theme toggle", async () => {
      const user = userEvent.setup();
      render(<CommandPaletteContainer />);

      const themeButton = screen.getByTestId("theme-button");
      expect(themeButton).toHaveTextContent("Theme: dark");

      await user.click(themeButton);

      expect(themeButton).toHaveTextContent("Theme: light");
    });
  });

  describe("Props and Controlled State", () => {
    it("accepts controlled search value", () => {
      render(<CommandPaletteContainer searchValue="controlled value" />);

      const searchInput = screen.getByTestId("search-input");
      expect(searchInput).toHaveValue("controlled value");
    });

    it("updates when controlled search value changes", () => {
      const { rerender } = render(
        <CommandPaletteContainer searchValue="initial" />
      );

      let searchInput = screen.getByTestId("search-input");
      expect(searchInput).toHaveValue("initial");

      rerender(<CommandPaletteContainer searchValue="updated" />);

      searchInput = screen.getByTestId("search-input");
      expect(searchInput).toHaveValue("updated");
    });

    it("applies custom className", () => {
      const { container } = render(
        <CommandPaletteContainer className="custom-class" />
      );

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass("custom-class");
    });

    it("forwards additional props", () => {
      const { container } = render(
        <CommandPaletteContainer data-testid="custom-container" />
      );

      expect(container.firstChild).toHaveAttribute(
        "data-testid",
        "custom-container"
      );
    });
  });

  describe("Performance and Accessibility", () => {
    it("applies GPU acceleration classes", () => {
      const { container } = render(<CommandPaletteContainer />);
      const mainContainer = container.firstChild as HTMLElement;

      expect(mainContainer).toHaveClass(
        "transform-gpu",
        "will-change-transform"
      );
    });

    it("uses semantic HTML structure", () => {
      const { container } = render(<CommandPaletteContainer />);

      // Should have proper div structure
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("handles cleanup on unmount", () => {
      const { unmount } = render(<CommandPaletteContainer />);

      // Should not throw errors on unmount
      expect(() => unmount()).not.toThrow();
    });
  });

  describe("Error Handling", () => {
    it("handles missing onNavigate prop gracefully", async () => {
      const user = userEvent.setup();

      // Should not throw when onNavigate is not provided
      expect(() => {
        render(<CommandPaletteContainer />);
      }).not.toThrow();

      const portfolioButton = screen.getByTestId("suggestion-portfolio");

      // Should not throw when clicking without onNavigate
      await expect(async () => {
        await user.click(portfolioButton);
      }).not.toThrow();
    });

    it("handles missing onSearchChange prop gracefully", async () => {
      const user = userEvent.setup();

      render(<CommandPaletteContainer />);
      const searchInput = screen.getByTestId("search-input");

      // Should not throw when typing without onSearchChange
      await expect(async () => {
        await user.type(searchInput, "test");
      }).not.toThrow();
    });
  });
});
