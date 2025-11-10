import { render } from "@testing-library/react";
import Loader from ".";

describe("Loader Component", () => {
  it("renders the loader icon", () => {
    const { container } = render(<Loader />);
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("has correct classes for animation and color", () => {
    const { container } = render(<Loader />);
    const icon = container.querySelector("svg");
    expect(icon).toHaveClass("animate-spin");
    expect(icon).toHaveClass("text-jasmine");
    expect(container.firstChild).toHaveClass("flex", "h-screen", "items-center", "justify-center");
  });
});
