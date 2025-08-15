/**
 * SuggestionsSection Component Tests
 * Unit tests for suggestion rendering, filtering, and keyboard navigation
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Home, Settings, User } from "lucide-react";
import SuggestionsSection from "../SuggestionsSection";
import { SuggestionItem } from "@/types/command-palette";

describe("SuggestionsSection", () => {
  const mockOnItemSelect = vi.fn();

  // Mock scrollIntoView for JSDOM
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  const mockSuggestions: SuggestionItem[] = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      category: "suggestions",
      action: vi.fn(),
      shortcut: "cmd+h",
    },
    {
      id: "about",
      label: "About",
      icon: User,
      category: "suggestions",
      action: vi.fn(),
      shortcut: "cmd+a",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      category: "settings",
      action: vi.fn(),
      shortcut: "cmd+s",
    },
  ];

  const defaultProps = {
    suggestions: mockSuggestions,
    onItemSelect: mockOnItemSelect,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all suggestions", () => {
    render(<SuggestionsSection {...defaultProps} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /settings/i })
    ).toBeInTheDocument();
  });

  it("groups suggestions by category", () => {
    render(<SuggestionsSection {...defaultProps} />);

    expect(screen.getByText("Suggestions")).toBeInTheDocument();
    // Check for the category header, not the button
    const categoryHeaders = screen.getAllByText("Settings");
    expect(categoryHeaders.length).toBeGreaterThan(0);
  });

  it("filters suggestions based on search query", () => {
    render(<SuggestionsSection {...defaultProps} searchFilter="home" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("filters suggestions by shortcut", () => {
    render(<SuggestionsSection {...defaultProps} searchFilter="cmd+a" />);

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("shows empty state when no results found", () => {
    render(<SuggestionsSection {...defaultProps} searchFilter="nonexistent" />);

    expect(screen.getByText(/No results found for/)).toBeInTheDocument();
    expect(screen.getByText('"nonexistent"')).toBeInTheDocument();
    expect(screen.getByText("Try a different search term")).toBeInTheDocument();
  });

  it("shows empty state when no suggestions provided", () => {
    render(
      <SuggestionsSection suggestions={[]} onItemSelect={mockOnItemSelect} />
    );

    expect(screen.getByText("No suggestions available")).toBeInTheDocument();
  });

  it("highlights selected item", () => {
    render(<SuggestionsSection {...defaultProps} selectedIndex={0} />);

    const homeButton = screen.getByRole("option", { name: /home/i });
    expect(homeButton).toHaveAttribute("aria-selected", "true");
  });

  it("calls onItemSelect when item is clicked", () => {
    render(<SuggestionsSection {...defaultProps} />);

    fireEvent.click(screen.getByText("Home"));
    expect(mockOnItemSelect).toHaveBeenCalledWith(mockSuggestions[0]);
  });

  it("handles keyboard navigation - ArrowDown", () => {
    render(<SuggestionsSection {...defaultProps} selectedIndex={0} />);

    fireEvent.keyDown(document, { key: "ArrowDown" });
    // Note: In a real implementation, this would update selectedIndex in parent
    // Here we just test that the event is handled without errors
  });

  it("handles keyboard navigation - ArrowUp", () => {
    render(<SuggestionsSection {...defaultProps} selectedIndex={1} />);

    fireEvent.keyDown(document, { key: "ArrowUp" });
    // Note: In a real implementation, this would update selectedIndex in parent
    // Here we just test that the event is handled without errors
  });

  it("handles keyboard navigation - Enter", () => {
    render(<SuggestionsSection {...defaultProps} selectedIndex={0} />);

    fireEvent.keyDown(document, { key: "Enter" });
    expect(mockOnItemSelect).toHaveBeenCalledWith(mockSuggestions[0]);
  });

  it("handles keyboard navigation - Escape", () => {
    render(<SuggestionsSection {...defaultProps} selectedIndex={0} />);

    // Should not throw error when Escape is pressed
    fireEvent.keyDown(document, { key: "Escape" });
  });

  it("ignores keyboard events when no suggestions", () => {
    render(
      <SuggestionsSection suggestions={[]} onItemSelect={mockOnItemSelect} />
    );

    fireEvent.keyDown(document, { key: "ArrowDown" });
    fireEvent.keyDown(document, { key: "Enter" });

    expect(mockOnItemSelect).not.toHaveBeenCalled();
  });

  it("shows scroll indicator for many items", () => {
    const manySuggestions = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i}`,
      label: `Item ${i}`,
      icon: Home,
      category: "suggestions" as const,
      action: vi.fn(),
    }));

    render(
      <SuggestionsSection
        suggestions={manySuggestions}
        onItemSelect={mockOnItemSelect}
      />
    );

    expect(screen.getByText(/Use ↑↓ to navigate/)).toBeInTheDocument();
  });

  it("does not show scroll indicator for few items", () => {
    render(<SuggestionsSection {...defaultProps} />);

    expect(screen.queryByText(/Use ↑↓ to navigate/)).not.toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<SuggestionsSection {...defaultProps} />);

    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveAttribute("aria-label", "Navigation suggestions");
  });

  it("applies custom className", () => {
    render(<SuggestionsSection {...defaultProps} className="custom-class" />);

    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveClass("custom-class");
  });

  it("supports forwarded ref", () => {
    const ref = vi.fn();
    render(<SuggestionsSection {...defaultProps} ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });

  it("handles case-insensitive filtering", () => {
    render(<SuggestionsSection {...defaultProps} searchFilter="HOME" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
  });

  it("handles whitespace in search filter", () => {
    render(<SuggestionsSection {...defaultProps} searchFilter="  home  " />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
  });

  it("maintains category order", () => {
    render(<SuggestionsSection {...defaultProps} />);

    const categories = screen.getAllByText(/^(Suggestions|Settings)$/);
    expect(categories[0]).toHaveTextContent("Suggestions");
    expect(categories[1]).toHaveTextContent("Settings");
  });
});
