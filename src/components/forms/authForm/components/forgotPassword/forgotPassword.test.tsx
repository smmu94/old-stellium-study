import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from ".";
import * as authUtils from "@/features/auth/utils";

jest.mock("@/features/auth/utils", () => ({
  sendPasswordReset: jest.fn(),
  handleFirebaseError: jest.fn(),
}));

describe("ForgotPassword Component", () => {
  const onBackToLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<ForgotPassword onBackToLogin={onBackToLogin} />);
    expect(screen.getByText("Password Recovery")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Recovery Link" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Return to Login" })).toBeInTheDocument();
  });

  it("submits the form and shows success message", async () => {
    (authUtils.sendPasswordReset as jest.Mock).mockResolvedValue({ error: null });
    render(<ForgotPassword onBackToLogin={onBackToLogin} />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Recovery Link" }));
    await waitFor(() => {
      expect(authUtils.sendPasswordReset).toHaveBeenCalledWith("test@example.com");
      expect(screen.getByText(/An email with instructions has been sent/i)).toBeInTheDocument();
    });
  });

  it("calls onBackToLogin when Return to Login button is clicked after success", async () => {
    (authUtils.sendPasswordReset as jest.Mock).mockResolvedValue({ error: null });
    render(<ForgotPassword onBackToLogin={onBackToLogin} />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Recovery Link" }));
    await waitFor(() => {
      expect(screen.getByText(/An email with instructions has been sent/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: "Return to Login" }));
    expect(onBackToLogin).toHaveBeenCalled();
  });

  it("calls onBackToLogin when Return to Login button is clicked from initial form", () => {
    render(<ForgotPassword onBackToLogin={onBackToLogin} />);
    fireEvent.click(screen.getByRole("button", { name: "Return to Login" }));
    expect(onBackToLogin).toHaveBeenCalled();
  });

  it("handles error from sendPasswordReset", async () => {
    const mockError = { code: "auth/error", message: "Some error" };
    (authUtils.sendPasswordReset as jest.Mock).mockResolvedValue({ error: mockError });
    render(<ForgotPassword onBackToLogin={onBackToLogin} />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Recovery Link" }));
    await waitFor(() => {
      expect(authUtils.handleFirebaseError).toHaveBeenCalledWith(mockError);
      expect(screen.queryByText(/An email with instructions has been sent/i)).not.toBeInTheDocument();
    });
  });
});
