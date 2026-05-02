import { Router } from "express";
import { registerUser, loginUser, logoutUser, forgetPassword, verifyOtp, resetPassword } from "../controllers/authController.js";
import { registerValidator, loginValidator, validate, forgetPasswordValidator, verifyOtpValidator, resetPasswordValidator } from "../validators/authValidator.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";


const router = Router();

router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/forget-password", forgetPasswordValidator, validate, forgetPassword);
router.post("/verify-otp", verifyOtpValidator, validate, verifyOtp);
router.post("/reset-password", resetPasswordValidator, validate, resetPassword);


export default router;