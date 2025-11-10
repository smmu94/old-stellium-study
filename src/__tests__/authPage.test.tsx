import AuthPage from "@/app/auth/page";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/components/forms/authForm", () => ({
  __esModule: true,
  default: ({ isSignIn, setIsSignIn }: { isSignIn: boolean; setIsSignIn: (v: boolean) => void }) => (
    <div data-testid="auth-form">
      <p data-testid="mode">{isSignIn ? "Sign In Mode" : "Sign Up Mode"}</p>
      <button data-testid="toggle" onClick={() => setIsSignIn(!isSignIn)}>Toggle Mode</button>
    </div>
  ),
}));

describe("AuthPage", () => {
  it("renders initial sign-in title and subtitle", () => {
    render(<AuthPage />);
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    expect(
      screen.getByText("Sign in to continue your academic journey.")
    ).toBeInTheDocument();
    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
    expect(screen.getByTestId("mode").textContent).toBe("Sign In Mode");
  });

  it("switches to sign-up mode when setIsSignIn is called", () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByTestId("toggle"));
    expect(screen.getByText("Join Stellium Study")).toBeInTheDocument();
    expect(
      screen.getByText("Sign up to start your academic adventure.")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mode").textContent).toBe("Sign Up Mode");
  });
});
