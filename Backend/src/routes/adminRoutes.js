import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authmiddleware.js";

const router = Router();

// All admin routes require: valid JWT + admin role
router.use(authMiddleware, adminMiddleware);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

export default router;
