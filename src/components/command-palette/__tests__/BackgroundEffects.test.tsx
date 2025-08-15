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
      
      const backgroundContainer = container.f