"use client";
import Button from "@/components/ui/button";
import { setUser } from "@/features/auth/authSlice";
import { mapFirebaseUserToSafeUser } from "@/features/auth/utils";
import { ROUTES } from "@/utils/routes/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {
  handleFirebaseError,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from "../../../features/auth/utils";
import Input from "../input";
import AuthTabs from "./components/authTabs/AuthTabs";
import ForgotPassword from "./components/forgotPassword";
import {
  initialSignInFormData,
  initialSignUpFormData,
  SignInFormData,
  SignUpFormData,
} from "./form";
import { signInSchema, signUpSchema } from "./schema";
import { AuthFormProps } from "./types";

export default function AuthForm({ isSignIn, setIsSignIn }: AuthFormProps) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [forgotView, setForgotView] = useState(false);
  const schema = isSignIn ? signInSchema : signUpSchema;
  const defaultValues = isSignIn ? initialSignInFormData : initialSignUpFormData;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [isSignIn, reset, defaultValues]);

  const handleAuthSuccess = useCallback(
    (firebaseUser: User | null) => {
      if (!firebaseUser) return;
      const safeUser = mapFirebaseUserToSafeUser(firebaseUser);
      if (!safeUser) return;
      dispatch(setUser(safeUser));
      router.push(ROUTES.DASHBOARD);
    },
    [dispatch, router]
  );

  const onSubmit = async (data: SignInFormData | SignUpFormData) => {
    setSubmitting(true);
    try {
      const fn = isSignIn ? signInWithEmail : signUpWithEmail;
      const { user, error } = await fn(data.email, data.password);
      if (user) return handleAuthSuccess(user);
      if (error) handleFirebaseError(error);
    } catch (error: any) {
      handleFirebaseError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      const { user, error } = await signInWithGoogle();
      if (user) handleAuthSuccess(user);
      if (error) handleFirebaseError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setForgotView(false);
    if (!isSignIn) setIsSignIn(true); 
  };

  const signUpErrors = errors as FieldErrors<SignUpFormData>;

  if (forgotView) {
    return (
      <ForgotPassword onBackToLogin={handleBackToForm} />
    );
  }
    
  return (
    <div className="p-8 border border-solid rounded-xl border-platinum bg-white flex flex-col items-center gap-6 w-full max-w-lg">
      <AuthTabs isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
      <form className="w-full" onSubmit={handleSubmit(onSubmit)} data-testid="auth-form">
        {!isSignIn && (
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Name" placeholder="Enter your name" error={signUpErrors.name?.message} />
            )}
          />
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Email" placeholder="Enter your email" type="email" error={errors.email?.message} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Password" placeholder="Enter your password" type="password" error={errors.password?.message} />
          )}
        />
        {isSignIn && (
          <span 
            onClick={() => setForgotView(true)} 
            className="text-preset-4-bolder text-vermilion flex justify-end cursor-pointer"
          >
            Forgot Password?
          </span>
        )}            
        <Button type="submit" style="primary" fullWidth loading={submitting}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>    
        <Button type="button" style="ghost" fullWidth onClick={handleGoogleSignIn}>
          <FcGoogle className="text-xl" />
          <span className="text-preset-4">Continue with Google</span>
        </Button>
      </form>
      {isSignIn && (
        <p className="text-center text-preset-4 text-oxford">
          Don&apos;t have an account?{" "}
          <span className="text-vermilion cursor-pointer text-preset-4-bolder" onClick={() => setIsSignIn(false)}>
            Sign up
          </span>
        </p>
      )}
    </div>
  );
}