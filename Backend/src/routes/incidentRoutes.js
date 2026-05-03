import express from "express";
import {getIncidentsForMonitor,getActiveIncidentForMonitor,resolveIncident,deleteIncidentsForMonitor} from "../controllers/incidentcontroller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import { incidentReadLimiter,incidentWriteLimiter } from "../middlewares/ratelimiter.js";

const router = express.Router();

router.get("/:monitorId",  authMiddleware, incidentReadLimiter, getIncidentsForMonitor);
router.post("/resolve/:incidentId", authMiddleware, incidentWriteLimiter, resolveIncident);
router.delete("/:monitorId", authMiddleware, incidentReadLimiter, deleteIncidentsForMonitor);
router.get("/active/:monitorId", authMiddleware, incidentReadLimiter, getActiveIncidentForMonitor);

export default router;