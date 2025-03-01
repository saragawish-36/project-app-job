import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
export const generateHash = ({
  plainText = "",
  salt = process.env.SALT,
} = {}) => {
  const hash = bcrypt.hashSync(plainText, parseInt(salt));
  return hash;
};
export const compareHash = ({
  plainText = "",
  hashValue = "",
} = {}) => {
  const match = bcrypt.compareSync(plainText, hashValue);
  return match;
};

export const generateOtpAndHash = () => {
  const plainOtp = customAlphabet("0123456789", 6)();
  const hashOtp = generateHash({ plainText: plainOtp });
  return { plainOtp, hashOtp };
};
