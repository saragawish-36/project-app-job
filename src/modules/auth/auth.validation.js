import Joi from "joi";
import { generaFileds } from "../../middleware/validation.middleware.js";

export const signUp = Joi.object({
  firstName: generaFileds.firstName.required(),
  lastName: generaFileds.lastName.required(),
  email: generaFileds.email.required(),
  password: generaFileds.password.required(),
  confirmPassword: generaFileds.confirmPassword.required(),
  mobileNumber: generaFileds.mobileNumber.required(),
  DOB: generaFileds.DOB.required(),
}).required();

export const confirmOtp = Joi.object({
  email: generaFileds.email.required(),
  code: generaFileds.code.required(),
  type: generaFileds.type.required(),
}).required();

export const login = Joi.object({
  email: generaFileds.email.required(),
  password: generaFileds.password.required(),
}).required();

export const forgotPassword = Joi.object({
  email: generaFileds.email.required(),
}).required();

export const resetPassword = Joi.object({
  email: generaFileds.email.required(),
  otp: generaFileds.otp.required(),
  password: generaFileds.password.required(),
  confirmPassword: generaFileds.confirmPassword.required(),
}).required();
