"use client";

import AuthForm from "@/components/forms/authForm";
import { useState } from "react";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const title = isSignIn ? "Welcome back!" : "Join Stellium Study";
  const subtitle = isSignIn
    ? "Sign in to continue your academic journey."
    : "Sign up to start your academic adventure.";
  return (
    <div className="flex flex-col items-center px-4 gap-16">
      <div className="flex flex-col items-center gap-6 max-w-2xl w-full text-center">
        <h1 className="text-preset-1 text-oxford">
          {title}
        </h1>
        <p className="text-preset-3 text-oxford">
          {subtitle}
        </p>
      </div>
      <AuthForm isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
    </div>
  );
}

