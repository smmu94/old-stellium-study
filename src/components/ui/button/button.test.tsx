import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./index";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("has full width when fullWidth prop is true", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("applies primary style class", () => {
    render(<Button style="primary">Primary Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");
  });

  it("applies secondary style class", () => {
    render(<Button style="secondary">Secondary Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-secondary");
  });

  it("applies ghost style class", () => {
    render(<Button style="ghost">Ghost Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-ghost");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
});
