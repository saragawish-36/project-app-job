import { Router } from "express";
import * as rigisterServices from "./services/rigister.service.js";
import { asyncHandler } from "../../utils/response/error.response.js";
import validation from "../../middleware/validation.middleware.js";
import * as authValidation from "./auth.validation.js";
import * as  looger from "./services/login.service.js"
const router = Router();

router.post(
  "/singup",
  validation(authValidation.signUp),
  asyncHandler(rigisterServices.signUp)
);

router.patch(
  "/confirmotp",
  validation(authValidation.confirmOtp),
  asyncHandler(rigisterServices.confirmOTP)
);
router.post("/singupWithGimal", asyncHandler(rigisterServices.signupWithGoogle));
router.post(
  "/login",
  validation(authValidation.login),
  asyncHandler(looger.login)
);

router.post("/loginWithGimal", asyncHandler(looger.loginWithGoogle));

router.post(
  "/forgot_password",
  validation(authValidation.forgotPassword),
  asyncHandler(looger.forgotPassword)
);
router.post(
  "/password_reset",
  validation(authValidation.resetPassword),
  asyncHandler(looger.resetPassword)
);
router.get(
  "/refreshtoken",
  asyncHandler(looger.refreshToken)
);

export default router;
