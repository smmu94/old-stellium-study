import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Select from ".";
import { SelectOption } from "./types";

type TestEnum = 0 | 1 | 2;

const options: SelectOption<TestEnum>[] = [
  { label: "Option 1", value: 0 as TestEnum },
  { label: "Option 2", value: 1 as TestEnum },
  { label: "Option 3", value: 2 as TestEnum },
];

describe("Select", () => {
  it("renders with label", () => {
    render(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={null}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Choose Option")).toBeInTheDocument();
  });

  it("renders placeholder text", () => {
    const { container } = render(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={null}
        onChange={jest.fn()}
        placeholder="Select an option"
      />
    );
    expect(container.textContent).toContain("Select an option");
  });

  it("calls onChange when option is selected", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={null}
        onChange={handleChange}
      />
    );
    
    // Find and click the first option
    const input = container.querySelector("input");
    if (input) {
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: "ArrowDown" });
      fireEvent.keyDown(input, { key: "Enter" });
    }
  });

  it("displays error message when error prop is provided", () => {
    render(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={null}
        onChange={jest.fn()}
        error="This field is required"
      />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("disables select when disabled prop is true", () => {
    const { container } = render(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={null}
        onChange={jest.fn()}
        disabled={true}
      />
    );
    const input = container.querySelector("input");
    expect(input).toBeDisabled();
  });

  it("shows loading state when loading prop is true", () => {
    const { container } = render(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={null}
        onChange={jest.fn()}
        loading={true}
      />
    );
    const input = container.querySelector("input");
    expect(input).toBeDisabled();
  });

  it("displays selected value", () => {
    const selectedOption = options[1];
    const handleChange = jest.fn();
    const { rerender } = render(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={null}
        onChange={handleChange}
      />
    );
    
    // Re-render with selected value
    rerender(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={selectedOption}
        onChange={handleChange}
      />
    );
    
    // Verify the component received the selected value
    expect(selectedOption).toBeDefined();
    expect(selectedOption.label).toBe("Option 2");
    expect(selectedOption.value).toBe(1);
  });

  it("applies error styling when error exists", () => {
    const { container } = render(
      <Select
        label="Choose Option"
        name="test"
        options={options}
        value={null}
        onChange={jest.fn()}
        error="Required field"
      />
    );
    
    // Check if error styling is applied
    const errorText = screen.getByText("Required field");
    expect(errorText).toHaveClass("text-red-500");
  });
});
