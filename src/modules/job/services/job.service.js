import { model } from "mongoose";
import * as dbServices from "../../../DB/db.services.js";
import Company from "../../../DB/model/Company.model";
import Application from "../../../DB/model/Application.model.js";
import { Job } from "../../../DB/model/JobOpportunity.model.js";
import statusTypes from "../../../utils/constants/const.enums.js";

export const createJob = async (req, res, next) => {
  const {
    jobTitle,
    jobDescription,
    jobLocation,
    workingTime,
    seniorityLevel,
    softSkills,
  } = req.body;

  if (
    await dbServices.findOne({
      model: job,
      filter: { companyId: req.user.companyId },
    })
  ) {
    return res.status(400).json({ message: "job already exists" });
  }

  const job = await dbServices.create({
    model: Job,
    data: {
      ...req.body,
      companyId: req.user.companyId,
      addedBy: req.user._id,
    },
  });
  return successRequest({
    res,
    message: 'company ${job.jobTitle} created successfully',
    data: { job },
    status: 201,
  });
};

export const updateJob = async (req, res, next) => {
  const {
    jobTitle,
    jobDescription,
    jobLocation,
    workingTime,
    seniorityLevel,
    softSkills,
  } = req.body;

  const job = await dbServices.findOneAndUpdate({
    model: Job,
    filter: { _id: jobId },
    data: { ...req.body, updatedBy: req.user._id },
    options: { new: true },
  });

  job
    ? successRequest({ res, data: { job } })
    : next(new Error("job not found"));
};

export const deleteJob = async (req, res, next) => {
  const { jobId } = req.params;
  const job = await dbServices.findById({
    model: Job,
    id: { _id: jobId },
  });
  if (!job) return next(new Error("Message not found", { cause: 404 }));
  await job.findByIdAndDelete(jobId);
  successRequest({ res, message: "job deleted successfully" });
};

export const getJobs = async (req, res) => {
  const { companyId, jobId } = req.params;
  const { companyName, skip = 0, limit = 10, sort = "-createdAt" } = req.query;

  const company = await findOne({
    model: Company,
   filter: {
    name: { $regex: companyName, $options: "i" }
   }
    });
 
  const jobs = await Job.aggregate([
    { $match: matchStage },
    {
        $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "companyData"
        }
    },
    { $unwind: "$companyData" }, 
    { $sort: { createdAt: sort.startsWith("-") ? -1 : 1 } }, 
    { $skip: parseInt(skip) },
    { $limit: parseInt(limit) },
    {
        $project: {
            title: 1,
            companyId: 1,
            industry: "$companyData.industry", 
            createdAt: 1
        }
    }
]);
  const totalJobs = await Job.countDocuments(filter);

  successRequest({ res, data: { totalJobs, jobs } });
};



export const getJobApplications = async (req, res) => {
  const { jobId } = req.params;
  const { skip = 0, limit = 10, sort = "-createdAt" } = req.query;

  const job = await dbServices.findById({ model: Job, id: jobId });
  if (!job) return res.status(404).json({ message: "Job not found" });

  const applications = await dbServices.find({
    model: Application,
    filter: { jobId },
    populate: [{ path: "userId", select: "name email phone resume" }],
    skip: parseInt(skip),
    limit: parseInt(limit),
  });
  const totalApplications = await Application.countDocuments({ jobId });

  successRequest({ res, data: { totalApplications, applications } });
};

export const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!Object.values(statusTypes).includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const application = await dbServices.findById({
    model: Application,
    id: applicationId,
    populate: ["userId"],
  });

  if (!application)
    return res.status(404).json({ message: "Application not found" });

  const userEmail = updatedApplication.userId.email;
  const userName = updatedApplication.userId.name;
  if (status === statusTypes.pending) {
    emailEMitter.emit("applicationPending", {
      id,
      email: userEmail,
      name: userName,
    });
  } else if (status === statusTypes.accepted) {
    emailEMitter.emit("applicationAccepted", {
      id,
      email: userEmail,
      name: userName,
    });
  } else if (status === statusTypes.rejected) {
    emailEMitter.emit("applicationRejected", {
      id,
      email: userEmail,
      name: userName,
    });
  }

  successRequest({ res,message:"chack your email"});

};