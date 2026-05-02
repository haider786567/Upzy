import incidentModel from "../models/incident.model.js";
import logModel from "../models/log.model.js";
import monitorModel from "../models/monitor.model.js";

export const getIncidentsForMonitor = async (req, res, next) => {
    try {
        const { monitorId } = req.params;

        // Verify monitor belongs to user
        const monitor = await monitorModel.findOne({ _id: monitorId, userId: req.user._id });
        if (!monitor) return res.status(404).json({ error: "Monitor not found or unauthorized" });

        const incidents = await incidentModel.find({ monitorId }).sort({ startTime: -1 });
        if (!incidents) {
            next(new Error('Incidents not found for this monitor'));
        }
        res.json(incidents);
    } catch (err) {
        next(err);
    }
};

export const resolveIncident = async (req, res, next) => {
    try {
        const { incidentId } = req.params;
        const incident = await incidentModel.findById(incidentId);
        if (!incident) {
            return res.status(404).json({ error: "Incident not found" });
        }

        // Verify monitor belongs to user
        const monitor = await monitorModel.findOne({ _id: incident.monitorId, userId: req.user._id });
        if (!monitor) return res.status(404).json({ error: "Monitor not found or unauthorized" });

        incident.resolved = true;
        incident.endTime = new Date();
        await incident.save();

        // 🔥 also update monitor status
        await monitorModel.findByIdAndUpdate(incident.monitorId, { status: "UP" });

        res.json({ message: "Incident resolved successfully", incident });
    } catch (err) {
        next(err);
    }
};

export const deleteIncidentsForMonitor = async (req, res, next) => {
    try {
        const { monitorId } = req.params;

        // Verify monitor belongs to user
        const monitor = await monitorModel.findOne({ _id: monitorId, userId: req.user._id });
        if (!monitor) return res.status(404).json({ error: "Monitor not found or unauthorized" });

        const result = await incidentModel.deleteMany({ monitorId });
        res.json({ message: `${result.deletedCount} incidents deleted for monitor ${monitorId}` });
    } catch (err) {
        next(err);
    }
};

export const getActiveIncidentForMonitor = async (req, res, next) => {
    try {
        const { monitorId } = req.params;

        // Verify monitor belongs to user
        const monitor = await monitorModel.findOne({ _id: monitorId, userId: req.user._id });
        if (!monitor) return res.status(404).json({ error: "Monitor not found or unauthorized" });

        const incident = await incidentModel.findOne({ monitorId, resolved: false }).sort({ startTime: -1 });
        if (!incident) {
            return res.status(404).json({ error: "No active incident found for this monitor" });
        }
        res.json(incident);
    } catch (err) {
        next(err);
    }
};