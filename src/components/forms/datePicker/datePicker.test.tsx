import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import DatePicker from ".";

describe("DatePicker", () => {
  it("renders with label", () => {
    render(
      <DatePicker
        label="Select Date"
        selected={null}
        onChange={jest.fn()}
        name="testDate"
      />
    );
    expect(screen.getByText("Select Date")).toBeInTheDocument();
  });

  it("displays placeholder text", () => {
    const { container } = render(
      <DatePicker
        label="Select Date"
        selected={null}
        onChange={jest.fn()}
        placeholder="Pick a date"
        name="testDate"
      />
    );
    const input = container.querySelector("input");
    expect(input?.placeholder).toBe("Pick a date");
  });

  it("calls onChange when date is selected", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <DatePicker
        label="Select Date"
        selected={null}
        onChange={handleChange}
        name="testDate"
      />
    );
    const input = container.querySelector("input");
    fireEvent.change(input!, { target: { value: "12/25/2025" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("displays error message when error prop is provided", () => {
    render(
      <DatePicker
        label="Select Date"
        selected={null}
        onChange={jest.fn()}
        error="Date is required"
        name="testDate"
      />
    );
    expect(screen.getByText("Date is required")).toBeInTheDocument();
  });

  it("disables input when disabled prop is true", () => {
    const { container } = render(
      <DatePicker
        label="Select Date"
        selected={null}
        onChange={jest.fn()}
        disabled={true}
        name="testDate"
      />
    );
    const input = container.querySelector("input");
    expect(input).toBeDisabled();
  });

  it("applies gray background when disabled", () => {
    const { container } = render(
      <DatePicker
        label="Select Date"
        selected={null}
        onChange={jest.fn()}
        disabled={true}
        name="testDate"
      />
    );
    const input = container.querySelector("input");
    expect(input).toHaveClass("bg-gray-100");
  });

  it("displays selected date in correct format", () => {
    const date = new Date(2025, 11, 25); // December 25, 2025
    const { container } = render(
      <DatePicker
        label="Select Date"
        selected={date}
        onChange={jest.fn()}
        name="testDate"
      />
    );
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("12/25/2025");
  });

  it("shows error border when error exists", () => {
    const { container } = render(
      <DatePicker
        label="Select Date"
        selected={null}
        onChange={jest.fn()}
        error="Date is required"
        name="testDate"
      />
    );
    const input = container.querySelector("input");
    expect(input).toHaveClass("border-red-500");
  });
});
