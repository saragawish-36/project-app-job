import { Router } from "express";
import { asyncHandler } from "../../utils/response/error.response.js";
import validation from "../../middleware/validation.middleware.js";
import { authentication } from "../../middleware/auth.middleware.js";
import isAuthorized from "../../middleware/authorization.js";
import * as applicationServices from "./services/application.service.js";
import * as applicationValidation from "./application.validation.js";

const router = new Router();

router.get(
  "/export-excel",
  authentication(),
  isAuthorized(["admin", "HR"]),
  validation(applicationValidation.exportApplications),
  asyncHandler(applicationServices.exportApplicationsToExcel)
);

export default router;

import Joi from "joi";

export const exportApplications = Joi.object({
  companyId: Joi.string().required(),
  date: Joi.date().iso().required(),
});


import ExcelJS from "exceljs";
import Application from "../../DB/model/Application.model.js";
import Company from "../../DB/model/Company.model.js";
import { findMany } from "../../DB/db.service.js";

export const exportApplicationsToExcel = async (req, res) => {
  const { companyId, date } = req.query;

  const company = await Company.findById(companyId);
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  const applications = await findMany({
    model: Application,
    filter: {
      companyId,
      createdAt: { $gte: new Date(date), $lt: new Date(date).setHours(23, 59, 59, 999) }
    },
    populate: ["userId", "jobId"],
  });

  if (!applications.length) {
    return res.status(404).json({ message: "No applications found for this date" });
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Applications");

  worksheet.columns = [
    { header: "User Name", key: "user", width: 20 },
    { header: "Job Title", key: "job", width: 30 },
    { header: "Status", key: "status", width: 15 },
    { header: "Application Date", key: "createdAt", width: 20 },
  ];

  applications.forEach(app => {
    worksheet.addRow({
      user: `${app.userId.firstName} ${app.userId.lastName}`,
      job: app.jobId.jobTitle,
      status: app.status,
      createdAt: app.createdAt.toISOString(),
    });
  });

  res.setHeader("Content-Disposition", `attachment; filename=applications-${date}.xlsx`);
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

  await workbook.xlsx.write(res);
  res.end();
};


const canjump =function(nums){
    let target =nums.length-1    
    for(let i= nums.length-1; i>=0; i--){
        if(1+nums[i]>=target){
            target = i
        }
    }
    return target===0
}

