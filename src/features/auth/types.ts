export interface SafeUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user: SafeUser | null | undefined;
  loading: boolean;
}
