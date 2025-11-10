import { signInWithGoogle, signInWithEmail, signUpWithEmail, logOut, sendPasswordReset, mapFirebaseUserToSafeUser, handleFirebaseError, getFirebaseErrorMessage } from "../utils";
import toast from "react-hot-toast";

const mockUser = { uid: "123", email: "test@example.com", displayName: "Test", photoURL: null };
const mockAuthResult = { user: mockUser };

jest.mock("@/lib/firebase", () => ({
  auth: {},
  googleProvider: {},
}));

jest.mock("firebase/auth", () => ({
  signInWithPopup: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("Auth Utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("signInWithGoogle returns user on success", async () => {
    const { signInWithPopup } = require("firebase/auth");
    (signInWithPopup as jest.Mock).mockResolvedValue(mockAuthResult);
    const result = await signInWithGoogle();
    expect(result.user).toEqual(mockUser);
    expect(result.error).toBeNull();
  });

  it("signInWithGoogle returns error on failure", async () => {
    const { signInWithPopup } = require("firebase/auth");
    const fakeError = { code: "auth/error" };
    (signInWithPopup as jest.Mock).mockRejectedValue(fakeError);
    const result = await signInWithGoogle();
    expect(result.user).toBeNull();
    expect(result.error).toEqual(fakeError);
  });

  it("signInWithEmail returns user on success", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockAuthResult);
    const result = await signInWithEmail("test@example.com", "123456");
    expect(result.user).toEqual(mockUser);
    expect(result.error).toBeNull();
  });

  it("signUpWithEmail returns user on success", async () => {
    const { createUserWithEmailAndPassword } = require("firebase/auth");
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockAuthResult);
    const result = await signUpWithEmail("test@example.com", "123456");
    expect(result.user).toEqual(mockUser);
    expect(result.error).toBeNull();
  });

  it("logOut returns empty on success", async () => {
    const { signOut } = require("firebase/auth");
    (signOut as jest.Mock).mockResolvedValue({});
    const result = await logOut();
    expect(result).toEqual({});
  });

  it("sendPasswordReset returns empty on success", async () => {
    const { sendPasswordResetEmail } = require("firebase/auth");
    (sendPasswordResetEmail as jest.Mock).mockResolvedValue({});
    const result = await sendPasswordReset("test@example.com");
    expect(result).toEqual({});
  });

  it("mapFirebaseUserToSafeUser maps user correctly", () => {
    const safeUser = mapFirebaseUserToSafeUser(mockUser as any);
    expect(safeUser).toEqual({
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName,
      photoURL: mockUser.photoURL,
    });
  });

  it("handleFirebaseError calls toast.error with message", () => {
    const fakeError = { code: "auth/email-already-in-use" } as any;
    handleFirebaseError(fakeError);
    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining("An account already exists with this email"),
      expect.any(Object)
    );
  });

  it("getFirebaseErrorMessage returns default for unknown code", () => {
    const message = getFirebaseErrorMessage("unknown/code");
    expect(message).toBe("Unexpected error. Try again later.");
  });
});
