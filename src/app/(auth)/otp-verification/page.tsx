"use client";

import { useEffect, useRef, useState, Suspense } from "react";

import Logo from "@/components/shared/logo";
import AuthButton from "@/components/forms/button";
import FormHeading from "@/components/forms/heading";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

function OtpForm() {
  const [seconds, setSeconds] = useState(60);
  const [inputValues, setInputValues] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    focusIndex(0);
    return () => clearInterval(id);
  }, []);

  function focusIndex(idx: number) {
    const el = inputs.current[idx];
    if (el) el.focus();
  }

  function onChange(idx: number, newValue: string) {
    const char = newValue.replace(/\D/g, "").slice(-1); // should contain only one digit
    setInputValues((prev) => {
      const copy = [...prev];
      copy[idx] = char;
      return copy;
    });
    if (char && idx < OTP_LENGTH - 1) focusIndex(idx + 1);
  }

  function onKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !inputValues[idx] && idx > 0) {
      e.preventDefault();
      focusIndex(idx - 1);
      setInputValues((prev) => {
        const copy = [...prev];
        copy[idx - 1] = "";
        return copy;
      });
    }
    if (e.key === "ArrowLeft" && idx > 0) focusIndex(idx - 1);
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) focusIndex(idx + 1);
  }

  function onPaste(idx: number, e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const text = e.clipboardData.getData("text");
    if (!text) return;

    const digits = text.replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!digits) return;

    const next = inputValues.slice();
    for (let i = 0; i < OTP_LENGTH - idx; i++) {
      next[idx + i] = digits[i] ?? next[idx + i];
    }
    setInputValues(next);
    const last = Math.min(idx + digits.length, OTP_LENGTH - 1);
    focusIndex(last);
  }

  return (
    <main className="min-h-svh w-full bg-Bg-Dark flex items-center justify-center px-4 py-6">
      <section className="flex flex-col gap-8 items-center ">
        <Logo />

        <form className="flex flex-col px-6 sm:px-12 py-8 gap-6 rounded-2xl border border-[#F5F5F5] shadow-[0_4px_44px_0_rgba(0,0,0,0.11)] bg-white">
          <div className="space-y-6">
            <FormHeading title="OTP verification">
              <p className="text-text-secondary text-sm">
                A 6-digit code has been sent on your given email{" "}
                <span className="font-medium text-foreground">
                  hello@boss.com
                </span>
                .
                <br className="hidden sm:block" /> Enter verification code
                below.
              </p>
            </FormHeading>

            <div className="space-y-6 flex flex-col justify-center items-center">
              <div className="flex items-center gap-3">
                {inputValues.map((val, i) => (
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
                      "h-10 sm:h-14 w-10 sm:w-12 text-center text-lg tracking-widest font-medium rounded-md ",
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
            </div>
          </div>
        </form>
      </section>
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
