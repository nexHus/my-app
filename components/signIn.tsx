'use client'

import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { loginAction } from "@/lib/serverActions"

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:outline-none"

export default function SignInForm() {
  const [state, action, pending] = useActionState(loginAction, null)

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.15),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_28%),linear-gradient(180deg,#fffaf1_0%,#fff_48%,#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <section className="rounded-[2rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_28px_80px_-42px_rgba(15,23,42,0.6)] sm:px-8 sm:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
            JobTracker
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Sign in and pick up your pipeline where you left off.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
            Stay on top of interviews, follow-ups, and two-week resend reminders from any device.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
              <p className="text-sm font-medium text-white">Mobile friendly</p>
              <p className="mt-1 text-sm text-slate-300">Fast forms that stack cleanly on smaller screens.</p>
            </div>
            <div className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
              <p className="text-sm font-medium text-white">Focused workflow</p>
              <p className="mt-1 text-sm text-slate-300">Wishlist, applied, waiting, interview, and rejected.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Welcome back
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Sign in to your account
            </h2>
          </div>

          <form action={action} className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Email
              <input name="email" type="email" placeholder="you@example.com" className={fieldClass} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Password
              <input name="password" type="password" placeholder="Enter your password" className={fieldClass} />
            </label>

            {state?.error ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {state.error}
              </p>
            ) : null}

            <Button type="submit" className="h-11 rounded-full px-5 text-sm font-semibold" disabled={pending}>
              {pending ? "Signing in..." : "Sign in"}
            </Button>

            <p className="text-sm text-slate-500">
              New here?{" "}
              <Link href="/api/auth/signup" className="font-medium text-slate-950 underline underline-offset-4">
                Create an account
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}
