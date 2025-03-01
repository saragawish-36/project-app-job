import mongoose, { model, Schema, Types } from "mongoose";
import { employeeRanges } from "../../utils/constants/const.enums.js";

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      uneqe: [true, "Every company must have a distinctive name"],
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfEmployees: {
      type: Number,
      required: true,
      enum: Object.values(employeeRanges),
      default: employeeRanges.large,
    },
    companyEmail: {
      type: String,
      required: true,
      lowercase: true,
      uneqe: [true, "email is exist"],
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    CreatedBy: { type: Types.ObjectId, ref: "user" },
    Logo: { secure_url: String, public_id: String },
    coverPic: { secure_url: String, public_id: String },
    HRs: [{ type: Types.ObjectId, ref: "user" }],
    deletedAt: Date,
    isDeleted: { type: Boolean, default: false },
    bannedAt: Date,
    legalAttachment: { secure_url: String, public_id: String },
    approvedByAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
companySchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "companyId",
});

export const Company =
  mongoose.models.Company || model("Company", companySchema);
export default Company;
