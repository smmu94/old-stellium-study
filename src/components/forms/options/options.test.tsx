import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { FaBook } from "react-icons/fa";
import Options from ".";

type TestEnum = 0 | 1 | 2;

const options = [
  { label: "Book", value: 0 as TestEnum, children: <FaBook /> },
  { label: "Pen", value: 1 as TestEnum, children: <FaBook /> },
  { label: "Notebook", value: 2 as TestEnum, children: <FaBook /> },
];

describe("Options", () => {
  it("renders label", () => {
    render(
      <Options
        label="Select an icon"
        options={options}
        value={null}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Select an icon")).toBeInTheDocument();
  });

  it("renders all option buttons", () => {
    render(
      <Options
        label="Select an icon"
        options={options}
        value={null}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Book")).toBeInTheDocument();
    expect(screen.getByText("Pen")).toBeInTheDocument();
    expect(screen.getByText("Notebook")).toBeInTheDocument();
  });

  it("calls onChange with correct value when option is clicked", () => {
    const handleChange = jest.fn();
    render(
      <Options
        label="Select an icon"
        options={options}
        value={null}
        onChange={handleChange}
      />
    );
    
    const bookButton = screen.getByText("Book").closest("button");
    fireEvent.click(bookButton!);
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it("highlights selected option", () => {
    const { container } = render(
      <Options
        label="Select an icon"
        options={options}
        value={1 as TestEnum}
        onChange={jest.fn()}
      />
    );
    
    const buttons = container.querySelectorAll("button");
    // Second button should be highlighted
    expect(buttons[1]).toHaveClass("border-oxford");
    expect(buttons[1]).toHaveClass("bg-oxford/20");
  });

  it("does not highlight unselected options", () => {
    const { container } = render(
      <Options
        label="Select an icon"
        options={options}
        value={0 as TestEnum}
        onChange={jest.fn()}
      />
    );
    
    const buttons = container.querySelectorAll("button");
    // Second button should not be highlighted
    expect(buttons[1]).toHaveClass("border-oxford/20");
    expect(buttons[1]).not.toHaveClass("border-oxford");
  });

  it("displays error message when error prop is provided", () => {
    render(
      <Options
        label="Select an icon"
        options={options}
        value={null}
        onChange={jest.fn()}
        error="Please select an option"
      />
    );
    expect(screen.getByText("Please select an option")).toBeInTheDocument();
  });

  it("applies error styling when error exists", () => {
    const errorElement = render(
      <Options
        label="Select an icon"
        options={options}
        value={null}
        onChange={jest.fn()}
        error="This field is required"
      />
    );
    const error = screen.getByText("This field is required");
    expect(error).toHaveClass("text-red-500");
  });

  it("renders children components for each option", () => {
    const { container } = render(
      <Options
        label="Select an icon"
        options={options}
        value={null}
        onChange={jest.fn()}
      />
    );
    
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it("allows clicking on multiple different options sequentially", () => {
    const handleChange = jest.fn();
    render(
      <Options
        label="Select an icon"
        options={options}
        value={null}
        onChange={handleChange}
      />
    );
    
    fireEvent.click(screen.getByText("Book").closest("button")!);
    fireEvent.click(screen.getByText("Pen").closest("button")!);
    fireEvent.click(screen.getByText("Notebook").closest("button")!);
    
    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenNthCalledWith(1, 0);
    expect(handleChange).toHaveBeenNthCalledWith(2, 1);
    expect(handleChange).toHaveBeenNthCalledWith(3, 2);
  });
});
