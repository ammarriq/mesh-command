import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { Eye } from "lucide-react"

import AuthButton from "@/components/forms/button"
import FormHeading from "@/components/forms/heading"
import AuthInput from "@/components/forms/input"
import Logo from "@/components/logo"
import EyeSlashIcon from "@/icons/eye-slash"

export const Route = createFileRoute("/_auth/new-password/")({
    component: RouteComponent,
})

function RouteComponent() {
    const [showPasswordOne, setShowPasswordOne] = useState(false)
    const [showPasswordTwo, setShowPasswordTwo] = useState(false)

    return (
        <main className="bg-Bg-Dark flex min-h-svh w-full items-center justify-center px-4 py-6">
            <section className="flex flex-col items-center gap-6 sm:gap-8">
                <Logo />

                <form className="flex max-w-md flex-col gap-6 rounded-2xl border border-[#F5F5F5] bg-white px-6 py-8 shadow-[0_4px_44px_0_rgba(0,0,0,0.11)] sm:px-12">
                    <FormHeading title="Create new password">
                        <p className="text-text-secondary text-sm">
                            Your new password must consist of 8 characters, one
                            upper case, one lower case, one special case, and
                            one numerical case.
                        </p>
                    </FormHeading>

                    <div className="flex flex-col gap-2">
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
                                        showPasswordOne
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() =>
                                        setShowPasswordOne((v) => !v)
                                    }
                                >
                                    {showPasswordOne ? (
                                        <Eye className="size-5 sm:size-6" />
                                    ) : (
                                        <EyeSlashIcon className="size-5 sm:size-6" />
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
                                        showPasswordTwo
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() =>
                                        setShowPasswordTwo((v) => !v)
                                    }
                                >
                                    {showPasswordTwo ? (
                                        <Eye className="size-5 sm:size-6" />
                                    ) : (
                                        <EyeSlashIcon className="size-5 sm:size-6" />
                                    )}
                                </button>
                            }
                        />
                    </div>
                    <AuthButton name="Create Password" />
                </form>
            </section>
        </main>
    )
}
