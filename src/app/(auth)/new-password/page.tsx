"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import Logo from "@/components/shared/logo";
import AuthInput from "@/components/forms/input";
import AuthButton from "@/components/forms/button";
import FormHeading from "@/components/forms/heading";
import EyeSlashIcon from "@/icons/eye-slash";

export default function NewPasswordPage() {
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  return (
    <main className="min-h-svh w-full bg-Bg-Dark flex items-center justify-center px-4 py-6">
      <section className="flex flex-col gap-8 items-center ">
        <Logo />

        <form className="flex flex-col px-6 sm:px-12 py-8 gap-6 rounded-2xl border border-[#F5F5F5] shadow-[0_4px_44px_0_rgba(0,0,0,0.11)] max-w-md bg-white">
          <FormHeading title="Create new password">
            <p className="text-text-secondary text-sm">
              Your new password must consist of 8 characters, one upper case,
              one lower case, one special case, and one numerical case.
            </p>
          </FormHeading>

          <div className="flex flex-col gap-2 ">
            <AuthInput
              icon={"lock"}
              label="Enter your password"
              id="password"
              name="password"
              type={showPasswordOne ? "text" : "password"}
              autoComplete="new-password"
              placeHolder="Enter your password"
              required
              minLength={8}
              endAdornment={
                <button
                  type="button"
                  aria-label={
                    showPasswordOne ? "Hide password" : "Show password"
                  }
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPasswordOne((v) => !v)}
                >
                  {showPasswordOne ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <EyeSlashIcon />
                  )}
                </button>
              }
            />

            <AuthInput
              icon={"lock"}
              label="Retype your password"
              id="confirm"
              name="confirm"
              type={showPasswordTwo ? "text" : "password"}
              autoComplete="new-password"
              placeHolder="Retype your password"
              required
              minLength={8}
              endAdornment={
                <button
                  type="button"
                  aria-label={
                    showPasswordTwo ? "Hide password" : "Show password"
                  }
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPasswordTwo((v) => !v)}
                >
                  {showPasswordTwo ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              }
            />
            <AuthButton name="Create Password" />
          </div>
        </form>
      </section>
    </main>
  );
}
