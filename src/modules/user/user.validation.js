import Joi from "joi";
import { generaFileds } from "../../middleware/validation.middleware.js";

export const updateAccount = Joi.object()
  .keys({
    username: generaFileds.username,
    DOB: generaFileds.DOB,
    gender: generaFileds.gender,
    mobileNumber: generaFileds.mobileNumber,
    address: generaFileds.address,
  })
  .required();

  export const updatePassword = Joi.object({
    oldpassword: generaFileds.oldpassword.required(),
    password: generaFileds.password.required(),
    confirmPassword:generaFileds.confirmPassword.required(),
  
  }).required();