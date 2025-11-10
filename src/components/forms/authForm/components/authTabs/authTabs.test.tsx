import { render, screen, fireEvent } from "@testing-library/react";
import AuthTabs from "./AuthTabs";

describe("AuthTabs", () => {
  const mockSetIsSignIn = jest.fn();

  it("should highlight 'Sign In' when isSignIn=true", () => {
    render(<AuthTabs isSignIn={true} setIsSignIn={mockSetIsSignIn} />);
    const signInBtn = screen.getByText(/Sign In/i);
    const signUpBtn = screen.getByText(/Sign Up/i);
    expect(signInBtn).toHaveClass("bg-white");
    expect(signUpBtn).not.toHaveClass("bg-white");
  });

  it("should highlight 'Sign Up' when isSignIn=false", () => {
    render(<AuthTabs isSignIn={false} setIsSignIn={mockSetIsSignIn} />);
    const signInBtn = screen.getByText(/Sign In/i);
    const signUpBtn = screen.getByText(/Sign Up/i);
    expect(signInBtn).not.toHaveClass("bg-white");
    expect(signUpBtn).toHaveClass("bg-white");
  });

  it("should call setIsSignIn(true) when Sign In clicked", () => {
    render(<AuthTabs isSignIn={false} setIsSignIn={mockSetIsSignIn} />);
    fireEvent.click(screen.getByText(/Sign In/i));
    expect(mockSetIsSignIn).toHaveBeenCalledWith(true);
  });

  it("should call setIsSignIn(false) when Sign Up clicked", () => {
    render(<AuthTabs isSignIn={true} setIsSignIn={mockSetIsSignIn} />);
    fireEvent.click(screen.getByText(/Sign Up/i));
    expect(mockSetIsSignIn).toHaveBeenCalledWith(false);
  });
});
