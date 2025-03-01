import { Router } from "express";
import { asyncHandler } from "../../utils/response/error.response.js";
import validation from "../../middleware/validation.middleware.js";
import * as userValidation from "./user.validation.js";
import * as  userServices from "./services/user.service.js"
import { authentication } from "../../middleware/auth.middleware.js";
const route = Router();



route.patch(
    "/",
    validation(userValidation.updateAccount),
    authentication(),
    asyncHandler(userServices.updateAccount)
  );




  route.post(
    "/updatePassword",
    authentication(),
    validation(userValidation.updatePassword),
    asyncHandler(userServices.updatePassword)
  );

  export default route;