"use server"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import connectDB from "@/lib/db"
import { getAuthenticatedUser } from "@/lib/auth"
import { JOB_STATUSES, type JobStatus } from "@/lib/job-types"
import { signToken } from "@/lib/jwt"
import JobModel from "@/models/Job"
import UserModel from "@/models/User"

type LoginState = {
  error?: string
}
type SignUpState = {
  error?: string
}
type JobState = {
  error?: string
}

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState | null> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "All fields required" }
  }

  await connectDB()

  const user = await UserModel.findOne({ email })
  if (!user) {
    return { error: "Invalid credentials" }
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return { error: "Invalid credentials" }
  }

  const token = await signToken({
    id: user._id.toString(),
    email: user.email,
  })

  const cookieStore = await cookies()
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  })

  redirect("/dashboard")
}



export async function signUpAction(
  prevState: SignUpState | null,
  formData: FormData
): Promise<SignUpState | null> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  if (!email || !password || !name) {
    return { error: "All fields required" }
  }

  await connectDB()
  const existingUser = await UserModel.findOne({ email })
  if (existingUser) {
    return { error: "Email already in use" }
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new UserModel({
    email,
    password: hashedPassword,
    name,
  })
  await newUser.save()
  redirect("/api/auth/login")
} 


export async function logOutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  redirect("/api/auth/login")
}

export async function addJobAction(
  prevState: JobState | null,
  formData: FormData
): Promise<JobState | null> {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect("/api/auth/login")
  }

  const company = String(formData.get("company") ?? "").trim()
  const title = String(formData.get("title") ?? "").trim()
  const location = String(formData.get("location") ?? "").trim()
  const notes = String(formData.get("notes") ?? "").trim()
  const rawStatus = String(formData.get("status") ?? "wishlist")
  const status = JOB_STATUSES.includes(rawStatus as JobStatus)
    ? (rawStatus as JobStatus)
    : "wishlist"

  if (!company || !title) {
    return { error: "Company and role are required" }
  }

  await connectDB()

  await JobModel.create({
    userId: user.id,
    company,
    title,
    location,
    notes,
    status,
  })

  redirect("/dashboard")
}

export async function removeJobAction(formData: FormData) {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect("/api/auth/login")
  }

  const jobId = String(formData.get("jobId") ?? "")

  if (!jobId) {
    redirect("/dashboard")
  }

  await connectDB()

  await JobModel.findOneAndDelete({
    _id: jobId,
    userId: user.id,
  })

  redirect("/dashboard")
}

export async function updateJobStatusAction(formData: FormData) {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect("/api/auth/login")
  }

  const jobId = String(formData.get("jobId") ?? "")
  const rawStatus = String(formData.get("status") ?? "wishlist")
  const status = JOB_STATUSES.includes(rawStatus as JobStatus)
    ? (rawStatus as JobStatus)
    : "wishlist"

  if (!jobId) {
    redirect("/dashboard")
  }

  await connectDB()

  await JobModel.findOneAndUpdate(
    { _id: jobId, userId: user.id },
    { status }
  )

  redirect("/dashboard")
}