"use client";

import { useState } from "react";
import Link from "next/link";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GoogleIcon } from "@/icons/google";
import { AppleIcon } from "@/icons/apple";
import { MicrosoftIcon } from "@/icons/microsoft";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthInput from "@/components/forms/input";
import Logo from "@/components/shared/logo";
import AuthButton from "@/components/forms/button";
import FormHeading from "@/components/forms/heading";

const providers = ["google", "apple", "microsoft"] as const;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-svh w-full bg-light-bg/60 flex items-start md:items-center justify-center px-4 py-8">
      <section className="w-full max-w-md space-y-8">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-2xl max-w-md py-8 px-12 border bg-card shadow-lg ring-0 space-y-6">
          <FormHeading title="Login">
            <p className="text-text-secondary text-sm">
              Enter your login details below to continue.
            </p>
          </FormHeading>

          <form className="space-y-2">
            <AuthInput
              Icon={Mail}
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
              Icon={Lock}
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
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              }
            />
            <div className="mt-2 text-right">
              <Link
                href="/otp-verification"
                className="text-text-primary font-medium "
              >
                Forgot your password?
              </Link>
            </div>

            <AuthButton name="Login" />
          </form>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-text-secondary">
            <Separator />
            <span className="px-2">or</span>
            <Separator />
          </div>

          <div className="space-y-3">
            {providers.map((provider) => (
              <OAuthButton key={provider} provider={provider} />
            ))}
          </div>
        </div>
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
        className="w-full py-6 text-base gap-4 font-medium rounded-[10px] justify-center items-center bg-black text-white hover:bg-black/90 shadow-md"
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
