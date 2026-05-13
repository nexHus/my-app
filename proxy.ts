import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

const protectedRoutes = [ "/settings"]

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  const verified = verifyToken(token)

  if (!verified) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  return NextResponse.next()
}