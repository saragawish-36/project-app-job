
import multer from "multer";

export const fileValidation = {
  image: ["image/jpg", "image/png", "image/gif"],
  document: ["application/pdf", "application/msword"],
};
export const uploadCloudFile = ( fileValidation = []) => {

  const storage = multer.diskStorage({ });

  function fileFilter(req, file, cb) {
    if (fileValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid file format", false);
    }
  }

  return multer({ det: "tempPath", fileFilter, storage });
};