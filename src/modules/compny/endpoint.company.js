import { rolesType } from "../../utils/constants/const.enums";

export const endpoint = {
    createCompany: [rolesType.user, rolesType.admin],
    updateCompany: [rolesType.user, rolesType.admin],
    companysoftDelete: [rolesType.user, rolesType.admin],
    getAllJobInCompany: [rolesType.user, rolesType.admin, rolesType.hr],
    searchCompany: [rolesType.user, rolesType.admin, rolesType.hr],
    uploadLogo: [rolesType.user, rolesType.admin],
    uploadCover: [rolesType.user, rolesType.admin],
    deleteLogo: [rolesType.user, rolesType.admin],
    deleteCover: [rolesType.user, rolesType.admin],
  };