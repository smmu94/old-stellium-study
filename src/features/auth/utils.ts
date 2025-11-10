import { auth, googleProvider } from "@/lib/firebase";
import { AuthError, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, User, sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { SafeUser } from "./types";

interface AuthResult {
  user: User | null;
  error: AuthError | null;
}

const asAuthError = (error: unknown): AuthError | null =>
  error && typeof error === "object" && "code" in error ? (error as AuthError) : null;

export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: asAuthError(error) };
  }
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: asAuthError(error) };
  }
}

export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: asAuthError(error) };
  }
}

export async function logOut(): Promise<{ error?: AuthError | null }> {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    return { error: asAuthError(error) };
  }
}

export async function sendPasswordReset(email: string): Promise<{ error?: AuthError | null }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return {};
  } catch (error) {
    return { error: asAuthError(error) };
  }
}

const firebaseErrorMessages: { [key: string]: string } = {
  ["auth/email-already-in-use"]: "An account already exists with this email. Please switch to the Sign In tab, or use your social login provider (Google).",
  ["auth/invalid-credential"]: "Invalid credentials provided.",
};

export const getFirebaseErrorMessage = (code: string) => {
  return firebaseErrorMessages[code] || "Unexpected error. Try again later.";
};

export const handleFirebaseError = (error: AuthError) => {
  const message = getFirebaseErrorMessage(error.code);
  toast.error(message, {
    duration: 10000,
    style: { padding: "1.5rem", backgroundColor: "#faece7", color: "#0a0f29", fontWeight: "bold"},
    position: "bottom-right",
  });
};

export const mapFirebaseUserToSafeUser = (u: User | null): SafeUser | null => {
  if (!u) return null;
  return {
    uid: u.uid,
    email: u.email ?? null,
    displayName: u.displayName ?? null,
    photoURL: u.photoURL ?? null,
  };
};
