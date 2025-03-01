import { EventEmitter } from "events";
import { customAlphabet } from "nanoid";
import { generateHash } from "../security/hash.security.js";
import * as dbService from "../../DB/db.services.js";
import User from "../../DB/model/User.model.js";
import { otpTypes, statusTypes } from "../constants/const.enums.js";
import { form } from "../views/formEmail.js";
import sendEmails from "./sendEmail.js";
import Application from "../../DB/model/Application.model.js";
import { message } from "../views/statusEmail.js";

export const emailEMitter = new EventEmitter();

export const sendCode = async ({ data = {}, subject } = {}) => {
  const { id, email } = data;
  if (!subject) throw new Error("OTP subject is required");

  const otp = customAlphabet("0123456789", 6)(); 
  const hashOtp = generateHash({ plainText: otp });

  let updateData = {
    $push: {
      otp: {
        code: hashOtp,
        type: subject,
        expiresIn: new Date(Date.now() + 10 * 60 * 1000), 
      },
    },
  };

  switch (subject) {
    case otpTypes.confirmEmail:
      updateData = { confirmEmailOtp: hashOtp };
      break;
    case otpTypes.restPassword: 
      updateData = { resetPasswordOtp: hashOtp };
      break;
    default:
      throw new Error("Invalid OTP type");
  }

  await dbService.updateOne({
    model: User,
    filter: { _id: id },
    data: {updateData},
  });

  const html = form({ code: otp });

  await sendEmails({
    to: email,
    subject,
    html,
  });
};


emailEMitter.on("sendconfirmEmail", async (data) => {
  await sendCode({ data, subject: otpTypes.confirmEmail });
});

emailEMitter.on("forgotPassword", async (data) => {
  await sendCode({ data, subject: otpTypes.restPassword }); 
});

export const sendApplicationStatus = async ({ data = {}, subject } = {}) => {
  const { id, email, name } = data;
  if (!subject) throw new Error("Application status is required");

  let updateData = {};

  switch (subject) {
    case statusTypes.pending:
      updateData = { status: statusTypes.pending };
      break;
    case statusTypes.accepted:
      updateData = { status: statusTypes.accepted };
      break;
    case statusTypes.rejected:
      updateData = { status: statusTypes.rejected };
      break;
    default:
      throw new Error("Invalid application status");
  }

  await dbService.updateOne({
    model: Application,
    filter: { _id: id },
    data: updateData,
  });


  const html = message({name: username})

  await sendEmails({
    to: email,
    subject,
    html,
  });
};

emailEMitter.on("applicationPending", async (data) => {
  await sendApplicationStatus({ data, subject: statusTypes.pending });
});

emailEMitter.on("applicationAccepted", async (data) => {
  await sendApplicationStatus({ data, subject: statusTypes.accepted });
});

emailEMitter.on("applicationRejected", async (data) => {
  await sendApplicationStatus({ data, subject: statusTypes.rejected });
});


