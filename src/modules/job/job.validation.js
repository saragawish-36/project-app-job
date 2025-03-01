import joi from "joi";
import { generaFileds } from "../../middleware/validation.middleware";

export const createJob = joi
  .object({
    jobTitle: generaFileds.jobTitle,
    jobDescription: generaFileds.jobDescription,
    jobLocation: generaFileds.jobLocation,
    workingTime: generaFileds.workingTime,
    seniorityLevel: generaFileds.seniorityLevel,
    softSkills: generaFileds.softSkills,
  })
  .required();

export const updateJob = joi
  .object({
    jobTitle: generaFileds.jobTitle,
    jobDescription: generaFileds.jobDescription,
    jobLocation: generaFileds.jobLocation,
    workingTime: generaFileds.workingTime,
    seniorityLevel: generaFileds.seniorityLevel,
    softSkills: generaFileds.softSkills,
  })
  .required();

export const deleteJob = joi
  .object({
    jobId: generaFileds.id.required(),
  })
  .required();

  export const  getJobApplications = joi
  .object({
    jobId: generaFileds.id.required(),
  })