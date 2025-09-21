"use client";

import { useMemo, useState, FormEvent } from "react";

import Logo from "@/components/shared/logo";
import { Lock, Eye, EyeOff } from "lucide-react";
import AuthInput from "@/components/forms/input";
import AuthButton from "@/components/forms/button";
import FormHeading from "@/components/forms/heading";

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export default function NewPasswordPage() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  const valid = useMemo(() => PASSWORD_PATTERN.test(p1), [p1]);
  const match = p1.length > 0 && p1 === p2;
  const canSubmit = valid && match;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    // TODO: Implement password reset logic
  }

  return (
    <main className="min-h-svh w-full bg-light-bg/60 dark:bg-background flex items-start md:items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <section className="rounded-2xl max-w-md py-8 px-12 border bg-card shadow-lg ring-0">
          <div className="space-y-6">
            <FormHeading title="Create new password">
              <p className="text-text-secondary text-sm">
                Your new password must consist of 8 characters, one upper case,
                one lower case, one special case, and one numerical case.
              </p>
            </FormHeading>

            <form noValidate onSubmit={onSubmit} className="space-y-2">
              <div>
                <AuthInput
                  Icon={Lock}
                  label="Enter your password"
                  id="password"
                  name="password"
                  type={show1 ? "text" : "password"}
                  autoComplete="new-password"
                  placeHolder="Enter your password"
                  required
                  minLength={8}
                  aria-invalid={p1.length > 0 && !valid}
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                  endAdornment={
                    <button
                      type="button"
                      aria-label={show1 ? "Hide password" : "Show password"}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShow1((v) => !v)}
                    >
                      {show1 ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  }
                />
              </div>

              <div>
                <AuthInput
                  Icon={Lock}
                  label="Retype your password"
                  id="confirm"
                  name="confirm"
                  type={show2 ? "text" : "password"}
                  autoComplete="new-password"
                  placeHolder="Retype your password"
                  required
                  minLength={8}
                  aria-invalid={p2.length > 0 && !match}
                  value={p2}
                  onChange={(e) => setP2(e.target.value)}
                  endAdornment={
                    <button
                      type="button"
                      aria-label={show2 ? "Hide password" : "Show password"}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShow2((v) => !v)}
                    >
                      {show2 ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  }
                />
              </div>
              <div className="mt-6">
                <AuthButton name="Create Password" disabled={!canSubmit} />
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
