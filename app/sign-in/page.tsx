import Link from "next/link"

import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials below to sign in</p>
        </div>
        <SignInForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

