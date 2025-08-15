/**
 * SettingsSection Component Tests
 * Unit tests for settings components and user interactions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsSection from "../SettingsSection";

// Mock the utils and constants
vi.mock("@/lib/utils", () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
}));

vi.mock("@/lib/command-palette-utils", () => ({
  getShortcutDisplay: (shortcut: string) =>
    shortcut.replace(/\+/g, " + ").toUpperCase(),
}));

describe("SettingsSection", () => {
  const mockOnProfileClick = vi.fn();
  const mockOnThemeToggle = vi.fn();
  const mockOnKeyboardShortcuts = vi.fn();
  const mockOnPreferences = vi.fn();

  const defaultProps = {
    onProfileClick: mockOnProfileClick,
    onThemeToggle: mockOnThemeToggle,
    onKeyboardShortcuts: mockOnKeyboardShortcuts,
    onPreferences: mockOnPreferences,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("renders profile section with default user information", () => {
      render(<SettingsSection {...defaultProps} />);

      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Y. Dinesh Krishna")).toBeInTheDocument();
      expect(screen.getByText("AI & Software Development")).toBeInTheDocument();
      expect(screen.getByText("Available for work")).toBeInTheDocument();
    });

    it("renders settings section with all setting items", () => {
      render(<SettingsSection {...defaultProps} />);

      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Switch to Light")).toBeInTheDocument();
      expect(screen.getByText("Keyboard Shortcuts")).toBeInTheDocument();
      expect(screen.getByText("Preferences")).toBeInTheDocument();
    });

    it("displays profile avatar image", () => {
      render(<SettingsSection {...defaultProps} />);

      const avatar = screen.getByAltText("Y. Dinesh Krishna avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", "/DineshProfile.png");
    });

    it("shows keyboard shortcuts for setting items", () => {
      render(<SettingsSection {...defaultProps} />);

      expect(screen.getByText("CMD + SHIFT + T")).toBeInTheDocument();
      expect(screen.getByText("CMD + /")).toBeInTheDocument();
      expect(screen.getByText("CMD + ,")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const customClass = "custom-settings-class";
      render(<SettingsSection {...defaultProps} className={customClass} />);

      const container = document.querySelector(`.${customClass}`);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Theme Handling", () => {
    it("displays correct theme icon and label for dark theme", () => {
      render(<SettingsSection {...defaultProps} currentTheme="dark" />);

      expect(screen.getByText("Switch to Light")).toBeInTheDocument();
      expect(
        screen.getByText("Currently using dark theme")
      ).toBeInTheDocument();
    });

    it("displays correct theme icon and label for light theme", () => {
      render(<SettingsSection {...defaultProps} currentTheme="light" />);

      expect(screen.getByText("Switch to Dark")).toBeInTheDocument();
      expect(
        screen.getByText("Currently using light theme")
      ).toBeInTheDocument();
    });

    it("displays correct theme icon and label for system theme", () => {
      render(<SettingsSection {...defaultProps} currentTheme="system" />);

      expect(screen.getByText("Theme Settings")).toBeInTheDocument();
      expect(
        screen.getByText("Currently using system theme")
      ).toBeInTheDocument();
    });

    it("shows active state for non-system themes", () => {
      render(<SettingsSection {...defaultProps} currentTheme="dark" />);

      const themeButton = screen.getByRole("button", {
        name: /switch to light/i,
      });
      // Check that the button contains the active state classes (they may be combined with other classes)
      expect(themeButton.className).toContain("bg-cp-success/10");
    });
  });

  describe("User Interactions", () => {
    it("calls onProfileClick when profile item is clicked", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const profileButton = screen.getByRole("button", {
        name: /y\. dinesh krishna avatar/i,
      });
      await user.click(profileButton);

      expect(mockOnProfileClick).toHaveBeenCalledTimes(1);
    });

    it("calls onThemeToggle when theme setting is clicked", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const themeButton = screen.getByRole("button", {
        name: /switch to light/i,
      });
      await user.click(themeButton);

      expect(mockOnThemeToggle).toHaveBeenCalledTimes(1);
    });

    it("calls onKeyboardShortcuts when keyboard shortcuts setting is clicked", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const keyboardButton = screen.getByRole("button", {
        name: /keyboard shortcuts/i,
      });
      await user.click(keyboardButton);

      expect(mockOnKeyboardShortcuts).toHaveBeenCalledTimes(1);
    });

    it("calls onPreferences when preferences setting is clicked", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const preferencesButton = screen.getByRole("button", {
        name: /preferences/i,
      });
      await user.click(preferencesButton);

      expect(mockOnPreferences).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Navigation", () => {
    it("supports keyboard navigation with Tab key", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const profileButton = screen.getByRole("button", {
        name: /y\. dinesh krishna avatar/i,
      });
      const themeButton = screen.getByRole("button", {
        name: /switch to light/i,
      });

      await user.tab();
      expect(profileButton).toHaveFocus();

      await user.tab();
      expect(themeButton).toHaveFocus();
    });

    it("supports keyboard activation with Enter key", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const profileButton = screen.getByRole("button", {
        name: /y\. dinesh krishna avatar/i,
      });
      profileButton.focus();

      await user.keyboard("{Enter}");
      expect(mockOnProfileClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard activation with Space key", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const themeButton = screen.getByRole("button", {
        name: /switch to light/i,
      });
      themeButton.focus();

      await user.keyboard(" ");
      expect(mockOnThemeToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe("ProfileItem Component", () => {
    it("handles image loading errors gracefully", () => {
      render(<SettingsSection {...defaultProps} />);

      const avatar = screen.getByAltText("Y. Dinesh Krishna avatar");

      // Simulate image error
      fireEvent.error(avatar);

      // Image should be hidden on error
      expect(avatar).toHaveStyle("display: none");
    });

    it("shows online status indicator", () => {
      render(<SettingsSection {...defaultProps} />);

      const statusIndicator = document.querySelector(".animate-pulse");
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator).toHaveClass("bg-cp-success");
    });

    it("truncates long text content", () => {
      render(<SettingsSection {...defaultProps} />);

      const nameElement = screen.getByText("Y. Dinesh Krishna");
      const titleElement = screen.getByText("AI & Software Development");
      const statusElement = screen.getByText("Available for work");

      expect(nameElement).toHaveClass("truncate");
      expect(titleElement).toHaveClass("truncate");
      expect(statusElement).toHaveClass("truncate");
    });
  });

  describe("SettingItem Component", () => {
    it("displays setting descriptions", () => {
      render(<SettingsSection {...defaultProps} />);

      expect(
        screen.getByText("Currently using dark theme")
      ).toBeInTheDocument();
      expect(
        screen.getByText("View and customize shortcuts")
      ).toBeInTheDocument();
      expect(screen.getByText("Customize your experience")).toBeInTheDocument();
    });

    it("shows hover effects on setting items", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const themeButton = screen.getByRole("button", {
        name: /switch to light/i,
      });

      await user.hover(themeButton);
      expect(themeButton).toHaveClass("hover:bg-cp-hover");
    });

    it("displays keyboard shortcuts in proper format", () => {
      render(<SettingsSection {...defaultProps} />);

      // Check for kbd elements containing shortcuts
      const shortcuts = document.querySelectorAll("kbd");
      expect(shortcuts.length).toBe(3); // Theme, Keyboard, Preferences
      expect(shortcuts[0]).toHaveTextContent("CMD + SHIFT + T");
      expect(shortcuts[1]).toHaveTextContent("CMD + /");
      expect(shortcuts[2]).toHaveTextContent("CMD + ,");
    });
  });

  describe("Accessibility", () => {
    it("has proper button roles for all interactive elements", () => {
      render(<SettingsSection {...defaultProps} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(4); // Profile + 3 settings
    });

    it("has proper heading structure", () => {
      render(<SettingsSection {...defaultProps} />);

      const profileHeading = screen.getByRole("heading", { name: "Profile" });
      const settingsHeading = screen.getByRole("heading", { name: "Settings" });

      expect(profileHeading).toBeInTheDocument();
      expect(settingsHeading).toBeInTheDocument();
    });

    it("provides proper alt text for avatar image", () => {
      render(<SettingsSection {...defaultProps} />);

      const avatar = screen.getByAltText("Y. Dinesh Krishna avatar");
      expect(avatar).toBeInTheDocument();
    });

    it("has proper focus indicators", async () => {
      const user = userEvent.setup();
      render(<SettingsSection {...defaultProps} />);

      const profileButton = screen.getByRole("button", {
        name: /y\. dinesh krishna avatar/i,
      });

      await user.tab();
      expect(profileButton).toHaveFocus();
      expect(profileButton).toHaveClass("focus:ring-2");
    });
  });

  describe("Visual States", () => {
    it("shows active state for theme setting when not system", () => {
      render(<SettingsSection {...defaultProps} currentTheme="dark" />);

      const themeButton = screen.getByRole("button", {
        name: /switch to light/i,
      });
      expect(themeButton.className).toContain("bg-cp-success/10");
      expect(themeButton.className).toContain("text-cp-success");
    });

    it("does not show active state for system theme", () => {
      render(<SettingsSection {...defaultProps} currentTheme="system" />);

      const themeButton = screen.getByRole("button", {
        name: /theme settings/i,
      });
      expect(themeButton).not.toHaveClass("bg-cp-success/10");
    });

    it("applies proper spacing between sections", () => {
      render(<SettingsSection {...defaultProps} />);

      const container = document.querySelector(".space-y-1");
      expect(container).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles missing callback functions gracefully", () => {
      render(<SettingsSection />);

      const profileButton = screen.getByRole("button", {
        name: /y\. dinesh krishna avatar/i,
      });

      // Should not throw error when clicked without callback
      expect(() => {
        fireEvent.click(profileButton);
      }).not.toThrow();
    });

    it("handles undefined theme gracefully", () => {
      render(
        <SettingsSection
          {...defaultProps}
          currentTheme={undefined as unknown}
        />
      );

      // Should default to dark theme behavior when undefined
      expect(screen.getByText("Switch to Light")).toBeInTheDocument();
    });
  });

  describe("Integration with User Preferences", () => {
    it("reflects current theme in UI", () => {
      const { rerender } = render(
        <SettingsSection {...defaultProps} currentTheme="light" />
      );

      expect(screen.getByText("Switch to Dark")).toBeInTheDocument();

      rerender(<SettingsSection {...defaultProps} currentTheme="dark" />);
      expect(screen.getByText("Switch to Light")).toBeInTheDocument();
    });

    it("shows appropriate theme descriptions", () => {
      render(<SettingsSection {...defaultProps} currentTheme="dark" />);

      expect(
        screen.getByText("Currently using dark theme")
      ).toBeInTheDocument();
    });
  });
});
