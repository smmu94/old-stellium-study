export type SignInFormData = {
  email: string;
  password: string;
};
export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export const initialSignInFormData: SignInFormData = {
  email: "",
  password: "",
};
export const initialSignUpFormData: SignUpFormData = {
  name: "",
  email: "",
  password: "",
};

export const initialForgotPasswordFormData: ForgotPasswordFormData = {
  email: "",
};