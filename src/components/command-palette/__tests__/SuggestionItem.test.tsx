/**
 * SuggestionItem Component Tests
 * Unit tests for suggestion rendering and interactions
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "lucide-react";
import SuggestionItem from "../SuggestionItem";

describe("SuggestionItem", () => {
  const mockOnClick = vi.fn();
  const mockOnMouseEnter = vi.fn();

  const defaultProps = {
    id: "test-item",
    label: "Test Item",
    icon: Home,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with basic props", () => {
    render(<SuggestionItem {...defaultProps} />);

    expect(screen.getByRole("option")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("displays icon correctly", () => {
    render(<SuggestionItem {...defaultProps} />);

    // Check if the icon container is present
    const iconContainer = screen.getByRole("option").querySelector("div");
    expect(iconContainer).toBeInTheDocument();
  });

  it("shows description when provided", () => {
    render(
      <SuggestionItem
        {...defaultProps}
        description="This is a test description"
      />
    );

    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("displays keyboard shortcut when provided", () => {
    render(<SuggestionItem {...defaultProps} shortcut="cmd+t" />);

    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("handles complex keyboard shortcuts", () => {
    render(<SuggestionItem {...defaultProps} shortcut="cmd+shift+p" />);

    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("Shift")).toBeInTheDocument();
    expect(screen.getByText("P")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<SuggestionItem {...defaultProps} />);

    fireEvent.click(screen.getByRole("option"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("calls onMouseEnter when mouse enters", () => {
    render(
      <SuggestionItem {...defaultProps} onMouseEnter={mockOnMouseEnter} />
    );

    fireEvent.mouseEnter(screen.getByRole("option"));
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
  });

  it("applies selected styles when isSelected is true", () => {
    render(<SuggestionItem {...defaultProps} isSelected={true} />);

    const button = screen.getByRole("option");
    expect(button).toHaveAttribute("aria-selected", "true");
    expect(button).toHaveClass("bg-cp-hover");
  });

  it("does not apply selected styles when isSelected is false", () => {
    render(<SuggestionItem {...defaultProps} isSelected={false} />);

    const button = screen.getByRole("option");
    expect(button).toHaveAttribute("aria-selected", "false");
    expect(button).not.toHaveClass("bg-cp-hover");
  });

  it("shows selection indicator when selected", () => {
    render(<SuggestionItem {...defaultProps} isSelected={true} />);

    const indicator = screen
      .getByRole("option")
      .querySelector(".absolute.left-0");
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass("bg-cp-accent");
  });

  it("applies custom className", () => {
    render(<SuggestionItem {...defaultProps} className="custom-class" />);

    expect(screen.getByRole("option")).toHaveClass("custom-class");
  });

  it("handles keyboard navigation", () => {
    render(<SuggestionItem {...defaultProps} />);

    const button = screen.getByRole("option");

    // Test focus
    button.focus();
    expect(button).toHaveFocus();

    // Test Enter key
    fireEvent.keyDown(button, { key: "Enter" });
    // Note: onClick should be called by the button's default behavior
  });

  it("truncates long labels", () => {
    const longLabel = "This is a very long label that should be truncated";
    render(<SuggestionItem {...defaultProps} label={longLabel} />);

    const labelElement = screen.getByText(longLabel);
    expect(labelElement).toHaveClass("truncate");
  });

  it("truncates long descriptions", () => {
    const longDescription =
      "This is a very long description that should be truncated";
    render(<SuggestionItem {...defaultProps} description={longDescription} />);

    const descriptionElement = screen.getByText(longDescription);
    expect(descriptionElement).toHaveClass("truncate");
  });

  it("has proper accessibility attributes", () => {
    render(<SuggestionItem {...defaultProps} />);

    const button = screen.getByRole("option");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-selected");
  });

  it("supports forwarded ref", () => {
    const ref = vi.fn();
    render(<SuggestionItem {...defaultProps} ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });
});
