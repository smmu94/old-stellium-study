import { fireEvent, render, screen } from "@testing-library/react";
import Item from ".";

jest.mock("react-icons/fa", () => ({
  FaBeer: () => <svg data-testid="icon" />,
}));

const defaultProps = {
  title: "Dashboard",
  icon: "FaBeer",
  href: "/dashboard",
  isActive: false,
  onClick: jest.fn(),
};

describe("Item Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the title", () => {
    render(<Item {...defaultProps} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
  it("renders the icon", () => {
    render(<Item {...defaultProps} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
  it("applies active class when isActive is true", () => {
    render(<Item {...defaultProps} isActive />);
    const link = screen.getByText("Dashboard").closest("a");
    expect(link).toHaveClass("bg-jasmine text-oxford");
  });
  it("applies default class when isActive is false", () => {
    render(<Item {...defaultProps} />);
    const link = screen.getByText("Dashboard").closest("a");
    expect(link).toHaveClass("text-white hover:bg-jasmine hover:text-oxford");
  });
  it("calls onClick when clicked", () => {
    render(<Item {...defaultProps} />);
    const link = screen.getByText("Dashboard").closest("a")!;
    fireEvent.click(link);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("uses correct href", () => {
    render(<Item {...defaultProps} />);
    const link = screen.getByText("Dashboard").closest("a");
    expect(link).toHaveAttribute("href", "/dashboard");
  });
});
