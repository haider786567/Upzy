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
- [API Routes](#api-routes)
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

Key Features:
- 🟢 Real-time monitor status via WebSockets
- 🔔 Incident alerts and logging
- 📊 Response time tracking
- 👤 User authentication & authorization
- 📁 Full incident & log history

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
│       │   └── logController.js
│       ├── models/             # Mongoose schemas
│       │   ├── user.model.js
│       │   ├── monitor.model.js
│       │   ├── incident.model.js
│       │   └── log.model.js
│       ├── routes/             # Express routers
│       │   ├── authRoutes.js
│       │   ├── monitorRoutes.js
│       │   ├── incidentRoutes.js
│       │   └── logRoutes.js
│       ├── middlewares/        # Auth, error handling, etc.
│       ├── services/           # Business logic / external integrations
│       ├── jobs/               # Cron jobs / scheduled monitor checks
│       ├── socket/             # Socket.io setup & events
│       │   └── socket.js
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

## 🌐 API Routes

### Auth Routes — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login & receive JWT token |
| POST | `/logout` | Logout user |

### Monitor Routes — `/api/monitors`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all monitors for user |
| POST | `/` | Create a new monitor |
| GET | `/:id` | Get a single monitor |
| PUT | `/:id` | Update a monitor |
| DELETE | `/:id` | Delete a monitor |

### Incident Routes — `/api/incidents`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all incidents |
| GET | `/:id` | Get a specific incident |

### Log Routes — `/api/logs`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all logs |
| GET | `/:monitorId` | Get logs for a specific monitor |

---

## 🌿 Git Workflow & Contribution Guidelines

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
