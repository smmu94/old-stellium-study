import { BRAND_ASSETS } from "@/config/constants";
import { render, screen } from "@testing-library/react";
import { SOCIAL_LINKS } from "./constants";
import Footer from "./index";

describe("Footer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the footer with correct structure", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("should render the logo with correct attributes", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Stellium Study");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", BRAND_ASSETS.logo.dark);
    expect(logo).toHaveAttribute("width", "170");
    expect(logo).toHaveAttribute("height", "40");
  });

  it("should render copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyright = screen.getByText(`© ${currentYear} Stellium Study. All rights reserved.`);
    expect(copyright).toBeInTheDocument();
  });

  it("should render all social media links", () => {
    render(<Footer />);
    SOCIAL_LINKS.forEach(({ title, href }) => {
      const link = screen.getByLabelText(title);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("title", title);
    });
  });

  it("should render the correct number of social links", () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole("link");
    expect(socialLinks).toHaveLength(SOCIAL_LINKS.length);
  });
});
