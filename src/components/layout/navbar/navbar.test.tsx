import { BRAND_ASSETS } from "@/config/constants";
import { NAVIGATION_ITEMS, ROUTES } from "@/utils/routes/routes";
import { render, screen } from "@testing-library/react";
import Navbar from ".";

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  it("should render the navbar with correct structure", () => {
    render(<Navbar />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  it("should render the logo with correct attributes", () => {
    render(<Navbar />);
    const logo = screen.getByAltText("Stellium Study");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", BRAND_ASSETS.logo.light);
    expect(logo).toHaveAttribute("width", "200");
    expect(logo).toHaveAttribute("height", "50");
  });

  it("should render the logo link with correct href", () => {
    render(<Navbar />);
    const logoLink = screen.getByRole("link", { name: /stellium study/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", ROUTES.HOME);
  });

  it("should render all navigation links with correct attributes", () => {
    render(<Navbar />);
    NAVIGATION_ITEMS.forEach(({ label, href }) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("should render the correct number of navigation links", () => {
    render(<Navbar />);
    const navLinks = screen.getAllByRole("link").filter(link => !link.querySelector("img"));
    expect(navLinks).toHaveLength(NAVIGATION_ITEMS.length);
  });

  it("should render all expected navigation labels", () => {
    render(<Navbar />);
    const expectedLabels = NAVIGATION_ITEMS.map(item => item.label);
    expectedLabels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
