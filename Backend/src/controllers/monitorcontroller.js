import monitorModel from "../models/monitor.model.js";



export const getAllMonitors = async (req, res,next) => {
  try {
    const monitors = await monitorModel.find({ userId: req.user._id });
    res.json(monitors);
  } catch (err) {
    next(err);
  }
};

export const createMonitor = async (req, res,next) => {
  try {
    const { name, url, method, headers, body, expectedStatus, timeout, interval } = req.body;
    const newMonitor = new monitorModel({
      userId: req.user._id,
      name,
      url,
      method,
      headers,
      body,
      expectedStatus,
      timeout,
      interval
    });
    await newMonitor.save();
    res.status(201).json(newMonitor);
  } catch (err) {
    next(err);
  }
};

export const getMonitorById = async (req, res,next) => {
  try {
    const monitor = await monitorModel.findOne({ _id: req.params.id, userId: req.user._id });
    if (!monitor) {
      return res.status(404).json({ error: "Monitor not found" });
    }
    res.json(monitor);
  } catch (err) {
    next(err);
  }
};

export const updateMonitor = async (req, res,next) => {
  try {
    const { name, url, method, headers, body, expectedStatus, timeout, interval } = req.body;
    const monitor = await monitorModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name, url, method, headers, body, expectedStatus, timeout, interval },
      { new: true }
    );
    if (!monitor) {
      return res.status(404).json({ error: "Monitor not found" });
    }
    res.json(monitor);
  } catch (err) {
    next(err);
  }
};

export const deleteMonitor = async (req, res,next) => {
  try {
    const monitor = await monitorModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!monitor) {
      return res.status(404).json({ error: "Monitor not found" });
    }
    // Also delete related incidents and logs
    await incidentModel.deleteMany({ monitorId: monitor._id });
    await logModel.deleteMany({ monitorId: monitor._id });
    res.json({ message: "Monitor and related data deleted" });
  } catch (err) {
    next(err);
  }
};
 