import { VALUES } from "@/app/about/contants";
import AboutPage from "@/app/about/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/ui/cards/infoCard", () => ({
  __esModule: true,
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="info-card">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock("@/components/ui/signUpButton", () => ({
  __esModule: true,
  default: () => <button data-testid="sign-up-btn">Sign up</button>,
}));

jest.mock("react-icons/fa", () => {
  const MockIcon = () => <span data-testid="mock-icon">Icon</span>;
  return new Proxy(
    {},
    {
      get: () => MockIcon,
    }
  );
});

describe("AboutPage", () => {
  it("should render main title and description", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/Your Academic Universe/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/StelliumStudy empowers students/i)
    ).toBeInTheDocument();
  });

  it("should render the section title", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/How StelliumStudy Helps You/i)
    ).toBeInTheDocument();
  });

  it("should render one InfoCard per VALUE in VALUES", () => {
    render(<AboutPage />);
    const cards = screen.getAllByTestId("info-card");
    expect(cards.length).toBe(VALUES.length);
  });

  it("should render the CTA section and SignUp button", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Ready to flow/i)).toBeInTheDocument();
    expect(screen.getByTestId("sign-up-btn")).toBeInTheDocument();
  });
});
