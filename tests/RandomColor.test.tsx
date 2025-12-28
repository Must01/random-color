import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RandomColour from "../src/components/RandomColour"; // Ensure this matches your filename exactly
import "@testing-library/jest-dom/vitest"; // 👈 FIXES: toBeInTheDocument error

describe("RandomColour Component", () => {
  // Mocking Browser APIs
  beforeEach(() => {
    vi.stubGlobal("alert", vi.fn()); // Mock alert

    // Proper way to mock navigator.clipboard in Vitest/JSDOM
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
      configurable: true,
    });
  });

  it("should render initial buttons and credits", () => {
    render(<RandomColour />);
    expect(screen.getByText(/hex color/i)).toBeInTheDocument();
    expect(screen.getByText(/rgb color/i)).toBeInTheDocument();
    expect(screen.getByText(/Made with 💖 By/i)).toBeInTheDocument();
  });

  it("should generate a HEX color by default", () => {
    render(<RandomColour />);
    // Since we changed the div to an h1 in the component
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/#/i)).toBeInTheDocument();
  });

  it("should switch to RGB mode when button is clicked", async () => {
    render(<RandomColour />);
    const rgbBtn = screen.getByText(/rgb color/i);

    fireEvent.click(rgbBtn);

    // Wait for useEffect to trigger the color change
    await waitFor(() => {
      expect(screen.getByText(/rgb\(/i)).toBeInTheDocument();
    });
  });

  it("should change color when 'Generate' button is clicked", () => {
    render(<RandomColour />);
    const initialColor = screen.getByText(/#/i).textContent;
    const generateBtn = screen.getByText(/Generate Random color/i);

    fireEvent.click(generateBtn);

    const newColor = screen.getByText(/#/i).textContent;
    expect(initialColor).not.toBe(newColor);
  });

  it("should copy color to clipboard and show alert", async () => {
    render(<RandomColour />);

    const copyBtn = screen.getByLabelText("copy-icon");

    // Click the button
    fireEvent.click(copyBtn);

    // 1. Check if clipboard was called
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    // 2. Check if the global alert was called
    // Since we used vi.stubGlobal('alert', ...), we just check window.alert
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });
  });
});
