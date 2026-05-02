import express from "express";
import {getLogsForMonitor,deleteLogsForMonitor} from "../controllers/logcontroller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/:monitorId", authMiddleware, getLogsForMonitor);
router.delete("/:monitorId", authMiddleware, deleteLogsForMonitor);

export default router;


