import express from "express";
import {getIncidentsForMonitor,getActiveIncidentForMonitor,resolveIncident,deleteIncidentsForMonitor} from "../controllers/incidentcontroller.js";

const router = express.Router();

router.get("/:monitorId", getIncidentsForMonitor);
router.post("/resolve/:incidentId", resolveIncident);
router.delete("/:monitorId", deleteIncidentsForMonitor);
router.get("/active/:monitorId", getActiveIncidentForMonitor);

export default router;