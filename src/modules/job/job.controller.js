 import { Router } from "express";
import { asyncHandler } from "../../utils/response/error.response.js";
import validation from "../../middleware/validation.middleware.js";
import * as jobValidation from "./job.validation.js";
import * as jobServices from "./services/job.service.js";
import { authentication } from "../../middleware/auth.middleware.js";
import isAuthorized from "../../middleware/authorization.js";
import { jobEndpoints } from "./endpoint.job.js";

const router = new Router();
router.post(
  "/create",
  authentication(),
  isAuthorized(jobEndpoints.createJob),
  validation(jobValidation.createJob),
  asyncHandler(jobServices.createJob)
);
router.put(
  "/update/:jobId",
  isAuthorized(jobEndpoints.updateJob),
  validation(jobValidation.updateJob),
  asyncHandler(jobServices.updateJob)
);
router.delete(
  "/delete/:jobId",
  isAuthorized(jobEndpoints.deleteJob),
  validation(jobValidation.deleteJob),
  asyncHandler(jobServices.deleteJob)
);

router.get(
  "/:jobId/applications",
  validation(jobValidation.getJobApplications),
  asyncHandler(jobServices.getJobs)
);

router.get(
  "/:jobId/applications",
  validation(jobValidation.getJobApplications),
  asyncHandler(jobServices.getJobApplications)
);

router.patch(
  "/:applicationId/status",
  authentication(),
  isAuthorized(["HR"]),
  asyncHandler( jobServices.updateApplicationStatus)
);

