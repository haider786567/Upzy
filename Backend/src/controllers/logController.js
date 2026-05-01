import monitorModel from '../models/monitor.model.js';
import logModel from '../models/log.model.js';


export const getLogsForMonitor = async (req, res, next) => {
    try {
        const{monitorId} = req.params;
        const { page = 1, limit = 20 } = req.query;
        const logs = await logModel.find({ monitorId }).sort({ timestamp: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
        if (!logs) {
            next(new Error('Logs not found for this monitor'));
        }
        res.json(logs);
    } catch (err) {
        next(err);
    }
};

export const deleteLogsForMonitor = async (req, res, next) => {
    try {
        const { monitorId } = req.params;
        const result = await logModel.deleteMany({ monitorId });
        res.json({ message: `${result.deletedCount} logs deleted for monitor ${monitorId}` });
    } catch (err) {
        next(err);
    }
};






