import CryptoJS from "crypto-js";


export const encrypt = ({ plainText, secret_key = process.env.PHONE_ENC }) => {
  return CryptoJS.AES.encrypt(plainText, secret_key).toString();
};

export const decrypt = ({
  clipherText,
  secret_key = process.env.PHONE_ENC,
}) => {
  return CryptoJS.AES.decrypt(clipherText, secret_key).toString(
    CryptoJS.enc.Utf8
  );
};
