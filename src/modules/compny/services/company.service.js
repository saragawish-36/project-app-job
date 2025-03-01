import * as dbServices from "../../../DB/db.services.js";
import Company from "../../../DB/model/Company.model";
import { rolesType } from "../../../utils/constants/const.enums.js";
import { cloud } from "../../../utils/uploads/cloudinary.multer.js";

export const createCompany = async (req, res, next) => {
  const { companyName, description, industry, address, companyEmail } =
    req.body;

  if (
    await dbServices.findOne({
      model: Company,
      filter: { companyName },
    })
  ) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const company = await dbServices.create({
    model: Company,
    data: {
      ...req.body,
    },
  });
  return successRequest({
    res,
    message: `company ${companyName} created successfully`,
    data: {company},
    status: 201,
  });
};

export const updateCompany = async (req, res, next) => {
  let attachments = [];
  for (const file of req.files) {
    const { secure_url, public_id } = await cloud.uploader.upload(file.path, {
      folder: `${process.env.APP_Name}/Company`,
    });
    attachments.push({ secure_url, public_id });
  }
  req.body.attachments = attachments;
  const company = await dataService.findOneAndUpdate({
    model: Company,
    fliter: {
      _id: req.params.CompanyId,
      isDeleted: { $exists: false },
      createdBy: req.user._id,
    },
    data: {
      ...req.body,
      updateBy: req.user._id,
    },
    options: {
      new: true,
    },
  });
  return company
    ? successRequest({ res, status: 201, data: { Company } })
    : next(new Error("Invalid Company", { cause: 404 }));
};

export  const companysoftDelete = async (req, res, next) => {
  const companyId = req.params;
  const company = await dbServices.findById({
    model: Company,
    id: { _id: companyId },
  });

  if (!company) return next(new Error("Undefined user"), { cause: 404 });
  if (company.CreatedBy.toString() === req.user._id.toString() || req.user.role === rolesType.admin){
    company.isDelete=true;
    company.deletedAt = new Date();
    await company.save();
  } 
  successRequest({ res, message: "company deleted", status: 200 });
};

export const getAllJobInCompany= async (req, res, next) => {
  const companyId = req.params;
  const company = await dbServices.findById({
    model: Company,
    id: { _id: companyId },
    populate:['jobs']
  });
  company ? successRequest({ res, status: 201, data: { company } })
  : next(new Error("Invalid Company", { cause: 404 }));
}

export const searchCompany = async (req, res, next) => {
  const { companyName } = req.query;

  const company = await dataService.find({
    model: Company,
    fliter: {
      name: { $regex: companyName },
    },
  });
  return company
    ? successRequest({ res, status: 201, data: { company } })
    : next(new Error("Invalid Company", { cause: 404 }));
};

export const uploadLogo = async (req, res, next) => {
  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/company/${req.company._id}/logo`,
  });
  const company = await dbServices.findOneAndUpdate({
    model: Company,
    fliter: { _id: req.company._id },
    data: {
      Logo: { secure_url, public_id },
    },
    option: { new: false },
  });
  if (company.Logo?.public_id) {
    await cloud.uploader.destroy(company.Logo.public_id);
  }
  return successRequest({ res, data: { company } });
};

export const uploadCover = async (req, res, next) => {
  let imges = [];
  for (const file of req.files) {
    const { secure_url, public_id } = await cloud.uploader.upload(file.path, {
      folder: `${process.env.APP_NAME}/company/${req.company._id}/cover`,
    });
    imges.push({ secure_url, public_id });
  }
  const company = await dbServices.findOneAndUpdate({
    model: Company,
    fliter: { _id: req.company._id },
    data: {
      coverPic: imges,
    },
    option: { new: true },
  });
  return successRequest({ res, data: { company } });
};

export const deleteLogo = async (req, res, next) => {
  const company = await findOneAndDelete({
    model: Company,
    filter: { _id: req.company._id, "Logo.public_id": { $exists: true } },
  });
  if (!company) return next(new Error("Undefined logo"));
  await cloud.uploader.destroy(company.Logo.public_id);
  return successRequest({ res });
};

export const deleteCover = async (req, res, next) => {
  const company = await findOneAndDelete({
    model: Company,
    filter: { _id: req.company._id, coverPic: { $exists: true, $ne: [] } },
  });
  if (!company) return next(new Error("Undefined logo"));
  for (const imge of company.coverPic) {
    await cloud.uploader.destroy(imge.public_id);
  }
  return successRequest({ res });
};



