import { AllType } from "../types/admin.types.response.js";
import { allData } from "../services/admin.graphql.service.js";

export const adminQuery = {
  getAll: {
    type: AllType,
    resolve: allData,
  },
};
