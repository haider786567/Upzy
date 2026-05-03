import { Router } from "express";
import { registerUser, loginUser, logoutUser,forgetPassword } from "../controllers/authController.js";
import { registerValidator, loginValidator, validate } from "../validators/authValidator.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import { loginLimiter,registerLimiter } from "../middlewares/ratelimiter.js";


const router = Router();

router.post("/register", registerValidator ,registerLimiter, validate, registerUser);
router.post("/login",  loginValidator,loginLimiter, validate, loginUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;