import { render, screen, fireEvent } from "@testing-library/react";
import Input from ".";

describe("Input Component", () => {
  it("renders a text input correctly", () => {
    render(<Input label="Username" name="username" />);
    const input = screen.getByLabelText("Username") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
    expect(input.type).toBe("text");
  });

  it("renders a textarea when 'as' prop is 'textarea'", () => {
    render(<Input label="Message" name="message" as="textarea" />);
    const textarea = screen.getByLabelText("Message") as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("displays error message when error prop is provided", () => {
    render(<Input label="Email" name="email" error="Email is required" />);
    const errorMsg = screen.getByText("Email is required");
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg).toHaveClass("text-red-500");
  });

  it("is disabled when disabled or loading is true", () => {
    render(<Input label="Password" name="password" disabled />);
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input).toBeDisabled();

    render(<Input label="Password" name="password" loading />);
    const input2 = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input2).toBeDisabled();
  });

  it("toggles password visibility when type is password", () => {
    render(<Input label="Password" name="password" type="password" />);
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { hidden: true });

    expect(input.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(input.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(input.type).toBe("password");
  });

  it("renders placeholder correctly", () => {
    render(<Input label="Name" name="name" placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText("Enter your name");
    expect(input).toBeInTheDocument();
  });
});
