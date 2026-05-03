# 🚀 Upzy — Uptime Monitoring Platform

> A real-time website & API uptime monitoring platform built during a hackathon.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [✨ Complete Features List](#-complete-features-list)
- [📊 User Flow (Complete User Journey)](#-user-flow-complete-user-journey)
- [🔄 Backend Architecture & Flows](#-backend-architecture--flows)
  - [Monitor Check Flow](#monitor-check-flow)
  - [Incident Detection Flow](#incident-detection-flow)
  - [Real-time WebSocket Flow](#real-time-websocket-flow)
  - [Analytics & Uptime Calculation Flow](#analytics--uptime-calculation-flow)
- [🌐 Complete API Documentation](#-complete-api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [Monitor Routes](#monitor-routes)
  - [Incident Routes](#incident-routes)
  - [Log Routes](#log-routes)
  - [Analytics Routes](#analytics-routes)
- [🔌 WebSocket Events (Real-time Communication)](#-websocket-events-real-time-communication)
- [🎯 Frontend Integration Guide](#-frontend-integration-guide)
  - [Response Format Standards](#response-format-standards)
  - [Authentication Flow (Frontend)](#authentication-flow-frontend)
  - [Rate Limiting](#rate-limiting)
  - [Error Handling](#error-handling)
- [Git Workflow & Contribution Guidelines](#git-workflow--contribution-guidelines)
  - [Branching Strategy](#branching-strategy)
  - [Commit Message Convention](#commit-message-convention)
  - [How to Push Code](#how-to-push-code)
  - [Pull Request Guidelines](#pull-request-guidelines)
- [Code Style Guidelines](#code-style-guidelines)
- [Contributors](#contributors)

---

## 📖 About the Project

**Upzy** is a real-time uptime monitoring tool that helps developers and teams track the availability, response time, and health of their websites and APIs. It sends instant alerts (via email/SMS/socket) when a monitor goes down and logs all incidents for review.

### Core Benefits:
- ✅ **24/7 Monitoring** — Automated checks every 5-3600 seconds
- ✅ **Real-time Alerts** — Instant email notifications when monitors go down
- ✅ **Incident Tracking** — Auto-detect DOWN & DEGRADED states with AI analysis
- ✅ **Performance Analytics** — Uptime %, error rates, response times
- ✅ **WebSocket Real-time** — Live status updates across all monitors
- ✅ **Full Audit Trail** — 7-day log history with status codes & errors
- ✅ **Role-based Access** — User & Admin roles with proper authorization

---

## 🛠 Tech Stack

### Backend
| Tech | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | ^5.2.1 | HTTP framework |
| Mongoose | ^9.6.1 | MongoDB ODM |
| Socket.io | — | Real-time communication |
| Nodemon | latest | Dev auto-reload |

### Frontend
| Tech | Version | Purpose |
|------|---------|---------|
| React | ^19.2.0 | UI framework |
| Vite | ^7.2.4 | Build tool & dev server |
| ESLint | ^9.39.1 | Code linting |

### Database
- **MongoDB** — Document-based storage for users, monitors, incidents, and logs

---

## 📁 Project Structure

```
Upzy/
├── Backend/
│   ├── server.js               # Entry point — starts Express server
│   ├── package.json
│   └── src/
│       ├── app.js              # Express app setup & middleware
│       ├── config/             # DB connection & env config
│       ├── controllers/        # Route handler logic
│       │   ├── authcontroller.js
│       │   ├── monitorcontroller.js
│       │   ├── incidentController.js
│       │   ├── logController.js
│       │   ├── analyticsController.js
│       │   └── adminController.js
│       ├── models/             # Mongoose schemas
│       │   ├── user.model.js
│       │   ├── monitor.model.js
│       │   ├── incident.model.js
│       │   ├── log.model.js
│       │   └── analytics.model.js
│       ├── routes/             # Express routers
│       │   ├── authRoutes.js
│       │   ├── monitorRoutes.js
│       │   ├── incidentRoutes.js
│       │   ├── logRoutes.js
│       │   └── analyticsRoutes.js
│       ├── middlewares/        # Auth, error handling, rate limiting
│       ├── services/           # Business logic (monitor checks, alerts, AI)
│       ├── jobs/               # Cron jobs for scheduled monitor checks
│       ├── socket/             # Socket.io setup & real-time events
│       ├── utils/              # Security utilities
│       └── validators/         # Input validation schemas
│
├── Frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # Root component & routing
│       ├── App.css
│       ├── index.css
│       └── assets/
│
├── .gitignore
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) `v9+`
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [Git](https://git-scm.com/)

---

### Backend Setup

```bash
# 1. Navigate to the Backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Create a .env file (see Environment Variables section)
cp .env.example .env

# 4. Start the development server
npm run dev
```

The backend runs on **`http://localhost:3000`** by default.

---

### Frontend Setup

```bash
# 1. Navigate to the Frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Start the Vite dev server
npm run dev
```

The frontend runs on **`http://localhost:5173`** by default.

---

## 🔐 Environment Variables

Create a `.env` file inside the `Backend/` directory with the following keys:

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/upzy
# OR MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/upzy

# Authentication
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# (Optional) Email / Alert service
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 📜 Available Scripts

### Backend (`cd Backend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon (auto-reload) |
| `npm start` | Start server in production mode |

### Frontend (`cd Frontend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

---

## ✨ Complete Features List

### 🔐 **Authentication & Authorization**
| Feature | Description | API Route |
|---------|-------------|-----------|
| User Registration | Email & password-based signup with validation | `POST /api/auth/register` |
| User Login | Login with email/password, JWT token issued | `POST /api/auth/login` |
| JWT Authentication | Secure token-based auth, expires in 1 hour | Middleware: `authMiddleware` |
| Password Reset (OTP) | Secure 6-digit OTP sent via email, 15-min expiry | `POST /api/auth/forget-password` |
| OTP Verification | Verify OTP with brute-force protection (max 5 attempts) | `POST /api/auth/verify-otp` |
| Password Reset | Reset password after OTP verification | `POST /api/auth/reset-password` |
| User Logout | Clears JWT token cookie | `POST /api/auth/logout` |
| Role-based Access | Users have "user" or "admin" roles | User Model field |

### 📡 **Monitor Management**
| Feature | Description | API Route |
|---------|-------------|-----------|
| Create Monitor | Add new URL/API to monitor with custom settings | `POST /api/monitor/create` |
| Get All Monitors | Fetch all monitors for logged-in user (sorted by newest) | `GET /api/monitor` |
| Get Single Monitor | Retrieve detailed info for one monitor | `GET /api/monitor/:monitorId` |
| Update Monitor | Modify monitor settings (URL, interval, headers, etc.) | `PUT /api/monitor/:monitorId/update` |
| Delete Monitor | Remove monitor & related incidents/logs | `DELETE /api/monitor/:monitorId/delete` |
| Toggle Monitor | Pause/Resume monitor (isActive flag) | `PATCH /api/monitor/:monitorId/toggle` |
| Manual Check | Force an immediate health check | `POST /api/monitor/:monitorId/run` |
| Monitor Status | Real-time status (UP/DOWN/DEGRADED/UNKNOWN) | WebSocket events |

#### Monitor Configuration Options:
```javascript
{
  name: string,              // Display name
  url: string,               // Target URL/API endpoint
  method: "GET" | "POST",    // HTTP method
  headers: object,           // Custom headers (e.g., Authorization)
  body: object,              // Request body for POST requests
  expectedStatus: number,    // Expected HTTP status code (default: 200)
  timeout: number,           // Request timeout in ms (default: 5000)
  interval: number,          // Check frequency in seconds (5-3600, default: 15)
  isActive: boolean          // Monitor active/paused state
}
```

### 🚨 **Incident Management**
| Feature | Description | API Route |
|---------|-------------|-----------|
| Auto-detect Incidents | Automatically creates incidents when status changes to DOWN/DEGRADED | Cron Job + MonitorService |
| Get Incidents | Fetch all incidents for a monitor (paginated) | `GET /api/incidents/:monitorId` |
| Get Active Incidents | Fetch unresolved incidents for a monitor | `GET /api/incidents/active/:monitorId` |
| Resolve Incident | Manually mark incident as resolved with end time | `POST /api/incidents/resolve/:incidentId` |
| Delete Incidents | Bulk delete incidents for a monitor | `DELETE /api/incidents/:monitorId` |
| AI Analysis | Auto-generate summary, root cause, suggestions | Incident Model (ai field) |
| Email Alerts | Send email when incident created | Alert Service |

#### Incident Data Structure:
```javascript
{
  monitorId: ObjectId,       // Reference to monitor
  type: "DOWN" | "DEGRADED", // Incident type
  startTime: Date,           // When incident started
  endTime: Date | null,      // When resolved (null if ongoing)
  resolved: boolean,         // Resolution status
  ai: {
    summary: string,         // AI-generated summary
    rootCause: string,       // Detected cause
    suggestion: string       // Recommended action
  }
}
```

### 📊 **Analytics & Reporting**
| Feature | Description | API Route |
|---------|-------------|-----------|
| Uptime % Calculation | Calculates percentage of successful checks | `GET /api/analytics/:monitorId` |
| Error Rate | Percentage of failed checks | Query param: `range` |
| Avg Response Time | Average response time in milliseconds | Response field |
| Total Downtime | Sum of all downtime periods (in minutes) | Response field |
| Time Range Filters | 24h, 7d, 30d analytics | Query: `?range=24h\|7d\|30d` |
| Performance Graph | Historical data points for charting | Response: `graph` array |
| Redis Caching | 60-second cache for analytics performance | Backend optimization |

#### Analytics Response:
```javascript
{
  uptime: 99.85,                  // Uptime percentage
  errorRate: 0.15,                // Error percentage
  avgResponseTime: 234.5,         // Average response time (ms)
  totalDowntimeMinutes: 2.15,     // Total downtime in minutes
  graph: [                        // Historical data for charts
    { totalRequests, downCount, avgResponseTime, date }
  ]
}
```

### 📝 **Logging & Audit Trail**
| Feature | Description | API Route |
|---------|-------------|-----------|
| Auto-log Checks | Each monitor check is logged | Cron Job |
| Log History | Fetch all logs for a monitor | `GET /api/logs/:monitorId` |
| Delete Logs | Bulk delete logs for a monitor | `DELETE /api/logs/:monitorId` |
| 7-Day Retention | Auto-delete logs older than 7 days (TTL index) | MongoDB TTL |
| Log Details | Status, status code, response time, error message | Log Model |

#### Log Data Structure:
```javascript
{
  monitorId: ObjectId,       // Reference to monitor
  status: "UP" | "DOWN" | "DEGRADED", // Check result
  statusCode: number,        // HTTP status code
  responseTime: number,      // Response time (ms)
  errorMessage: string,      // Error details if failed
  createdAt: Date            // When check ran
}
```

### 🔔 **Alerts & Notifications**
| Feature | Description | Configuration |
|---------|-------------|------------------|
| Email Alerts | Send email when incident occurs | SMTP via nodemailer |
| Real-time WebSocket | Instant status updates to connected clients | Socket.io |
| Alert Service | Handles notification dispatch | `services/alertService.js` |

### 👥 **Admin Features**
| Feature | Description | API Route |
|---------|-------------|-----------|
| Admin Dashboard | View all users, monitors, incidents | `GET /api/admin/*` |
| User Management | View/manage system users | Admin Routes |
| System Analytics | Aggregate platform statistics | Admin Routes |

---

## 📊 User Flow (Complete User Journey)

### **1️⃣ Onboarding & Authentication**
```
User Visits App
    ↓
[Not Authenticated?]
    ├─→ Sign Up Page
    │   ├─ Enter: username, email, password
    │   └─ POST /api/auth/register
    │       ↓
    │   [Credentials Validated]
    │       ├─ Account Created
    │       ├─ JWT Token Issued
    │       └─ Redirected to Dashboard
    │
    └─→ Login Page
        ├─ Enter: email, password
        └─ POST /api/auth/login
            ↓
        [Credentials Verified]
            ├─ JWT Token Issued & Stored in Cookie
            └─ Redirected to Dashboard
```

### **2️⃣ Dashboard (Monitor Overview)**
```
Dashboard Loads
    ↓
[Authenticated]
    ├─ GET /api/monitor (fetch all monitors)
    ├─ Display: Monitor list with real-time status
    │  └─ Each monitor shows: name, url, status, last check time
    └─ WebSocket Connected
        ├─ Listen for: "monitor-update", "status-change"
        └─ Live status badges: 🟢 UP, 🔴 DOWN, 🟡 DEGRADED, ⚪ UNKNOWN
```

### **3️⃣ Create Monitor**
```
User Clicks "Add Monitor"
    ↓
Monitor Creation Form
    ├─ Fields:
    │  ├─ Name (display name)
    │  ├─ URL (target endpoint)
    │  ├─ HTTP Method (GET/POST)
    │  ├─ Headers (optional, for auth)
    │  ├─ Body (optional, for POST)
    │  ├─ Expected Status Code (default 200)
    │  ├─ Timeout (default 5000ms)
    │  └─ Check Interval (5-3600 seconds, default 15)
    │
    └─ POST /api/monitor/create
        ├─ Backend Validation
        ├─ Monitor Created in DB
        ├─ Schedule Cron Job
        └─ Response: Monitor object with _id

User sees new monitor in list with status "UNKNOWN"
    ↓
Monitor Check Runs After Interval
    ├─ Status Updates: UP/DOWN/DEGRADED
    └─ WebSocket broadcasts "monitor-update" event
```

### **4️⃣ Monitor Check & Status Update (Cron Job)**
```
Cron Job Triggers (at nextRunAt time)
    ├─ GET request to monitor URL with timeout
    ├─ Compare response status with expectedStatus
    ├─ Calculate response time
    ├─ Log result: Log Model created
    ├─ Determine status: UP / DOWN / DEGRADED
    ├─ Check if status changed
    │  └─ [Status Changed?]
    │     ├─ Create Incident
    │     ├─ Send Email Alert
    │     └─ WebSocket emit "status-change"
    └─ Schedule next check (nextRunAt = now + interval)
```

### **5️⃣ View Monitor Details**
```
User Clicks on Monitor Card
    ↓
GET /api/monitor/:monitorId (single monitor details)
GET /api/analytics/:monitorId?range=24h (analytics)
GET /api/logs/:monitorId (check history)
GET /api/incidents/active/:monitorId (active incidents)
    ↓
Display:
├─ Monitor info & configuration
├─ Real-time status with badge
├─ Uptime % chart (24h/7d/30d)
├─ Response time graph
├─ Recent incidents list
├─ Check history (logs)
└─ WebSocket listeners for live updates
```

### **6️⃣ Incident Response**
```
Incident Created (status changed to DOWN)
    ├─ Email Alert Sent to User
    │  └─ Contains: monitor name, time, suggested action
    └─ WebSocket broadcasts "incident-created"
        ├─ User sees notification
        └─ Incident badge appears on monitor

User Reviews Incident
    ├─ GET /api/incidents/:monitorId (incident history)
    ├─ See: incident type, start time, AI analysis
    └─ View Root Cause & Suggestions

User Resolves Incident
    ├─ Option 1: Auto-resolve (when status returns to UP)
    └─ Option 2: Manual resolve
        └─ POST /api/incidents/resolve/:incidentId
            ├─ Incident marked resolved
            ├─ endTime set
            └─ WebSocket broadcasts "incident-resolved"
```

### **7️⃣ Analytics & Reporting**
```
User Clicks "Analytics" Tab
    ├─ GET /api/analytics/:monitorId?range=24h
    │  ├─ Redis cache checked (60-sec TTL)
    │  └─ If cache miss → calculate from DB
    │
    └─ Display:
       ├─ Uptime %: 99.85%
       ├─ Error Rate: 0.15%
       ├─ Avg Response: 234ms
       ├─ Downtime: 2.15 minutes
       └─ Interactive charts:
          ├─ Uptime timeline
          ├─ Response time trend
          └─ Error rate pattern
```

### **8️⃣ Logout**
```
User Clicks Logout
    ├─ POST /api/auth/logout
    ├─ JWT token cleared
    ├─ WebSocket disconnected
    └─ Redirected to login page
```

---

## 🔄 Backend Architecture & Flows

### **Monitor Check Flow**

```
┌─────────────────────────────────────────────────────────────┐
│                    CRON SCHEDULER                           │
│               (jobs/cron.js - runs every 30s)              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  Query: Find monitors where:                                │
│  • isActive = true                                          │
│  • nextRunAt <= now()                                       │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│          For Each Monitor: Run Health Check                 │
│          (services/monitorService.js)                       │
│                                                              │
│  checkMonitor(monitor) {                                    │
│    1. Make HTTP request to monitor.url                     │
│       • Method: monitor.method (GET/POST)                  │
│       • Headers: monitor.headers                           │
│       • Body: monitor.body (if POST)                       │
│       • Timeout: monitor.timeout                           │
│                                                              │
│    2. Record Response:                                      │
│       • statusCode: actual response status                 │
│       • responseTime: milliseconds                         │
│       • errorMessage: if failed                            │
│                                                              │
│    3. Determine Status:                                     │
│       if (statusCode === expectedStatus && responseTime ok)│
│           status = "UP"                                    │
│       else if (statusCode !== expectedStatus)              │
│           status = "DOWN"                                  │
│       else                                                  │
│           status = "DEGRADED"                              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│           SAVE LOG RECORD                                   │
│                                                              │
│  Log Entry {                                                │
│    monitorId,                                              │
│    status,                                                 │
│    statusCode,                                             │
│    responseTime,                                           │
│    errorMessage,                                           │
│    createdAt: now()                                        │
│  }                                                          │
│                                                              │
│  Note: TTL index auto-deletes logs after 7 days           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│      CHECK STATUS CHANGE & CREATE INCIDENT                 │
│                                                              │
│  if (newStatus !== monitor.status) {                        │
│      monitor.status = newStatus                            │
│      monitor.lastChecked = now()                           │
│      monitor.save()                                        │
│      return { statusChanged: true }                        │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│       UPDATE NEXT RUN TIME                                  │
│                                                              │
│  monitor.nextRunAt = new Date(now + interval * 1000)      │
│  monitor.save()                                            │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    ✅ NEXT CHECK SCHEDULED
```

### **Incident Detection Flow**

```
┌─────────────────────────────────────────────────────────────┐
│          MONITOR CHECK COMPLETED                            │
│          (from Monitor Check Flow above)                    │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│      WAS STATUS CHANGED?                                    │
│      (statusChanged === true)                              │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    ┌─────────────┐
                    │   YES / NO   │
                    └─────────────┘
                    /             \
                   YES             NO
                   ↓               ↓
            [Create Incident] [No Action]
                   ↓
┌─────────────────────────────────────────────────────────────┐
│      INCIDENT DETECTION LOGIC                               │
│      (services/incidentService.js)                          │
│                                                              │
│  if (newStatus === "DOWN" || newStatus === "DEGRADED") {   │
│      1. Check if active incident exists                    │
│         • GET incident where resolved = false              │
│         • If exists → update only                          │
│         • If not → create new                              │
│                                                              │
│      2. Create/Update Incident {                           │
│         monitorId,                                         │
│         type: "DOWN" | "DEGRADED",                         │
│         startTime: now(),                                  │
│         resolved: false,                                   │
│         ai: { }  ← AI analysis optional                    │
│      }                                                      │
│                                                              │
│  } else if (newStatus === "UP") {                          │
│      1. Find active incident for this monitor              │
│      2. If exists:                                          │
│         incident.resolved = true                          │
│         incident.endTime = now()                          │
│         incident.save()                                    │
│         → Incident AUTO-RESOLVED                           │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│          TRIGGER ALERTS                                     │
│          (services/alertService.js)                         │
│                                                              │
│  if (statusChanged === "DOWN") {                            │
│      1. Send Email Alert                                   │
│         • To: User's email                                 │
│         • Subject: "Alert: {monitorName} is DOWN"          │
│         • Body: includes incident details                  │
│                                                              │
│      2. WebSocket Broadcast                                │
│         • Event: "incident-created"                        │
│         • Data: { monitorId, incident }                    │
│  }                                                          │
│                                                              │
│  if (statusChanged === "UP") {                             │
│      1. Send Recovery Email                                │
│      2. WebSocket Broadcast                                │
│         • Event: "incident-resolved"                       │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    ✅ ALERTS SENT
```

### **Real-time WebSocket Flow**

```
┌─────────────────────────────────────────────────────────────┐
│          FRONTEND ESTABLISHES CONNECTION                    │
│                                                              │
│  import io from 'socket.io-client'                         │
│  const socket = io('http://localhost:3000')                │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│          BACKEND ACCEPTS CONNECTION                         │
│          (socket/socket.js)                                 │
│                                                              │
│  io.on('connection', (socket) => {                          │
│      console.log('Client connected:', socket.id)           │
│  })                                                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
        ┌────────────────────────────────────────┐
        │  LISTENING FOR EVENTS                  │
        ├────────────────────────────────────────┤
        │                                        │
        │  Frontend listens for:                │
        │  • monitor-update                     │
        │  • status-change                      │
        │  • incident-created                   │
        │  • incident-resolved                  │
        │                                        │
        └────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│    BACKEND BROADCASTS AFTER MONITOR CHECK                  │
│                                                              │
│  // In cron job or API endpoint:                            │
│  const io = getIO()                                        │
│  io.emit('monitor-update', {                              │
│      monitorId,                                           │
│      status: "UP" | "DOWN" | "DEGRADED",                  │
│      lastChecked,                                         │
│      responseTime                                         │
│  })                                                        │
│                                                              │
│  io.emit('incident-created', {                            │
│      monitorId,                                           │
│      incident: { ... }                                    │
│  })                                                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│    FRONTEND RECEIVES & UPDATES UI                          │
│                                                              │
│  socket.on('monitor-update', (data) => {                   │
│      setMonitors(prev =>                                   │
│          prev.map(m =>                                     │
│              m._id === data.monitorId                      │
│                  ? { ...m, status: data.status }           │
│                  : m                                       │
│          )                                                 │
│      )                                                     │
│  })                                                        │
│                                                              │
│  socket.on('incident-created', (data) => {               │
│      showNotification(`Incident: ${data.monitorId}`)      │
│  })                                                        │
└─────────────────────────────────────────────────────────────┘
```

### **Analytics & Uptime Calculation Flow**

```
┌─────────────────────────────────────────────────────────────┐
│    Frontend requests: GET /api/analytics/:monitorId         │
│    Query params: ?range=24h|7d|30d                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│    BACKEND ANALYTICS CALCULATION                           │
│    (controllers/analyticsController.js)                     │
│                                                              │
│  1. SECURITY: Verify monitor belongs to user              │
│  2. CACHE CHECK: Look in Redis                            │
│     • Key: analytics:{monitorId}:{range}                  │
│     • TTL: 60 seconds                                     │
│     └─ If cache hit → return cached data                 │
│                                                              │
│  3. CALCULATE DATE RANGE:                                  │
│     • 24h: startDate = now() - 24 hours                   │
│     • 7d: startDate = now() - 7 days                      │
│     • 30d: startDate = now() - 30 days                    │
│                                                              │
│  4. AGGREGATE LOG DATA:                                    │
│     • Query: Logs for this monitor within date range      │
│     • Sum: totalRequests, downCount, latencies            │
│     • Calc: total = sum(totalRequests)                    │
│     • Calc: totalDown = sum(downCount)                    │
│     • Calc: totalLatency = sum(avgResponseTime *          │
│                                totalRequests)             │
│                                                              │
│  5. QUERY INCIDENTS:                                       │
│     • Get incidents within date range                     │
│     • For each: calculate downtime duration               │
│     • Sum all downtime                                    │
│                                                              │
│  6. CALCULATE METRICS:                                     │
│     • uptime % = ((total - totalDown) / total) * 100      │
│     • errorRate % = (totalDown / total) * 100             │
│     • avgResponseTime = totalLatency / total               │
│     • totalDowntimeMinutes = totalDowntime / (1000 * 60)  │
│                                                              │
│  7. BUILD GRAPH DATA:                                      │
│     • Return analytics array with time-series data         │
│     • For charting: X-axis (time), Y-axis (values)        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│    STORE IN REDIS CACHE                                    │
│                                                              │
│  redis.set(                                                │
│      'analytics:monitorId:24h',                            │
│      JSON.stringify(response),                             │
│      'EX',                                                 │
│      60  // 60 second TTL                                  │
│  )                                                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│    RETURN TO FRONTEND                                      │
│                                                              │
│  {                                                          │
│      uptime: 99.85,                                        │
│      errorRate: 0.15,                                      │
│      avgResponseTime: 234.5,                               │
│      totalDowntimeMinutes: 2.15,                           │
│      graph: [                                              │
│          { totalRequests, downCount, avgResponseTime, date}│
│      ]                                                     │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 Complete API Documentation

### Authentication Routes — `/api/auth`

#### 1. **Register User** `POST /api/auth/register`
```javascript
// Request
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// Success Response (201)
{
  "message": "User registered successfully",
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### 2. **Login User** `POST /api/auth/login`
```javascript
// Request
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// Success Response (200)
{
  "message": "Login successful",
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
// Cookie: token=<JWT_TOKEN> (httpOnly, secure, sameSite=strict)
```

#### 3. **Logout User** `POST /api/auth/logout`
```javascript
// Success Response (200)
{
  "message": "Logout successful",
  "success": true
}
```

#### 4. **Forget Password** `POST /api/auth/forget-password`
```javascript
// Request
{
  "email": "john@example.com"
}

// Success Response (200)
{
  "message": "OTP sent to your email",
  "success": true
}
```

#### 5. **Verify OTP** `POST /api/auth/verify-otp`
```javascript
// Request
{
  "otp": "123456"
}

// Success Response (200)
{
  "message": "OTP verified successfully",
  "success": true
}
```

#### 6. **Reset Password** `POST /api/auth/reset-password`
```javascript
// Request
{
  "newPassword": "NewSecurePass123!"
}

// Success Response (200)
{
  "message": "Password reset successfully",
  "success": true
}
```

---

### Monitor Routes — `/api/monitor`

#### 1. **Get All Monitors** `GET /api/monitor`
```javascript
// Success Response (200)
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Google API",
    "url": "https://api.google.com/status",
    "method": "GET",
    "status": "UP",
    "lastChecked": "2026-05-03T10:30:45.000Z",
    "isActive": true,
    "interval": 15
  }
]
```

#### 2. **Create Monitor** `POST /api/monitor/create`
```javascript
// Request
{
  "name": "My API",
  "url": "https://my-api.com/health",
  "method": "GET",
  "expectedStatus": 200,
  "timeout": 5000,
  "interval": 30
}

// Success Response (201)
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "My API",
  "status": "UNKNOWN",
  "isActive": true
}
```

#### 3. **Get Single Monitor** `GET /api/monitor/:monitorId`
#### 4. **Update Monitor** `PUT /api/monitor/:monitorId/update`
#### 5. **Delete Monitor** `DELETE /api/monitor/:monitorId/delete`
#### 6. **Toggle Monitor** `PATCH /api/monitor/:monitorId/toggle`
#### 7. **Manual Run** `POST /api/monitor/:monitorId/run`

---

### Incidents Routes — `/api/incidents`

#### 1. **Get Incidents** `GET /api/incidents/:monitorId`
```javascript
// Success Response (200)
[
  {
    "_id": "607f1f77bcf86cd799439014",
    "monitorId": "507f1f77bcf86cd799439013",
    "type": "DOWN",
    "startTime": "2026-05-03T10:15:00.000Z",
    "endTime": "2026-05-03T10:25:30.000Z",
    "resolved": true
  }
]
```

#### 2. **Get Active Incident** `GET /api/incidents/active/:monitorId`
#### 3. **Resolve Incident** `POST /api/incidents/resolve/:incidentId`
#### 4. **Delete Incidents** `DELETE /api/incidents/:monitorId`

---

### Logs Routes — `/api/logs`

#### 1. **Get Logs** `GET /api/logs/:monitorId`
```javascript
// Success Response (200)
[
  {
    "_id": "707f1f77bcf86cd799439015",
    "monitorId": "507f1f77bcf86cd799439013",
    "status": "UP",
    "statusCode": 200,
    "responseTime": 234,
    "createdAt": "2026-05-03T10:30:45.000Z"
  }
]
```

#### 2. **Delete Logs** `DELETE /api/logs/:monitorId`

---

### Analytics Routes — `/api/analytics`

#### 1. **Get Analytics** `GET /api/analytics/:monitorId?range=24h`
```javascript
// Success Response (200)
{
  "uptime": 99.85,
  "errorRate": 0.15,
  "avgResponseTime": 234.5,
  "totalDowntimeMinutes": 2.15,
  "graph": [ ... ]
}
```

---

## 🔌 WebSocket Events (Real-time Communication)

### **Frontend Setup**
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  autoConnect: true,
  reconnection: true
});

socket.on('connect', () => console.log('Connected'));
socket.on('disconnect', () => console.log('Disconnected'));
```

### **Events**

#### 1. **monitor-update** — Monitor status updated
```javascript
socket.on('monitor-update', (data) => {
  console.log(`${data.monitorId} is now ${data.status}`);
  // { monitorId, status, lastChecked, responseTime }
});
```

#### 2. **status-change** — Status changed
```javascript
socket.on('status-change', (data) => {
  console.log(`Changed from ${data.oldStatus} to ${data.newStatus}`);
  // { monitorId, oldStatus, newStatus, timestamp }
});
```

#### 3. **incident-created** — New incident
```javascript
socket.on('incident-created', (data) => {
  console.log(`Incident on ${data.monitorId}`);
  // { monitorId, incident { _id, type, startTime, ai } }
});
```

#### 4. **incident-resolved** — Incident resolved
```javascript
socket.on('incident-resolved', (data) => {
  console.log(`Resolved after ${data.duration}`);
  // { monitorId, incidentId, duration, timestamp }
});
```

---

## 🎯 Frontend Integration Guide

### **Response Format**
```javascript
// Success
{ "success": true, "message": "...", "data": { ... } }

// Error
{ "success": false, "error": "...", "message": "..." }
```

### **Authentication**
```javascript
// Login
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, password })
});

// All subsequent requests include JWT in cookie automatically
```

### **Fetching Monitors**
```javascript
const monitors = await fetch('/api/monitor', {
  credentials: 'include'
}).then(r => r.json());
```

### **Creating Monitor**
```javascript
const res = await fetch('/api/monitor/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    name, url, method, interval, expectedStatus
  })
});
```

### **Real-time Updates with WebSocket**
```javascript
socket.on('monitor-update', (data) => {
  setMonitors(prev =>
    prev.map(m => m._id === data.monitorId
      ? { ...m, status: data.status }
      : m)
  );
});
```

### **Analytics Display**
```javascript
const analytics = await fetch(
  `/api/analytics/${monitorId}?range=24h`,
  { credentials: 'include' }
).then(r => r.json());

// Use analytics.graph for charting
```

### **Error Handling**
```javascript
if (response.status === 429) alert('Rate limited');
if (response.status === 401) window.location.href = '/login';
if (response.status === 404) alert('Not found');
```

### **Rate Limits**
| Endpoint | Limit | Window |
|----------|-------|--------|
| Login | 10/15min | Per IP |
| Register | 5/15min | Per IP |
| Monitor Create | 50/1h | Per user |
| Monitor Read | 100/1h | Per user |

---

### Branching Strategy

We follow a simple **feature-branch workflow**:

```
main          ← Production-ready, stable code only
└── dev       ← Integration branch (merge features here first)
    ├── feature/<feature-name>   ← New features
    ├── fix/<bug-name>           ← Bug fixes
    └── chore/<task-name>        ← Config, cleanup, docs
```

**Branch naming examples:**
```
feature/real-time-alerts
feature/monitor-dashboard
fix/socket-reconnect-issue
fix/jwt-expiry-bug
chore/update-readme
chore/add-eslint-rules
```

---

### Commit Message Convention

Follow the **Conventional Commits** standard:

```
<type>(<scope>): <short description>
```

| Type | When to use |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `chore` | Maintenance, config, tooling |
| `docs` | Documentation changes only |
| `style` | Formatting, no logic changes |
| `refactor` | Code restructured, no new feature or fix |
| `test` | Adding or updating tests |

**Examples:**
```bash
git commit -m "feat(monitor): add cron job for health checks"
git commit -m "fix(auth): resolve JWT token expiry issue"
git commit -m "docs(readme): update environment variables section"
git commit -m "chore(deps): upgrade express to v5"
```

---

### How to Push Code

Follow these steps every time you push new code:

```bash
# Step 1: Make sure you're on your feature branch
git checkout -b feature/your-feature-name
# (or if branch exists)
git checkout feature/your-feature-name

# Step 2: Pull the latest changes from dev to stay in sync
git pull origin dev

# Step 3: Stage your changes
git add .
# OR stage specific files
git add Backend/src/controllers/monitorcontroller.js

# Step 4: Commit with a meaningful message
git commit -m "feat(monitor): implement uptime check scheduler"

# Step 5: Push your branch to remote
git push origin feature/your-feature-name
```

Then open a **Pull Request** from `feature/your-feature-name` → `dev` on GitHub.

---

### Pull Request Guidelines

When opening a PR:

- ✅ Use a **clear, descriptive title** (same as your branch name intent)
- ✅ Add a short **description** of what you changed and why
- ✅ Link any related issues: `Closes #12`
- ✅ Make sure the code **runs without errors** before submitting
- ✅ Keep PRs **small and focused** — one feature or fix per PR
- ❌ Do NOT push directly to `main` or `dev`
- ❌ Do NOT merge your own PR without a review (if working in a team)

**PR Template:**
```markdown
## What does this PR do?
Brief description of the change.

## Type of change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Docs / Chore

## How to test?
Steps to verify the change works correctly.

## Screenshots (if UI changes)
Add screenshots or screen recordings if applicable.
```

---

## 🧹 Code Style Guidelines

### General
- Use **ES Modules** (`import/export`) — both frontend and backend use `"type": "module"`
- Use `async/await` over `.then()` chains
- Always handle errors with `try/catch` in controllers
- Keep functions **small and single-purpose**

### Naming Conventions
| Item | Convention | Example |
|------|-----------|---------|
| Files | camelCase | `monitorcontroller.js` |
| Variables | camelCase | `const monitorData` |
| Functions | camelCase | `getMonitorById()` |
| Constants | UPPER_SNAKE | `const MAX_RETRIES = 3` |
| React Components | PascalCase | `MonitorCard.jsx` |
| CSS Classes | kebab-case | `.monitor-card` |

### Backend Best Practices
- Validate all incoming request bodies using the `validators/` layer
- Return consistent JSON responses:
  ```json
  { "success": true, "data": { ... } }
  { "success": false, "message": "Error description" }
  ```
- Never expose stack traces or internal errors to the client

### Frontend Best Practices
- Keep components in their own files
- Use React hooks for state management
- Run `npm run lint` before committing

---

## 🔒 What NOT to Commit

The `.gitignore` already covers these, but as a reminder:

```
node_modules/      ← Never commit this — install with npm install
.env               ← Contains secrets — use .env.example instead
dist/              ← Build output
.DS_Store          ← Mac system files
*.log              ← Log files
```

---

## 👥 Contributors

| Name | Role |
|------|------|
| Your Name | Full-Stack Developer |

---

## 📄 License

This project was built for a Hackathon. All rights reserved.

---

> Made with ❤️ during the Hackathon
