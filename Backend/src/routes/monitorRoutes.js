import express from 'express';
import { validateMonitor } from '../validators/monitorValidator.js';
import { createMonitor,getAllMonitors,getMonitorById,updateMonitor,deleteMonitor } from '../controllers/monitorcontroller.js';
const router = express.Router();

router.get('/', getAllMonitors);
router.post('/create', validateMonitor, createMonitor);
router.get('/:monitorId', getMonitorById);
router.put('/update/:monitorId', validateMonitor, updateMonitor);
router.delete('/delete/:monitorId', deleteMonitor);

export default router;