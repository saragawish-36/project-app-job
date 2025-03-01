import { nanoid } from "nanoid";
import * as dbService from "../../../DB/db.services.js";
import User from "../../../DB/model/User.model.js";
import {
  otpTypes,
  providerType,
  rolesType,
  tokenTypes,
} from "../../../utils/constants/const.enums.js";
import { successRequest } from "../../../utils/response/success.response.js";
import { verifyGoogleToken } from "../../../utils/security/googleAuth.js";
import { compareHash } from "../../../utils/security/hash.security.js";
import {
  decodedToken,
  generateToken,
} from "../../../utils/security/token.security.js";
import { emailEMitter } from "../../../utils/email/email.event.js";
import "./../../../utils/cleanup/otpcleanup.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await dbService.findOne({
    model: User,
    filter: { email, provider: providerType.system },
  });
  if (!user) return next(new Error("In-valid login data", { cause: 404 }));
  if (!user.isConfirmed)
    return next(new Error("user is not acctivated", { cause: 404 }));
  if (!compareHash({ plainText: password, hashValue: user.password }))
    return next(new Error("invalid password", { cause: 400 }));

  user.isloggedIn = true;
  user.freezed = false;
  await user.save();

  const access_token = generateToken({
    payload: { id: user._id, email: user.email },
    signature:
      user.role === rolesType.admin
        ? process.env.ADMIN_REFRASH_TOKEN
        : process.env.USER_REFRASH_TOKEN,
    expiresIn: "1h",
  });
  const refresh_token = generateToken({
    payload: { id: user._id },
    signature:
      user.role === rolesType.admin
        ? process.env.ADMIN_REFRASH_TOKEN
        : process.env.USER_REFRASH_TOKEN,
    expiresIn: "7d",
  });

  return successRequest({
    res,
    message: "login success",
    data: { token: { access_token, refresh_token } },
  });
};

export const loginWithGoogle = async (req, res, next) => {
  const { idToken } = req.body;
  const payload = await verifyGoogleToken(idToken);
  let user = await dbService.findOne({
    model: User,
    filter: { email: payload.email },
  });
  if (!user) return next(new Error("In-valid login data", { cause: 404 }));
  const access_token = generateToken({
    payload: { id: user._id, email: user.email },
    signature:
      user.role === rolesType.admin
        ? process.env.ADMIN_ACCESS_TOKEN
        : process.env.USER_ACCESS_TOKEN,
    expiresIn: "1h",
  });
  const refresh_token = generateToken({
    payload: { id: user._id },
    signature:
      user.role === rolesType.admin
        ? process.env.ADMIN_REFRESH_TOKEN
        : process.env.USER_REFRESH_TOKEN,
    expiresIn: "7d",
  });
  return successRequest({
    res,
    message: "login success",
    data: { token: { access_token, refresh_token } },
  });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await dbService.findOne({
    model: User,
    filter: { email, isConfirmed: true, freezed: false },
  });
  if (!user) return next(new Error("User not found"));

  const otpCode = nanoid(6);
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
  user.otp.push({
    code: otpCode,
    type: otpTypes.forgetPassword,
    expiresIn: expiresAt,
  });
  await user.save();

  emailEMitter.emit("forgotPassword", {
    id: user._id,
    email,
    otpCode,
  });
  return successRequest({
    res,
    success: true,
    message: "OTP sent successfully. Check your email.",
  });
};

export const resetPassword = async (req, res, next) => {

    const { email, otpCode, newPassword } = req.body;

    const user = await dbService.findOne({
      model: User,
      filter: { email, isConfirmed: true, freezed: false },
    });

    if (!user) 
      return next(new Error("User not found")); // ✅ منع الوصول إلى `user.otp`



    if (!user.otp || user.otp.length === 0) 
      return next(new Error("No OTP records found for this user"));


    const otpEntry = user.otp.find(
      (entry) =>
        entry.code === otpCode && entry.type === otpTypes.forgetPassword
    );

    if (!otpEntry) 
      return next(new Error("Invalid OTP"));


    if (new Date() > new Date(otpEntry.expiresIn)) 
      return next(new Error("OTP has expired"));
    

    user.password = generateHash({ plainText: newPassword });

    user.otp = user.otp.filter((entry) => entry.code !== otpCode);

    await user.save();

    return successRequest({
      res,
      success: true,
      message: "Password reset successfully.",
    });

};

export const refreshToken = async (req, res, next) => {
  const { authorization } = req.headers;

  const user = await decodedToken({
    authorization,
    tokenType: tokenTypes.refresh,
    next,
  });

  if (!user) {
    return next(new Error("Invalid refresh token", { cause: 401 }));
  }

  const access_token = generateToken({
    payload: { id: user._id, email: user.email },
    signature:
      user.role === rolesType.admin
        ? process.env.ADMIN_ACCESS_TOKEN
        : process.env.USER_ACCESS_TOKEN,
  });

  const refresh_token = generateToken({
    payload: { id: user._id },
    signature:
      user.role === rolesType.admin
        ? process.env.ADMIN_REFRESH_TOKEN
        : process.env.USER_REFRESH_TOKEN,
    expiresIn: "7d",
  });

  return successRequest({
    res,
    data: { token: { access_token, refresh_token } },
  });
};
