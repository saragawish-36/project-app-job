import { Router } from "express";
import { asyncHandler } from "../../utils/response/error.response.js";
import validation from "../../middleware/validation.middleware.js";
import * as companyValidation from "./company.validation.js";
import * as companyServices from "./services/company.service.js";
import { authentication } from "../../middleware/auth.middleware.js";
import isAuthorized from "../../middleware/authorization.js";
import {
  fileValidation,
  uploadCloudFile,
} from "../../utils/upload/cloud.multer.js";
import { endpoint } from "./endpoint.company.js";

const router = new Router();

router.post(
  "/creatcompany",
  authentication(),
  validation(companyValidation.createCompany),
  isAuthorized(endpoint.createCompany),
  asyncHandler(companyServices.createCompany)
);

router.patch(
  "/",
  authentication(),
  validation(companyValidation.updateCompany),
  isAuthorized(endpoint.updateCompany),
  asyncHandler(companyServices.updateCompany)
);

router.delete(
  "/delete/:CompanyId",
  validation(companyValidation.softDelete),
  isAuthorized(endpoint.companysoftDelete),
  asyncHandler(companyServices.companysoftDelete)
);

router.get(
  "/getcompany/:CompanyId",
  isAuthorized(endpoint.getAllJobInCompany),
  asyncHandler(companyServices.getAllJobInCompany)
);

router.get(
  "/search",
  asyncHandler(companyServices.searchCompany)
);

router.patch(
  "/account/image",
  authentication(),
  validation(companyValidation.uploadLogo),
  isAuthorized(endpoint.uploadLogo),
  uploadCloudFile(fileValidation.image).single("image"),
  asyncHandler(companyServices.uploadLogo)
);

router.patch(
  "/account/image/cover",
  authentication(),
  validation(companyValidation.uploadCover),
  isAuthorized(endpoint.uploadCover),
  uploadCloudFile("company/account", fileValidation.image).array("image", 3),
  asyncHandler(companyServices.uploadCover)
);

router.delete(
  "/account/image",
  authentication(),
  isAuthorized(endpoint.deleteLogo),
  validation(companyValidation.deletelogo),
  asyncHandler(companyServices.deleteLogo)
);
router.delete(
  "/account/image/cover",
  authentication(),
  isAuthorized(endpoint.deleteCover),
  validation(companyValidation.deleteCover),
  asyncHandler(companyServices.deleteCover)
);

export default router; 

