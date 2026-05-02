import express from 'express';
import { validateMonitor } from '../validators/monitorValidator.js';
import { createMonitor,getAllMonitors,getMonitorById,updateMonitor,deleteMonitor } from '../controllers/monitorcontroller.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';
const router = express.Router();

router.get('/', authMiddleware, getAllMonitors);
router.post('/create', authMiddleware, validateMonitor, createMonitor);
router.get('/:monitorId', authMiddleware, getMonitorById);
router.put('/update/:monitorId', authMiddleware, validateMonitor, updateMonitor);
router.delete('/delete/:monitorId', authMiddleware, deleteMonitor);

export default router;