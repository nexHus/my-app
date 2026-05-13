// src/lib/jwt.ts

import { jwtVerify, SignJWT } from "jose"

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
)

export async function signToken(payload: {
  id: string
  email: string
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret)
}

export async function verifyToken(
  token: string
) {
  try {
    const { payload } = await jwtVerify(
      token,
      secret
    )

    return payload
  } catch {
    return null
  }
}