import { render, screen } from "@testing-library/react";
import InfoCard from "@/components/ui/cards/infoCard";
import { FaBeer } from "react-icons/fa";

describe("InfoCard Component", () => {
  it("renders title and description", () => {
    render(<InfoCard title="Test Title" description="Test Description" icon={<span data-testid="icon" />} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders icon if provided", () => {
    render(<InfoCard title="Title" description="Desc" icon={<FaBeer data-testid="icon"/>} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("applies custom cardClassName when provided", () => {
    const { container } = render(
      <InfoCard title="Title" description="Desc" cardClassName="custom-class" icon={<span data-testid="icon" />} />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("uses default max-w-sm class if cardClassName is not provided", () => {
    const { container } = render(<InfoCard title="Title" description="Desc" icon={<span data-testid="icon" />} />);
    expect(container.firstChild).toHaveClass("max-w-sm");
  });
});
