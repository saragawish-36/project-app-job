import * as dbService from "../../../DB/db.services.js";
import User from "../../../DB/model/User.model.js";
import {
  otpTypes,
  providerType,
  rolesType,
} from "../../../utils/constants/const.enums.js";
import { emailEMitter } from "../../../utils/email/email.event.js";
import { successRequest } from "../../../utils/response/success.response.js";
import { verifyGoogleToken } from "../../../utils/security/googleAuth.js";
import {
  compareHash,
  generateOtpAndHash,
} from "../../../utils/security/hash.security.js";
import { generateToken } from "../../../utils/security/token.security.js";
import "./../../../utils/cleanup/otpcleanup.js";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, DOB } = req.body;

  if (
    await dbService.findOne({
      model: User,
      filter: { email },
    })
  ) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const { plainOtp, hashOtp } = generateOtpAndHash();

  const newUser = await dbService.create({
    model: User,
    data: {
      ...req.body,
      otp: [
        {
          code: hashOtp,
          type: otpTypes.confirmEmail,
          expiresIn: new Date(Date.now() + 30 * 60 * 1000),
        },
      ],
    },
  });

  emailEMitter.emit("sendConfirmEmail", { id: newUser._id, email });
  return successRequest({
    res,
    message: `Process is success ,Please verify your email `,
    status: 201,
  });
};

export const confirmOTP = async (req, res) => {
  const { email, code } = req.body;
  const user = await dataServices.findOne({
    model: User,
    fliter: { email },
  });
  if (!user) return next(new Error("in valid account", { cause: 404 }));
  if (user.confirmEmail)
    return next(new Error("Alredy verified", { cause: 409 }));
  if (!compare({ plainText: code, hash: user.confirmEmailOtp }))
    return next(new Error("in valid code", { cause: 400 }));
  await dataServices.updateOne({
    model: User,
    filter: { email },
    update: { confirmEmail: true, $unset: { confirmEmailOtp: 0 } },
  });
  return successRequest({
    res,
  });
};

export const signupWithGoogle = async (req, res, next) => {
  const { idToken } = req.body;
  const payload = await verifyGoogleToken(idToken);
  let user = await dbService.findOne({
    model: User,
    filter: { email: payload.email },
  });
  if (user) {
    return next(new Error("User already exists ", { cause: 404 }));
  }
  const { plainOtp, hashOtp } = generateOtpAndHash();
  user = await dbService.create({
    model: User,
    data: {
      username: payload.name,
      email: payload.email,
      confirmemail: payload.email_verified,
      image: payload.picture,
      provider: providerType.google,
      otp: [
        {
          code: hashOtp,
          type: otpTypes.confirmEmail,
          expiresIn: new Date(Date.now() + 30 * 60 * 1000),
        },
      ],
    },
  });

  if (user.provider != providerType.google)
    return next(new Error("In-valid provider", { cause: 404 }));
  const access_token = generateToken({
    payload: { id: user._id, email: user.email },
    signature:
      user.role === rolesType.admin
        ? process.env.ADMIN_ACCESS_TOKEN
        : process.env.USER_REFRASH_TOKEN,
  });
  emailEMitter.emit("sendConfirmEmail", { id: user._id, email });
  const refresh_token = generateToken({
    payload: { id: user._id, email: user.email },
    signature:
      user.role === rolesType.admin
        ? process.env.ADMIN_REFRASH_TOKEN
        : process.env.USER_REFRASH_TOKEN,
    expiresIn: "7d",
  });
  return successRequest({
    res,
    data: { token: { access_token, refresh_token } },
  });
};
