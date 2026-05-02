import { Router } from "express";
import { registerUser, loginUser, logoutUser,forgetPassword } from "../controllers/authController.js";
import { registerValidator, loginValidator, validate } from "../validators/authValidator.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";


const router = Router();

router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;