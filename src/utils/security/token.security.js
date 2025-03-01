import jwt from "jsonwebtoken";
import User from "../../DB/model/User.model.js";
import * as dataServices from "../../DB/db.services.js";
import { tokenTypes } from "../constants/const.enums.js";

export const decodedToken = async ({
  authorization = "",
  tokenType = tokenTypes.access,
  next = {},
} = {}) => {
  const [bearer, token] = authorization?.split(" ") || [];
  if (!bearer || !token) {
    return next(new Error("Missing token", { code: 400 }));
  }

  let access_signature = process.env.USER_ACCESS_TOKEN;
  let refresh_signature = process.env.USER_REFRESH_TOKEN;

  switch (bearer) {
    case "System":
      access_signature = process.env.ADMIN_ACCESS_TOKEN;
      refresh_signature = process.env.ADMIN_REFRESH_TOKEN;
      break;
    case "Bearer":
      access_signature = process.env.USER_ACCESS_TOKEN;
      refresh_signature = process.env.USER_REFRESH_TOKEN;
      break;
    default:
      return next(new Error("Invalid token type", { code: 400 }));
  }

  const decoded = verifyToken({
    token,
    signature:
      tokenType === tokenTypes.access ? access_signature : refresh_signature,
  });

  if (!decoded?.id) {
    return next(new Error("Invalid token", { code: 401 }));
  }

  const user = await dataServices.findOne({
    model: User,
    filter: { _id: decoded.id, isDeleted: false },
  });

  if (!user) {
    return next(new Error("User not registered or deleted", { cause: 404 }));
  }
  if (user.changeCredentialsTime?.getTime() >= decoded.iat * 1000) {
    return next(new Error("Invalid login credentials", { cause: 400 }));
  }

  return user;
};

export const generateToken = ({
  payload = {},
  signature = process.env.USER_ACCESS_TOKEN,
  expiresIn = "1h",
}) => {
  return jwt.sign(payload, signature, { expiresIn });
};

export const verifyToken = ({
  token,
  signature = process.env.USER_ACCESS_TOKEN,
}) => {
  const decoded = jwt.verify(token, signature);
  return decoded;
};

