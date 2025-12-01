import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Stepper from ".";

const steps = [
  { id: 1, label: "Step 1" },
  { id: 2, label: "Step 2" },
  { id: 3, label: "Step 3" },
];

describe("Stepper", () => {
  it("renders all steps correctly", () => {
    render(<Stepper steps={steps} activeStep={1} onStepChange={jest.fn()} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("highlights active step and following steps", () => {
    const { container } = render(
      <Stepper steps={steps} activeStep={2} onStepChange={jest.fn()} />
    );
    const stepCircles = container.querySelectorAll('[class*="rounded-full"]');
    // First two steps should have oxford background (active)
    expect(stepCircles[0]).toHaveClass("bg-oxford");
    expect(stepCircles[1]).toHaveClass("bg-oxford");
    // Third step should not be active
    expect(stepCircles[2]).not.toHaveClass("bg-oxford");
  });

  it("calls onStepChange when allowClickNavigation is true and step is clicked", () => {
    const handleStepChange = jest.fn();
    const { container } = render(
      <Stepper
        steps={steps}
        activeStep={1}
        onStepChange={handleStepChange}
        allowClickNavigation={true}
      />
    );
    const stepButtons = container.querySelectorAll('[class*="rounded-full"]');
    fireEvent.click(stepButtons[2]);
    expect(handleStepChange).toHaveBeenCalledWith(3);
  });

  it("does not call onStepChange when allowClickNavigation is false", () => {
    const handleStepChange = jest.fn();
    const { container } = render(
      <Stepper
        steps={steps}
        activeStep={1}
        onStepChange={handleStepChange}
        allowClickNavigation={false}
      />
    );
    const stepButtons = container.querySelectorAll('[class*="rounded-full"]');
    fireEvent.click(stepButtons[2]);
    expect(handleStepChange).not.toHaveBeenCalled();
  });

  it("displays step numbers correctly", () => {
    const { container } = render(
      <Stepper steps={steps} activeStep={1} onStepChange={jest.fn()} />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
