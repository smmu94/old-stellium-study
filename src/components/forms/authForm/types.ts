export type AuthFormProps = {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
}

export type ForgotPasswordProps = {
  onBackToLogin: () => void;
}