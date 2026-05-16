import { cookies } from "next/headers"

import { verifyToken } from "@/lib/jwt"

export async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return null
  }

  const payload = await verifyToken(token)

  if (!payload || typeof payload.id !== "string") {
    return null
  }

  return payload as { id: string; email: string }
}