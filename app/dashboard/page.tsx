import { redirect } from "next/navigation"

import DashboardBoard from "@/components/dashboard-board"
import { getAuthenticatedUser } from "@/lib/auth"
import connectDB from "@/lib/db"
import JobModel from "@/models/Job"
import UserModel from "@/models/User"

export default async function Dashboard() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect("/api/auth/login")
  }
  await connectDB()

  const [userData, jobs] = await Promise.all([
    UserModel.findById(user.id).lean(),
    JobModel.find({ userId: user.id }).sort({ createdAt: -1 }).lean(),
  ])

  if (!userData) {
    redirect("/api/auth/login")
  }

  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

  const normalizedJobs = jobs.map((job) => ({
    _id: job._id.toString(),
    company: job.company,
    title: job.title,
    location: job.location ?? null,
    notes: job.notes ?? null,
    status: job.status,
    createdAt: job.createdAt.toISOString(),
  }))

  const staleJobs = normalizedJobs.filter(
    (job) => new Date(job.createdAt) <= twoWeeksAgo
  )

  return (
    <DashboardBoard
      userName={userData.name}
      jobs={normalizedJobs}
      staleJobs={staleJobs}
    />
  )
}