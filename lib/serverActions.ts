// src/actions/auth.ts

"use server"

import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { signToken } from "@/lib/jwt"

type LoginState = {
  error?: string
}

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState | null> {
  const email = formData.get(
    "email"
  ) as string

  const password = formData.get(
    "password"
  ) as string

  if (!email || !password) {
    return {
      error: "All fields required",
    }
  }

  // Example database user
  const user = {
    id: "1",
    email: "test@test.com",

    // password = 123456
    password:
      "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  }

  // check email
  if (email !== user.email) {
    return {
      error: "Invalid credentials",
    }
  }

  // check password
  const validPassword =
    await bcrypt.compare(
      password,
      user.password
    )

  if (!validPassword) {
    return {
      error: "Invalid credentials",
    }
  }

  // create jwt
  const token = await signToken({
    id: user.id,
    email: user.email,
  })

  // store cookie
  const cookieStore = await cookies()

  cookieStore.set("token", token, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  })

  redirect("/dashboard")
}