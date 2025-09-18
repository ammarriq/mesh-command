"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/shared/logo";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthInput from "@/components/forms/input";
import { GoogleIcon } from "@/icons/google";
import { AppleIcon } from "@/icons/apple";
import AuthButton from "@/components/forms/button";
import FormHeading from "@/components/forms/heading";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    // Never log passwords in production; this is placeholder wiring only.
    console.log("login submit", { email });
  }

  return (
    <main className="min-h-svh w-full bg-light-bg/60 dark:bg-background flex items-start md:items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <section className="rounded-2xl  max-w-md py-8 px-12 border bg-card shadow-lg ring-0">
          <div className="space-y-6">
            <FormHeading title="Login">
              <p className="text-text-secondary text-sm">
                Enter your login details below to continue.
              </p>
            </FormHeading>

            <form noValidate onSubmit={onSubmit} className="space-y-2">
              <div>
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
              </div>

              <div>
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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
              </div>

              <AuthButton name="Login" />
            </form>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-text-secondary">
              <Separator />
              <span className="px-2">or</span>
              <Separator />
            </div>

            <div className="space-y-3">
              <OAuthButton provider="microsoft" />
              <OAuthButton provider="apple" />
              <OAuthButton provider="google" />
            </div>
          </div>
        </section>
      </div>
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
        <WindowsGlyph />
      )}
      {label}
    </Button>
  );
}

function WindowsGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M3 4.5L11 3v8H3V4.5zM12.5 3l8.5-1.2v9.2h-8.5V3zM11 13v8l-8-.9V13h8zm1.5 0H21v8.5l-8.5-1.2V13z" />
    </svg>
  );
}
