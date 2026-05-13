// src/app/dashboard/page.tsx

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { verifyToken } from "@/lib/jwt"

export default async function Dashboard() {
  const cookieStore = await cookies()

  const token =
    cookieStore.get("token")?.value

  if (!token) {
    redirect("/login")
  }

  const user = await verifyToken(
    token
  )

  if (!user) {
    redirect("/login")
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Welcome {user.email}
      </p>
    </div>
  )
}