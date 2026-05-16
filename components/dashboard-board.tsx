"use client"

import { useActionState, useMemo, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { addJobAction, removeJobAction } from "@/lib/serverActions"
import { JOB_STATUSES, type JobStatus } from "@/lib/job-types"
import { cn } from "@/lib/utils"

type JobRecord = {
  _id: string
  company: string
  title: string
  location?: string | null
  notes?: string | null
  status: JobStatus
  createdAt: string
}

type DashboardBoardProps = {
  userName: string
  jobs: JobRecord[]
  staleJobs: JobRecord[]
}

type TabKey = JobStatus | "resend"

const tabs: Array<{ key: TabKey; label: string; description: string }> = [
  { key: "wishlist", label: "Wishlist", description: "Jobs you want to keep" },
  { key: "applied", label: "Applied", description: "Applications already sent" },
  { key: "waiting", label: "Waiting", description: "Replies and follow-ups" },
  { key: "interview call", label: "Interview Call", description: "Phone and interview stages" },
  { key: "rejected", label: "Rejected", description: "Closed or declined roles" },
  { key: "resend", label: "Resend", description: "Older than two weeks" },
]

const statusStyles: Record<JobStatus, string> = {
  wishlist: "bg-amber-50 text-amber-800 ring-amber-200",
  applied: "bg-sky-50 text-sky-800 ring-sky-200",
  waiting: "bg-violet-50 text-violet-800 ring-violet-200",
  "interview call": "bg-emerald-50 text-emerald-800 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-800 ring-rose-200",
}

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:outline-none"

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

export default function DashboardBoard({
  userName,
  jobs,
  staleJobs,
}: DashboardBoardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("wishlist")
  const [state, action, pending] = useActionState(addJobAction, null)

  const counts = useMemo(
    () =>
      JOB_STATUSES.reduce(
        (accumulator, status) => ({
          ...accumulator,
          [status]: jobs.filter((job) => job.status === status).length,
        }),
        {} as Record<JobStatus, number>
      ),
    [jobs]
  )

  const activeJobs =
    activeTab === "resend"
      ? staleJobs
      : jobs.filter((job) => job.status === activeTab)

  return (
    <main className="relative isolate flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_25%),linear-gradient(180deg,#fffaf1_0%,#fff_38%,#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-10">
        <section className="grid gap-4 rounded-[2rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_22px_80px_-40px_rgba(15,23,42,0.28)] backdrop-blur sm:p-7 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Welcome back, {userName}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Track every job in one place, move applications through your workflow, and keep older roles in the resend tab when they cross the two-week mark.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            <StatCard label="Total" value={jobs.length} />
            <StatCard label="Wishlist" value={counts.wishlist} />
            <StatCard label="Active" value={counts.applied + counts.waiting + counts["interview call"]} />
            <StatCard label="Resend" value={staleJobs.length} />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Add a job query
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                Save new roles in seconds
              </h2>
            </div>

            <form action={action} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company">
                  <input
                    name="company"
                    placeholder="Acme Inc."
                    className={fieldClass}
                  />
                </Field>
                <Field label="Role">
                  <input
                    name="title"
                    placeholder="Product Designer"
                    className={fieldClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Location">
                  <input
                    name="location"
                    placeholder="Remote or City"
                    className={fieldClass}
                  />
                </Field>
                <Field label="Status">
                  <select
                    name="status"
                    className={fieldClass}
                    defaultValue="wishlist"
                  >
                    {JOB_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Notes">
                <textarea
                  name="notes"
                  placeholder="Referral contact, application link, follow-up reminder..."
                  className={cn(fieldClass, "min-h-28 resize-y")}
                />
              </Field>

              {state?.error ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {state.error}
                </p>
              ) : null}

              <Button
                type="submit"
                className="h-11 rounded-full px-5 text-sm font-semibold"
                disabled={pending}
              >
                {pending ? "Saving..." : "Add job"}
              </Button>
            </form>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-wrap gap-2 overflow-x-auto pb-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "min-w-28 rounded-full px-4 py-2 text-left text-sm font-medium transition",
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    <span className="block text-sm">{tab.label}</span>
                    <span
                      className={cn(
                        "block text-[11px]",
                        isActive ? "text-white/70" : "text-slate-500"
                      )}
                    >
                      {tab.description}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="grid gap-3">
              {activeJobs.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
                  No jobs in this tab yet.
                </div>
              ) : (
                activeJobs.map((job) => (
                  <article
                    key={job._id}
                    className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.35)]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-semibold ring-1",
                              statusStyles[job.status]
                            )}
                          >
                            {job.status}
                          </span>
                          <span className="text-xs text-slate-500">
                            Added {formatDate(job.createdAt)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-950">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {job.company}
                          {job.location ? ` • ${job.location}` : ""}
                        </p>
                        {job.notes ? (
                          <p className="max-w-2xl text-sm leading-6 text-slate-500">
                            {job.notes}
                          </p>
                        ) : null}
                      </div>

                      <form action={removeJobAction}>
                        <input type="hidden" name="jobId" value={job._id} />
                        <Button
                          type="submit"
                          variant={activeTab === "resend" ? "default" : "outline"}
                          className="h-10 rounded-full px-4 text-sm"
                        >
                          {activeTab === "resend" ? "Resent done" : "Remove"}
                        </Button>
                      </form>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      {children}
    </label>
  )
}