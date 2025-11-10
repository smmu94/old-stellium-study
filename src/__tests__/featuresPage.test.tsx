import { render, screen } from "@testing-library/react";
import FeaturesPage from "@/app/features/page";
import { FEATURES } from "@/app/features/contants";

jest.mock("@/components/ui/cards/infoCard", () => ({
  __esModule: true,
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="feature-card">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock("@/components/ui/signUpButton", () => ({
  __esModule: true,
  default: () => <button data-testid="sign-up-button">Get Started</button>,
}));

jest.mock("react-icons/fa", () => ({
  FaCalendar: () => <span data-testid="icon" />,
  FaBook: () => <span data-testid="icon" />,
  FaClock: () => <span data-testid="icon" />,
}));

describe("FeaturesPage", () => {
  it("renders main headings", () => {
    render(<FeaturesPage />);

    expect(
      screen.getByText("The future of academic organization, today.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Explore our key tools")
    ).toBeInTheDocument();
  });

  it("renders the same number of feature cards as FEATURES", () => {
    render(<FeaturesPage />);

    const cards = screen.getAllByTestId("feature-card");
    expect(cards.length).toBe(FEATURES.length);
  });

  it("renders title and description for each feature", () => {
    render(<FeaturesPage />);

    FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    });
  });

  it("renders the SignUpButton", () => {
    render(<FeaturesPage />);
    expect(screen.getByTestId("sign-up-button")).toBeInTheDocument();
  });
});
