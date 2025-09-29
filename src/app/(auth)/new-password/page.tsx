"use client";

import { useState } from "react";

import { Lock, Eye, EyeOff } from "lucide-react";

import Logo from "@/components/shared/logo";
import AuthInput from "@/components/forms/input";
import AuthButton from "@/components/forms/button";
import FormHeading from "@/components/forms/heading";

export default function NewPasswordPage() {
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  return (
    <main className="min-h-svh w-full bg-light-bg/60 flex items-start md:items-center justify-center px-4 py-8">
      <section className="w-full max-w-md space-y-8">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <section className="rounded-2xl max-w-md py-8 px-12 border bg-card shadow-lg ring-0 space-y-6">
          <FormHeading title="Create new password">
            <p className="text-text-secondary text-sm">
              Your new password must consist of 8 characters, one upper case,
              one lower case, one special case, and one numerical case.
            </p>
          </FormHeading>

          <form className="space-y-2">
            <AuthInput
              Icon={Lock}
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
                    <Eye className="size-4" />
                  )}
                </button>
              }
            />

            <AuthInput
              Icon={Lock}
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
            <div className="mt-6">
              <AuthButton name="Create Password" />
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}
