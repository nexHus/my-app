import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getAuthenticatedUser } from "@/lib/auth"
import { logOutAction } from "@/lib/serverActions"

export default async function NavBar() {
  const user = await getAuthenticatedUser()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-sm">
              JT
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                JobTracker
              </p>
              <p className="text-sm text-slate-500">
                {user ? `Welcome, ${user.email}` : "Track applications with clarity"}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            {user ? (
              <form action={logOutAction}>
                <Button type="submit" variant="destructive" className="rounded-full px-4">
                  Sign out
                </Button>
              </form>
            ) : (
              <Button asChild variant="ghost" className="rounded-full px-4">
                <Link href="/api/auth/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost" className="rounded-full px-5">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <form action={logOutAction} className="hidden sm:block">
                <Button type="submit" variant="destructive" className="rounded-full px-5">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="rounded-full px-5">
                <Link href="/api/auth/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-5">
                <Link href="/api/auth/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
