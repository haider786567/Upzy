import express from 'express';
import { validateMonitor } from '../validators/monitorValidator.js';
import { createMonitor,getAllMonitors,getMonitorById,updateMonitor,deleteMonitor } from '../controllers/monitorcontroller.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';
import { getMonitorLimiter, createMonitorLimiter, updateMonitorLimiter, deleteMonitorLimiter } from '../middlewares/ratelimiter.js';
const router = express.Router();

router.get('/',authMiddleware,getMonitorLimiter, getAllMonitors);
router.post('/create', authMiddleware, createMonitorLimiter, validateMonitor, createMonitor);
router.get('/:monitorId', authMiddleware, getMonitorLimiter, getMonitorById);
router.put('/update/:monitorId', authMiddleware, updateMonitorLimiter, validateMonitor, updateMonitor);
router.delete('/delete/:monitorId', authMiddleware, deleteMonitorLimiter, deleteMonitor);

export default router;