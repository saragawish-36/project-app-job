import mongoose, { Schema, Types } from "mongoose";
import {
  levelTypes,
  locationTypes,
  workingTimeTypes,
} from "../../utils/constants/const.enums.js";

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  jobLocation: {
    type: String,
    enum: Object.values(locationTypes),
    default: locationTypes.remotely,
  },
  workingTime: {
    type: String,
    enum: Object.values(workingTimeTypes),
    default: workingTimeTypes.partTime,
  },
  seniorityLevel: {
    type: String,
    enum: Object.values(levelTypes),
    default: levelTypes.fresh,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  technicalSkills: {
    type: [String],
    required: true,
    validate: {
      validator: (values) => values.length > 0,
      message: "At least one technical Skills",
    },
  },
  softSkills: {
    type: [String],
    required: true,
    validate: {
      validator: (values) => values.length > 0,
      message: "At least one soft skill ",
    },
  },
  addedBy: { type: Types.ObjectId, ref: "user" },
  updatedBy: { type: Types.ObjectId, ref: "user" },
  closed: { type: Boolean, default: false },
  companyId: { type: Types.ObjectId, ref: "company", required: true },
}, 
{ timestamps: true  });

export const Job = mongoose.models.Job || model("Job", jobSchema);
export default Job;
