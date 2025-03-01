import Joi from "joi";
import { genderType, otpTypes } from "../utils/constants/const.enums.js";

export const isValidObjectId = (value, helper) => {
  if (Types.ObjectId.isValid(value)) return true;
  return helper.message("Invalid object ID");
};

const fileObject ={
  fieldname:Joi.string().valid("attachment"),
  originlname:Joi.string(),
  encoding:Joi.string(),
  mimerype:Joi.string(),
  finalPath:Joi.string(),
  destination:Joi.string(),
  filename:Joi.string(),
  path:Joi.string(),
  size:Joi.number(),
}

export const generaFileds = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
  password:Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  username: Joi.string().min(2).max(25).optional(),
  oldpassword: Joi.string().required(),
  code: Joi.string().required(),
  type: Joi.string().valid(otpTypes.confirmEmail).required(),
  id: Joi.string().custom(isValidObjectId),
  DOB: Joi.date().iso().less('now').required(),
  gender: Joi.string().valid(...Object.values(genderType)),
  address: Joi.string(),
  mobileNumber: Joi.string().pattern(/^(010|011|012)-\d{4}-\d{4}$/),
  tags: Joi.array().items(Joi.string().custom(isValidObjectId)).default([]),
  fileObject,
  file:Joi.object().keys(fileObject)
};
const validation = (Schema) => {
  return (req, res, next) => {
    const inputs = { ...req.body, ...req.query, ...req.params };
    if (req.file || req.files?.length) {
      inputs.file = req.file || req.files;
    }
    const result = Schema.validate(inputs, { abortEarly: false });

    if (result.error) {
      const messageList = result.error.details.map((obj) => obj.message);
      return next(new Error(messageList.join(","), { cause: 400 }));
    }
    return next();
  };
};

export default validation;
