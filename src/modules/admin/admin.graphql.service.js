import * as dbServices from "../../DB/db.service.js";
import Company from "../../DB/model/Company.model.js";
import User from "../../DB/model/User.model.js";
export const allData = async (parent, args) => {
  const users = await dbServices.find({ model: User });
  const companies = await dbServices.find({ model: Company });

  return { users, companies };
};

export const banUnbanUser = async (id, isBanned) => {
    const { id, bannedAt } = args;
    const user = await dbServices.findOneAndUpdate({
      model: User,
      id,
      updateData: { bannedAt: bannedAt || null },  
      options: { new: true },
    });
    return user;
 
};

export const banUnbanCompany = async (id, isBanned) => {
    const { id, bannedAt } = args;
  const company = await dbServices.findOneAndUpdate({
    model: Company,
    id,
    updateData: { bannedAt: bannedAt || null },
    options: { new: true }, 
  });
  return company;
};

export const approveCompany = async (id, isApproved) => {
  const company = await dbServices.findOneAndUpdate({
    model: Company,
    id,
    updateData: { approvedByAdmin }, 
    options: { new: true },
  });
  return company;
};
