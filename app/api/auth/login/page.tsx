
import SignInForm from "@/components/signIn";
import { verifyToken } from "@/lib/jwt";
import { loginAction } from "@/lib/serverActions"
import { redirect } from "next/dist/client/components/redirect";
import { cookies } from "next/dist/server/request/cookies";
export default async function LoginPage() {
  // const cookieStore = await cookies()

  // const token =
  //   cookieStore.get("token")?.value

  // if (!token) {
  //   redirect("/api/auth/login")
  // }

  // const user = await verifyToken(
  //   token
  // )
  // if (!user) {
  //   redirect("/api/auth/login")
  // }
  // else {
  //   redirect("/dashboard")
  // }
  return (
    <SignInForm/>
  )
}