"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  FormEvent,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/logo";
import AuthButton from "@/components/forms/button";
import FormHeading from "@/components/forms/heading";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

function OtpForm() {
  const params = useSearchParams();
  const emailParam = params.get("email") || "abcd***@server.com";

  const [values, setValues] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(60);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const code = useMemo(() => values.join(""), [values]);
  const canVerify = code.length === OTP_LENGTH && values.every((v) => v !== "");

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    // focus first input on mount for faster entry
    focusIndex(0);
    return () => clearInterval(id);
  }, []);

  function focusIndex(idx: number) {
    const el = inputs.current[idx];
    if (el) el.focus();
  }

  function onChange(idx: number, next: string) {
    const char = next.replace(/\D/g, "").slice(-1);
    setValues((prev) => {
      const copy = [...prev];
      copy[idx] = char;
      return copy;
    });
    if (char && idx < OTP_LENGTH - 1) focusIndex(idx + 1);
  }

  function onKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      e.preventDefault();
      focusIndex(idx - 1);
      setValues((prev) => {
        const copy = [...prev];
        copy[idx - 1] = "";
        return copy;
      });
    }
    if (e.key === "ArrowLeft" && idx > 0) focusIndex(idx - 1);
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) focusIndex(idx + 1);
  }

  function onPaste(idx: number, e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    if (!text) return;
    const digits = text.replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!digits) return;
    e.preventDefault();
    const next = values.slice();
    for (let i = 0; i < OTP_LENGTH - idx; i++) {
      next[idx + i] = digits[i] ?? next[idx + i];
    }
    setValues(next);
    const last = Math.min(idx + digits.length, OTP_LENGTH - 1);
    focusIndex(last);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canVerify) return;
    // Hook up to your verification endpoint here
    // TODO: Implement OTP verification logic
  }

  return (
    <main className="min-h-svh w-full bg-light-bg/60 dark:bg-background flex items-start md:items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <section className="rounded-2xl py-8 px-12 border bg-card shadow-lg ring-0">
          <div className="space-y-6">
            <FormHeading title=" OTP verification">
              <p className="text-muted-foreground mt-1">
                A 6-digit code has been sent on your given email{" "}
                <span className="font-medium text-foreground">
                  {emailParam}
                </span>
                .
                <br className="hidden sm:block" /> Enter verification code
                below.
              </p>
            </FormHeading>

            <form
              onSubmit={onSubmit}
              className="space-y-6 flex flex-col justify-center items-center"
            >
              <div className="flex items-center gap-3">
                {values.map((val, i) => (
                  <Input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={val}
                    onChange={(e) => onChange(i, e.target.value)}
                    onKeyDown={(e) => onKeyDown(i, e)}
                    onPaste={(e) => onPaste(i, e)}
                    aria-label={`Digit ${i + 1}`}
                    className={cn(
                      "h-14 w-12 text-center text-lg tracking-widest font-medium rounded-md ",
                      val
                        ? "border-[#B3E2A7]"
                        : "focus:border focus:border-text-primary"
                    )}
                  />
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Code will resend in{" "}
                <span className="font-semibold text-foreground">
                  {seconds}s
                </span>
              </p>

              <AuthButton name="Verify" />
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function OtpVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpForm />
    </Suspense>
  );
}
