import { useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"

import { Eye } from "lucide-react"

import AuthButton from "@/components/forms/button"
import FormHeading from "@/components/forms/heading"
import AuthInput from "@/components/forms/input"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AppleIcon } from "@/icons/apple"
import EyeSlashIcon from "@/icons/eye-slash"
import { GoogleIcon } from "@/icons/google"
import { MicrosoftIcon } from "@/icons/microsoft"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/")({
    component: RouteComponent,
})

const providers = ["google", "apple", "microsoft"] as const

function OAuthButton({ provider }: { provider: (typeof providers)[number] }) {
    const label = {
        google: "Continue with Google",
        apple: "Continue with Apple",
        microsoft: "Continue with Microsoft",
    }

    const icons = {
        google: <GoogleIcon className="size-6" aria-hidden />,
        apple: <AppleIcon className="size-6" aria-hidden />,
        microsoft: <MicrosoftIcon />,
    }

    return (
        <Button
            type="button"
            className={cn(
                "w-full items-center justify-center gap-4 rounded-[10px] py-6 text-base font-medium shadow-[0_2px_4px_0_rgba(0,0,0,0.11),0_-1px_3px_0px_rgba(0,0,0,0.05)]",
                provider === "apple"
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-white text-black hover:bg-white",
            )}
        >
            {icons[provider]}
            {label[provider]}
        </Button>
    )
}

function RouteComponent() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <main className="bg-Bg-Dark flex min-h-svh w-full items-center justify-center px-4 py-6">
            <section className="flex flex-col items-center gap-6 sm:gap-8">
                <Logo />

                <form className="flex max-w-md flex-col gap-6 rounded-2xl border border-[#F5F5F5] bg-white px-6 py-8 shadow-[0_4px_44px_0_rgba(0,0,0,0.11)] sm:px-12">
                    <FormHeading title="Login">
                        <p className="text-text-secondary text-sm">
                            Enter your login details below to continue.
                        </p>
                    </FormHeading>

                    <div className="flex flex-col gap-2">
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
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
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
                            to="/otp-verification"
                            className="text-text-primary text-right font-medium"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <AuthButton name="Login" />

                    <div className="text-text-secondary grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <Separator />
                        <span className="text-xs">or</span>
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
    )
}
