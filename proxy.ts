// src/proxy.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import { verifyToken } from "@/lib/jwt"

export async function proxy(
  req: NextRequest
) {
  const token =
    req.cookies.get("token")?.value

  const protectedRoutes = [
    "/dashboard",
  ]

  const isProtected =
    protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(
        route
      )
    )

  if (!isProtected) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  const verified = await verifyToken(
    token
  )

  if (!verified) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  return NextResponse.next()
}