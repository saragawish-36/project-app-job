import * as dbServices from "../../../DB/db.services.js";
import User from "../../../DB/model/User.model.js";
import { successRequest } from "../../../utils/response/success.response.js";
import { compareHash } from "../../../utils/security/hash.security.js";
import { cloud } from "../../../utils/uploads/cloudinary.multer.js";

export const updateAccount = async (req, res, next) => {
  const { mobileNumber, DOB, firstName, lastName, gender } = req.body;

  const user = await dbServices.findOneAndUpdate({
    model: User,
    filter: { _id: req.user._id },
    data: { ...req.body },
    options: { new: true },
  });

  user
    ? successRequest({ res, data: { user } })
    : next(new Error("User not found"));
};

export const account = async (req, res, next) => {
  const user = await dbServices.findOne({
    model: User,
    fliter: { _id: req.user._id },
    populate: [
      {
        select: "-password -otp",
      },
    ],
  });
  return successRequest({ res, data: { user: req.user._id } });
};

export const getUserProfile = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId)
    .select("userName mobileNumber profilePic coverPic")
    .lean();
  user
    ? successRequest({ res, data: { user } })
    : next(new Error("Invalid user", { cause: 404 }));
};

export const updatePassword = async (req, res, next) => {
  const { oldpassword, password } = req.body;
  if (!compareHash({ plainText: oldpassword, hashValue: req.user.password }))
    return next(new Error("invalid old password", { cause: 400 }));
  await dbServices.updateOne({
    model: User,
    fliter: { _id: req.user._id },
    data: {
      password: hash({ plainText: req.body.password }),
    },
  });

  return successRequest({ res, sucess: true, message: "update don ",data: { user } });
};

export const uploadProfile = async (req, res, next) => {
  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/user/${req.user._id}/account`,
  });
  const user = await dbServices.findOneAndUpdate({
    model: User,
    fliter: { _id: req.user._id },
    data: {
      profilePic: { secure_url, public_id },
    },
    option: { new: false },
  });
  if (user.profilePic?.public_id) {
    await cloud.uploader.destroy(user.profilePic.public_id);
  }
  return successRequest({ res, message: 'Success upload profile successfully'});
};

export const uploadCover = async (req, res, next) => {
  let imges = [];
  for (const file of req.files) {
    const { secure_url, public_id } = await cloud.uploader.upload(file.path, {
      folder: `${process.env.APP_NAME}/user/${req.user._id}/account`,
    });
    imges.push({ secure_url, public_id });
  }
  const user = await dbServices.findOneAndUpdate({
    model: User,
    fliter: { _id: req.user._id },
    data: {
      coverPic: imges,
    },
    option: { new: true },
  });
  return successRequest({ res, data: { user } });
};

export const deleteLogo = async (req, res, next) => {
  const user = await findOneAndDelete({
    model: User,
    filter: { _id: req.user._id, "Logo.public_id": { $exists: true } },
  });
  if (!user) return next(new Error("Undefined logo"));
  await cloud.uploader.destroy(user.profilePic.public_id);
};

export const deleteCover = async (req, res, next) => {
  const user = await findOneAndDelete({
    model: User,
    filter: { _id: req.user._id, coverPic: { $exists: true, $ne: [] } },
  });
  if (!user) return next(new Error("Undefined logo"));
  for (const img of user.coverPic) {
    await cloud.uploader.destroy(img.public_id);
  }
  return successRequest({ res, message: 'Success upload profile successfully'});
};

export const softDelete = async (req, res, next) => {
  const userId = req.params
  const user = await dbServices.findById({
    model: User,
    id:{_id:userId}
  })

if(!user)return next(new Error("Undefined user"),{cause:404});
if(user.deletedAt)  return next(new ERR ("User already deleted" ),{cause:400});
user.deletedAt = new Date();
await user.save();
successRequest({ res, message: "User deleted", status: 200 });

}
