"use client";

import {
  ForgotPasswordFormData,
  initialForgotPasswordFormData,
} from "@/components/forms/authForm/form";
import { forgotPasswordSchema } from "@/components/forms/authForm/schema";
import { ForgotPasswordProps } from "@/components/forms/authForm/types";
import Input from "@/components/forms/input";
import Button from "@/components/ui/button";
import { requestPasswordReset } from "@/lib/actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: initialForgotPasswordFormData,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const result = await requestPasswordReset(data.email);

      if (result.success) {
        setSuccess(true);
        toast.success("Correo enviado correctamente");
      } else {
        toast.error(result.error || "Algo salió mal");
      }
    } catch (err) {
      toast.error("Error de conexión");
    } finally {
      setSubmitting(false);
    }
  });

  if (success) {
    return (
      <div className="p-8 border border-solid rounded-xl border-platinum bg-white w-full max-w-lg flex flex-col gap-4">
        <p className="text-preset-3 text-oxford text-center">
                    An email with instructions has been sent to your address.
                    Please check your inbox.
        </p>
        <Button onClick={onBackToLogin} style="secondary" fullWidth>
                    Return to Login
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="p-8 border border-solid rounded-xl border-platinum bg-white w-full max-w-lg flex flex-col gap-4"
    >
      <h2 className="text-preset-3-bolder text-center text-oxford">
                Password Recovery
      </h2>
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
        <Button
          type="submit"
          disabled={submitting}
          fullWidth
          loading={submitting}
        >
                    Send Recovery Link
        </Button>
        <Button style="ghost" fullWidth onClick={onBackToLogin}>
                    Return to Login
        </Button>
      </div>
    </form>
  );
}
