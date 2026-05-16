export const JOB_STATUSES = [
  "wishlist",
  "applied",
  "waiting",
  "interview call",
  "rejected",
] as const

export type JobStatus = (typeof JOB_STATUSES)[number]