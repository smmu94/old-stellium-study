"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast"; // Importamos toast

import Button from "@/components/ui/button";
import Input from "@/components/forms/input";
import AuthTabs from "./components/authTabs/AuthTabs";
import ForgotPassword from "./components/forgotPassword";

import { ROUTES } from "@/utils/routes/routes";
import { registerUserAction } from "@/lib/actions";
import {
  initialSignInFormData,
  initialSignUpFormData,
  SignInFormData,
  SignUpFormData,
} from "./form";
import { signInSchema, signUpSchema } from "./schema";
import { AuthFormProps } from "./types";

export default function AuthForm({ isSignIn, setIsSignIn }: AuthFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  // Resetear el formulario al cambiar entre login y registro
  useEffect(() => {
    reset(defaultValues);
    setError(null);
  }, [isSignIn, reset, defaultValues]);

  const onSubmit = async (data: SignInFormData | SignUpFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      if (isSignIn) {
        // --- LÓGICA DE INICIO DE SESIÓN ---
        const result = await signIn("credentials", {
          email: data.email.toLowerCase(),
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Email o contraseña incorrectos");
        } else {
          router.push(ROUTES.DASHBOARD);
          router.refresh();
        }
      } else {
        // --- LÓGICA DE REGISTRO + AUTO-LOGIN ---
        const response = await registerUserAction(data as SignUpFormData);

        if (response?.error) {
          setError(response.error);
        } else {
          // 1. Toast de éxito de creación
          toast.success("Account created successfully!", { icon: "🚀" });

          // 2. Auto-login inmediato
          const autoLogin = await signIn("credentials", {
            email: data.email.toLowerCase(),
            password: data.password,
            redirect: false,
          });

          if (autoLogin?.error) {
            // Fallback: si falla el autologin, lo mandamos al login manual
            setIsSignIn(true);
            setError("Account created. Please log in.");
          } else {
            router.push(ROUTES.DASHBOARD);
            router.refresh();
          }
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    await signIn("google", { callbackUrl: ROUTES.DASHBOARD });
  };

  const handleBackToForm = () => {
    setForgotView(false);
    if (!isSignIn) setIsSignIn(true);
  };

  const signUpErrors = errors as FieldErrors<SignUpFormData>;

  if (forgotView) {
    return <ForgotPassword onBackToLogin={handleBackToForm} />;
  }

  return (
    <div className="p-8 border border-solid rounded-xl border-platinum bg-white flex flex-col items-center gap-6 w-full max-w-lg shadow-sm">
      <AuthTabs isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
      
      {error && (
        <div className="w-full p-3 text-sm text-white bg-vermilion rounded-md text-center font-bold animate-shake">
          {error}
        </div>
      )}

      <form className="w-full" onSubmit={handleSubmit(onSubmit)} data-testid="auth-form">
        {!isSignIn && (
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                placeholder="Your name"
                error={signUpErrors.name?.message}
              />
            )}
          />
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              placeholder="correo@ejemplo.com"
              type="email"
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              placeholder="••••••••"
              type="password"
              error={errors.password?.message}
            />
          )}
        />
        
        {isSignIn && (
          <span
            onClick={() => setForgotView(true)}
            className="text-preset-4-bolder text-vermilion flex justify-end cursor-pointer mb-4 hover:underline"
          >
            Forgot your password?
          </span>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <Button type="submit" style="primary" fullWidth loading={submitting}>
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>

          <Button
            type="button"
            style="ghost"
            fullWidth
            onClick={handleGoogleSignIn}
            disabled={submitting}
          >
            <FcGoogle className="text-xl" />
            <span className="text-preset-4">Continue with Google</span>
          </Button>
        </div>
      </form>

      {isSignIn && (
        <p className="text-center text-preset-4 text-oxford">
          Don&apos;t have an account?{" "}
          <span
            className="text-vermilion cursor-pointer text-preset-4-bolder hover:underline"
            onClick={() => setIsSignIn(false)}
          >
            Sign up
          </span>
        </p>
      )}
    </div>
  );
}