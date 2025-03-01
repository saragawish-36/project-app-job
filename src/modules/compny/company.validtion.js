import joi from "joi";
import { generaFileds } from "../../middleware/validation.middleware.js";


export const createCompany =joi.object({
    companyName:generaFileds.companyName.required(),
    description:generaFileds.description.required(),
    industry:generaFileds.industry.required(),
    address:generaFileds.address.required(),
    companyEmail:generaFileds.companyEmail.required(),
}).required()

export const updateCompany =joi.object({
    companyName:generaFileds.companyName.required(),
    description:generaFileds.description.required(),
    industry:generaFileds.industry.required(),
    address:generaFileds.address.required(),
}).required()

export const getAllJobInCompany = joi.object({
    companyId:generaFileds.id.required(),
}).required()

export const searchCompany =joi.object({
    companyName:generaFileds.companyName.required(),

}).required()

export const softDelete = joi
  .object()
  .keys({
    userId: generaFileds.id.required(),
  })
  .required();

  export const uploadLogo = joi
  .object({
    file: joi.array().items(generaFileds.file),
  })
  .required();

export const uploadCover = joi
  .object({
    file: joi.array().items(generaFileds.file),
  })
  .required();

export const deletelogo = joi
  .object()
  .keys({
    userId: generaFileds.id.required(),
  })
  .required();

export const deleteCover = joi
  .object()
  .keys({
    userId: generaFileds.id.required(),
  })
  .required();

