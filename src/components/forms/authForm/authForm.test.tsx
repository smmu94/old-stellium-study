import authReducer from "@/features/auth/authSlice";
import * as authUtils from "@/features/auth/utils";
import { ROUTES } from "@/utils/routes/routes";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";
import AuthForm from ".";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/features/auth/utils", () => ({
  signInWithEmail: jest.fn(),
  signUpWithEmail: jest.fn(),
  signInWithGoogle: jest.fn(),
  handleFirebaseError: jest.fn(),
  mapFirebaseUserToSafeUser: jest.fn(),
}));

const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { user: null, loading: false, ...initialState } },
  });

const renderWithProvider = (ui: React.ReactNode, store = createTestStore()) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("AuthForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Sign In form by default", () => {
    renderWithProvider(<AuthForm isSignIn={true} setIsSignIn={jest.fn()} />);
    const form = screen.getByTestId("auth-form");
    expect(within(form).getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
  });

  it("should switch to Sign Up form", () => {
    const setIsSignIn = jest.fn();
    renderWithProvider(<AuthForm isSignIn={true} setIsSignIn={setIsSignIn} />);
    fireEvent.click(screen.getByText("Sign up"));
    expect(setIsSignIn).toHaveBeenCalledWith(false);
  });

  it("should submit sign in form and call signInWithEmail", async () => {
    const mockUser = { uid: "123", email: "test@example.com" };
    (authUtils.signInWithEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
    (authUtils.mapFirebaseUserToSafeUser as jest.Mock).mockImplementation(u => u);
    renderWithProvider(<AuthForm isSignIn={true} setIsSignIn={jest.fn()} />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "123456" } });
    fireEvent.click(screen.getAllByText("Sign In")[1]);
    await waitFor(() => {
      expect(authUtils.signInWithEmail).toHaveBeenCalledWith("test@example.com", "123456");
      expect(mockPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
    });
  });

  it("should submit sign up form and call signUpWithEmail", async () => {
    const mockUser = { uid: "123", email: "new@test.com" };
    (authUtils.signUpWithEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
    (authUtils.mapFirebaseUserToSafeUser as jest.Mock).mockImplementation(u => u);
    renderWithProvider(<AuthForm isSignIn={false} setIsSignIn={jest.fn()} />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "new@test.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "123456" } });
    fireEvent.click(screen.getAllByText("Sign Up")[1]);
    await waitFor(() => {
      expect(authUtils.signUpWithEmail).toHaveBeenCalledWith("new@test.com", "123456");
      expect(mockPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
    });
  });

  it("should call signInWithGoogle when Google button is clicked", async () => {
    const mockUser = { uid: "google123", email: "google@test.com" };
    (authUtils.signInWithGoogle as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
    (authUtils.mapFirebaseUserToSafeUser as jest.Mock).mockImplementation(u => u);
    renderWithProvider(<AuthForm isSignIn={true} setIsSignIn={jest.fn()} />);
    fireEvent.click(screen.getByText("Continue with Google"));
    await waitFor(() => {
      expect(authUtils.signInWithGoogle).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
    });
  });
});
