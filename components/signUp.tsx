'use client'

import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { signUpAction } from "@/lib/serverActions"

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:outline-none"

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signUpAction, null)

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.14),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#fff_48%,#fff7ed_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <section className="order-2 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:order-1">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Create account
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Start tracking every application
            </h2>
          </div>

          <form action={action} className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Email
              <input name="email" type="email" placeholder="you@example.com" className={fieldClass} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Name
              <input name="name" type="text" placeholder="Your name" className={fieldClass} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Password
              <input name="password" type="password" placeholder="Create a secure password" className={fieldClass} />
            </label>

            {state?.error ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {state.error}
              </p>
            ) : null}

            <Button type="submit" className="h-11 rounded-full px-5 text-sm font-semibold" disabled={pending}>
              {pending ? "Signing up..." : "Sign up"}
            </Button>

            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/api/auth/login" className="font-medium text-slate-950 underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </form>
        </section>

        <section className="order-1 rounded-[2rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_28px_80px_-42px_rgba(15,23,42,0.6)] sm:px-8 sm:py-10 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
            JobTracker
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Build a job board that stays easy to scan on mobile.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
            Save roles, move them across your pipeline, and revisit stale applications when it is time to follow up again.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
              <p className="text-sm font-medium text-white">Quick sign up</p>
              <p className="mt-1 text-sm text-slate-300">Only the fields you need to get started.</p>
            </div>
            <div className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
              <p className="text-sm font-medium text-white">Clear follow-up flow</p>
              <p className="mt-1 text-sm text-slate-300">Older jobs are moved into the resend tab automatically.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
