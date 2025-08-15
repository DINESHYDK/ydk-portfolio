/**
 * SearchInput Component Tests
 * Unit tests for SearchInput component interactions and keyboard events
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "../SearchInput";
import { matchesShortcut } from "@/lib/command-palette-utils";

// Mock the utils and constants
vi.mock("@/lib/utils", () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
}));

vi.mock("@/lib/command-palette-utils", () => ({
  matchesShortcut: vi.fn(),
}));

vi.mock("@/lib/command-palette-constants", () => ({
  KEYBOARD_SHORTCUTS: {
    OPEN_PALETTE: ["cmd+k", "ctrl+k"],
  },
}));

describe("SearchInput", () => {
  const mockOnChange = vi.fn();
  const mockOnKeyDown = vi.fn();

  const defaultProps = {
    value: "",
    onChange: mockOnChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("renders with default placeholder text", () => {
      render(<SearchInput {...defaultProps} />);

      expect(
        screen.getByPlaceholderText("Type a command or search...")
      ).toBeInTheDocument();
    });

    it("renders with custom placeholder text", () => {
      const customPlaceholder = "Custom search placeholder";
      render(<SearchInput {...defaultProps} placeholder={customPlaceholder} />);

      expect(
        screen.getByPlaceholderText(customPlaceholder)
      ).toBeInTheDocument();
    });

    it("renders search icon", () => {
      render(<SearchInput {...defaultProps} />);

      // Check for the search icon by looking for the SVG element with the search icon class
      const searchIcon = document.querySelector("svg");
      expect(searchIcon).toBeInTheDocument();
    });

    it("renders keyboard shortcut hint when value is empty", () => {
      render(<SearchInput {...defaultProps} />);

      expect(screen.getByText("⌘")).toBeInTheDocument();
      expect(screen.getByText("K")).toBeInTheDocument();
    });

    it("hides keyboard shortcut hint when value is not empty", () => {
      render(<SearchInput {...defaultProps} value="test" />);

      expect(screen.queryByText("⌘")).not.toBeInTheDocument();
      expect(screen.queryByText("K")).not.toBeInTheDocument();
    });

    it("applies custom className", () => {
      const customClass = "custom-search-class";
      render(<SearchInput {...defaultProps} className={customClass} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(customClass);
    });
  });

  describe("Input Interactions", () => {
    it("calls onChange when user types", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test query");

      // Check that onChange was called for each character typed
      expect(mockOnChange).toHaveBeenCalledTimes(10);
      expect(mockOnChange).toHaveBeenLastCalledWith("y");
    });

    it("displays the current value", () => {
      const testValue = "current search value";
      render(<SearchInput {...defaultProps} value={testValue} />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input.value).toBe(testValue);
    });

    it("focuses input on mount", async () => {
      render(<SearchInput {...defaultProps} />);

      await waitFor(
        () => {
          const input = screen.getByRole("textbox");
          expect(input).toHaveFocus();
        },
        { timeout: 200 }
      );
    });

    it("blurs input when Escape key is pressed", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");
      input.focus();

      await user.keyboard("{Escape}");

      expect(input).not.toHaveFocus();
    });
  });

  describe("Keyboard Events", () => {
    it("calls onKeyDown callback when provided", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} onKeyDown={mockOnKeyDown} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "a");

      expect(mockOnKeyDown).toHaveBeenCalled();
    });

    it("handles Enter key press", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} onKeyDown={mockOnKeyDown} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "{Enter}");

      expect(mockOnKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "Enter",
        })
      );
    });

    it("handles arrow key navigation", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} onKeyDown={mockOnKeyDown} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "{ArrowDown}");

      expect(mockOnKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "ArrowDown",
        })
      );
    });
  });

  describe("Global Keyboard Shortcuts", () => {
    beforeEach(() => {
      // Mock the matchesShortcut function
      vi.mocked(matchesShortcut).mockImplementation(
        (event: KeyboardEvent, shortcut: string) => {
          if (shortcut === "cmd+k") {
            return event.metaKey && event.key.toLowerCase() === "k";
          }
          if (shortcut === "ctrl+k") {
            return event.ctrlKey && event.key.toLowerCase() === "k";
          }
          return false;
        }
      );
    });

    it("focuses input when Cmd+K is pressed", async () => {
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");
      input.blur(); // Ensure input is not focused initially

      // Simulate Cmd+K
      fireEvent.keyDown(document, {
        key: "k",
        metaKey: true,
      });

      await waitFor(() => {
        expect(input).toHaveFocus();
      });
    });

    it("focuses input when Ctrl+K is pressed", async () => {
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");
      input.blur(); // Ensure input is not focused initially

      // Simulate Ctrl+K
      fireEvent.keyDown(document, {
        key: "k",
        ctrlKey: true,
      });

      await waitFor(() => {
        expect(input).toHaveFocus();
      });
    });

    it("prevents default behavior when keyboard shortcut is triggered", () => {
      render(<SearchInput {...defaultProps} />);

      const event = new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      fireEvent(document, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has proper input attributes", () => {
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");

      expect(input).toHaveAttribute("autoComplete", "off");
      expect(input).toHaveAttribute("autoCorrect", "off");
      expect(input).toHaveAttribute("autoCapitalize", "off");
      expect(input).toHaveAttribute("spellCheck", "false");
    });

    it("has proper ARIA attributes", () => {
      render(<SearchInput {...defaultProps} />);

      const searchIcon = document.querySelector('[aria-hidden="true"]');
      expect(searchIcon).toBeInTheDocument();
    });

    it("supports ref forwarding", () => {
      const ref = vi.fn();
      render(<SearchInput {...defaultProps} ref={ref} />);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });
  });

  describe("Focus States", () => {
    it("shows focus indicator when input is focused", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");
      await user.click(input);

      // Check if focus indicator is visible (scale-x-100 class should be applied)
      const focusIndicator = document.querySelector(
        ".focus-within\\:scale-x-100"
      );
      expect(focusIndicator).toBeInTheDocument();
    });

    it("changes placeholder opacity on focus", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");

      // Check that focus styles are applied
      expect(input).toHaveClass("focus:placeholder:text-cp-text-secondary/70");
    });
  });

  describe("Event Cleanup", () => {
    it("removes global event listeners on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { unmount } = render(<SearchInput {...defaultProps} />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );
    });

    it("clears timeout on unmount", () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      const { unmount } = render(<SearchInput {...defaultProps} />);
      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });

  describe("Real-time Search Filtering", () => {
    it("triggers onChange immediately on input", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");

      await user.type(input, "a");
      expect(mockOnChange).toHaveBeenCalledWith("a");

      // Clear the input and type again to test individual character handling
      await user.clear(input);
      await user.type(input, "b");
      expect(mockOnChange).toHaveBeenCalledWith("b");
    });

    it("handles rapid typing correctly", async () => {
      const user = userEvent.setup();
      render(<SearchInput {...defaultProps} />);

      const input = screen.getByRole("textbox");

      // Type quickly
      await user.type(input, "quick", { delay: 1 });

      // Should have called onChange for each character
      expect(mockOnChange).toHaveBeenCalledTimes(5); // 'q', 'qu', 'qui', 'quic', 'quick'
    });
  });
});
