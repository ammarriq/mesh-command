"use client";

import { useState } from "react";
import Link from "next/link";

import { Eye } from "lucide-react";
import { GoogleIcon } from "@/icons/google";
import { AppleIcon } from "@/icons/apple";
import { MicrosoftIcon } from "@/icons/microsoft";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthInput from "@/components/forms/input";
import Logo from "@/components/shared/logo";
import AuthButton from "@/components/forms/button";
import FormHeading from "@/components/forms/heading";
import EyeSlashIcon from "@/icons/eye-slash";

const providers = ["google", "apple", "microsoft"] as const;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-svh w-full bg-Bg-Dark flex items-center justify-center px-4 py-6">
      <section className="flex flex-col gap-6 sm:gap-8 items-center ">
        <Logo />

        <form className="flex flex-col px-6 sm:px-12 py-8 gap-6 rounded-2xl border border-[#F5F5F5] shadow-[0_4px_44px_0_rgba(0,0,0,0.11)] max-w-md bg-white">
          <FormHeading title="Login">
            <p className="text-text-secondary text-sm">
              Enter your login details below to continue.
            </p>
          </FormHeading>

          <div className="flex flex-col gap-2 ">
            <AuthInput
              icon={"email"}
              label="Email"
              name="email"
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeHolder="Enter your email"
              required
            />

            <AuthInput
              icon="lock"
              label="Password"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeHolder="Enter your password"
              minLength={8}
              required
              endAdornment={
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? (
                    <Eye className="size-5 sm:size-6" />
                  ) : (
                    <EyeSlashIcon className="size-5 sm:size-6" />
                  )}
                </button>
              }
            />

            <Link
              href="/otp-verification"
              className="text-text-primary font-medium text-right"
            >
              Forgot your password?
            </Link>
          </div>

          <AuthButton name="Login" />

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-text-secondary">
            <Separator />
            <span className="text-xs ">or</span>
            <Separator />
          </div>

          <div className="space-y-4">
            {providers.map((provider) => (
              <OAuthButton key={provider} provider={provider} />
            ))}
          </div>
        </form>
      </section>
    </main>
  );
}

type Provider = "google" | "apple" | "microsoft";

function OAuthButton({ provider }: { provider: Provider }) {
  const label =
    provider === "google"
      ? "Continue with Google"
      : provider === "apple"
      ? "Continue with Apple"
      : "Continue with Microsoft";

  if (provider === "apple") {
    return (
      <Button
        type="button"
        className="w-full py-6 text-base gap-4 font-medium rounded-[10px] justify-center items-center bg-black text-white hover:bg-black/90 shadow-[0_0_3px_0_rgba(0,0,0,0.08),_0_2px_3px_0_rgba(0,0,0,0.17)]"
      >
        <AppleIcon className="size-6" aria-hidden />
        {label}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      className="w-full py-6 text-base gap-4 font-medium rounded-[10px] justify-center items-center shadow-md bg-white hover:bg-white/80"
    >
      {provider === "google" ? (
        <GoogleIcon className="size-6" aria-hidden />
      ) : (
        <MicrosoftIcon />
      )}
      {label}
    </Button>
  );
}
