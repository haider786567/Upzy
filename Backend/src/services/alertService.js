import transporter from "../config/emailConfig.js";
import Monitor from "../models/monitor.model.js";
import User from "../models/user.model.js";
import config from "../config/config.js";

// ─── SEND EMAIL ────────────────────────────────────────────

const sendEmailAlert = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: config.EMAIL,
      to,
      subject,
      html
    });
    console.log(`📧 Alert email sent to ${to}`);
  } catch (err) {
    console.error("Email alert failed:", err.message);
  }
};

// ─── HTML TEMPLATES ────────────────────────────────────────

const buildIncidentEmail = ({ monitorName, url, type, startTime }) => `
  <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
    <h2 style="color:${type === "DOWN" ? "#DC2626" : "#F59E0B"}">
      🚨 ${type} Incident Detected
    </h2>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:8px 0;color:#6b7280">Monitor</td><td style="padding:8px 0;font-weight:600">${monitorName}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">URL</td><td style="padding:8px 0"><code>${url}</code></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Status</td><td style="padding:8px 0;color:${type === "DOWN" ? "#DC2626" : "#F59E0B"};font-weight:700">${type}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Started</td><td style="padding:8px 0">${new Date(startTime).toLocaleString()}</td></tr>
    </table>
    <p style="color:#6b7280;font-size:14px">— Upzy Monitoring</p>
  </div>
`;

const buildResolvedEmail = ({ monitorName, url, type, endTime, duration }) => `
  <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
    <h2 style="color:#16A34A">✅ Incident Resolved</h2>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:8px 0;color:#6b7280">Monitor</td><td style="padding:8px 0;font-weight:600">${monitorName}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">URL</td><td style="padding:8px 0"><code>${url}</code></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Was</td><td style="padding:8px 0">${type}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Resolved at</td><td style="padding:8px 0">${new Date(endTime).toLocaleString()}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Duration</td><td style="padding:8px 0">${duration}</td></tr>
    </table>
    <p style="color:#6b7280;font-size:14px">— Upzy Monitoring</p>
  </div>
`;

// ─── HELPERS ───────────────────────────────────────────────

const formatDuration = (ms) => {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
};

const getMonitorOwner = async (monitorId) => {
  const monitor = await Monitor.findById(monitorId).lean();
  if (!monitor) return null;
  const user = await User.findById(monitor.userId).select("email username").lean();
  return { monitor, user };
};

// ─── PUBLIC API ────────────────────────────────────────────

/**
 * Called when a new incident is created
 */
export const notifyIncidentCreated = async ({ monitorId, type, startTime }) => {
  try {
    const data = await getMonitorOwner(monitorId);
    if (!data?.user?.email) return;

    const { monitor, user } = data;
    const monitorName = monitor.name || monitor.url;

    await sendEmailAlert({
      to: user.email,
      subject: `🚨 ${type}: ${monitorName} is ${type}`,
      html: buildIncidentEmail({ monitorName, url: monitor.url, type, startTime })
    });
  } catch (err) {
    console.error("Alert (created) error:", err.message);
  }
};

/**
 * Called when an incident is resolved
 */
export const notifyIncidentResolved = async ({ monitorId, type, startTime, endTime }) => {
  try {
    const data = await getMonitorOwner(monitorId);
    if (!data?.user?.email) return;

    const { monitor, user } = data;
    const monitorName = monitor.name || monitor.url;
    const duration = formatDuration(new Date(endTime) - new Date(startTime));

    await sendEmailAlert({
      to: user.email,
      subject: `✅ Resolved: ${monitorName} is back UP`,
      html: buildResolvedEmail({ monitorName, url: monitor.url, type, endTime, duration })
    });
  } catch (err) {
    console.error("Alert (resolved) error:", err.message);
  }
};
