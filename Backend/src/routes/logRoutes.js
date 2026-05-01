import express from "express";
import {getLogsForMonitor,deleteLogsForMonitor} from "../controllers/logcontroller.js";

const router = express.Router();

router.get("/:monitorId", getLogsForMonitor);
router.delete("/:monitorId", deleteLogsForMonitor);

export default router;


