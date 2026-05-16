import { Schema, model, models, Types } from "mongoose"

import { JOB_STATUSES, type JobStatus } from "@/lib/job-types"

export interface IJob {
  userId: Types.ObjectId
  company: string
  title: string
  location?: string
  notes?: string
  status: JobStatus
}

const JobSchema = new Schema<IJob>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: JOB_STATUSES,
      default: "wishlist",
    },
  },
  {
    timestamps: true,
  }
)

const JobModel = models.Job || model<IJob>("Job", JobSchema)

export default JobModel