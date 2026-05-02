import express from "express";
import {getIncidentsForMonitor,getActiveIncidentForMonitor,resolveIncident,deleteIncidentsForMonitor} from "../controllers/incidentcontroller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/:monitorId", authMiddleware, getIncidentsForMonitor);
router.post("/resolve/:incidentId", authMiddleware, resolveIncident);
router.delete("/:monitorId", authMiddleware, deleteIncidentsForMonitor);
router.get("/active/:monitorId", authMiddleware, getActiveIncidentForMonitor);

export default router;