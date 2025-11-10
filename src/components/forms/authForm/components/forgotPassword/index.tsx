"use client";

import Button from "@/components/ui/button";
import { handleFirebaseError, sendPasswordReset } from "@/features/auth/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../input";
import { ForgotPasswordFormData, initialForgotPasswordFormData } from "../../form";
import { forgotPasswordSchema } from "../../schema";
import { ForgotPasswordProps } from "../../types";

export default function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: initialForgotPasswordFormData,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    setSuccess(false);
    const { error } = await sendPasswordReset(data.email);
    if (error) {
      handleFirebaseError(error);
    } else {
      setSuccess(true);
    }
    setSubmitting(false);
  });

  if (success) {
    return (
      <div className="p-8 border border-solid rounded-xl border-platinum bg-white w-full max-w-lg flex flex-col gap-4">
        <p className="text-preset-3 text-oxford text-center">
          An email with instructions has been sent to your address. Please check your inbox.
        </p>
        <Button onClick={onBackToLogin} style="secondary" fullWidth>
          Return to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="p-8 border border-solid rounded-xl border-platinum bg-white w-full max-w-lg flex flex-col gap-4">
      <h2 className="text-preset-3-bolder text-center text-oxford">Password Recovery</h2>
      <p className="text-preset-4 text-center text-oxford">
        Enter your email to receive a recovery link.
      </p>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input 
            {...field} 
            label="Email"
            type="email"
            placeholder="example@email.com" 
            error={errors.email?.message} 
          />
        )}
      />
      <div className="flex flex-col">
        <Button type="submit" disabled={submitting} fullWidth loading={submitting}>
          Send Recovery Link
        </Button>
        <Button style="ghost" fullWidth onClick={onBackToLogin}>
          Return to Login
        </Button>
      </div>
    </form>
  );
}