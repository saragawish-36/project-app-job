import mongoose, { model, Schema, Types } from "mongoose";
import {
  genderType,
  otpTypes,
  providerType,
  rolesType,
} from "../../utils/constants/const.enums.js";
import { generateHash } from "../../utils/security/hash.security.js";
import { decrypt, encrypt } from "../../utils/security/encrpt.security.js";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    },
    provider: {
      type: String,
      enum: Object.values(providerType),
      default: providerType.system,
    },
    gender: {
      type: String,
      enum: Object.values(genderType),
      required: true,
      default: genderType.female,
    },
    DOB: {
      type: Date,
      validate: {
        validator: function (value) {
          const age = new Date().getFullYear() - value.getFullYear();
          return age >= 18;
        },
        message: "User must be at least 18 years old.",
      },
    },
    mobileNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(rolesType),
      required: true,
      default: rolesType.user,
    },
    isConfirmed: { type: Boolean, default: false },
    confirmEmailOtp: String,
    isloggedIn: {
      type: Boolean,
      default: false,
    },
    freezed: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    isDeleted: { type: Boolean, default: false },
    bannedAt: Date,
    updatedBy: { type: Types.ObjectId, ref: "user" },
    changeCredentialTime: Date,
    profilePic: { secure_url: String, public_id: String },
    coverPic: { secure_url: String, public_id: String },
    otp: [
      {
        code: { type: String, required: true },
        type: {
          type: String,
          enum: Object.values(otpTypes),
          required: true,
          default: otpTypes.confirmEmail,
        },
        expiresIn: { type: Date, required: true, index: { expires: 600 } },
      },
    ],
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = generateHash({ plainText: this.password });
  }
  if (this.isModified("mobileNumber")) {
    this.mobileNumber = encrypt({ plainText: this.mobileNumber });
  }
  next();
});
// userSchema.path("mobileNumber").get(function (value) {
//   return value ? decrypt({ cipherText: value }) : value;
// });
userSchema
  .virtual("username")
  .set(function (value) {
    const parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1] || "";
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

export const User = mongoose.models.User || model("User", userSchema);
export default User;
