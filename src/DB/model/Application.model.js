import mongoose, { Schema, model, Types } from "mongoose";
import { statusTypes } from "../../utils/constants/const.enums.js"; 

const appSchema = new Schema(
  {
    jobId: { type: Types.ObjectId, ref: "job", required: true },
    userId: { type: Types.ObjectId, ref: "user", required: true }, 
    userCV: { 
      secure_url: { type: String, required: true }, 
      public_id: { type: String, required: true }  
    },
    status: {
      type: String,
      enum: Object.values(statusTypes),
      default: statusTypes.pending,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

appSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

export const Application = mongoose.models.Application || model("Application", appSchema);
export default Application;

