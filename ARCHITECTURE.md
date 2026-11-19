# Lead Evo — JavaScript / JSX Full-Stack Architecture

This project is written in standard **JavaScript / JSX** with decoupled **Frontend Client** (`src/`) and **Backend API Server** (`server/`) layers.

---

## 1. High-Level Architecture Overview

```
                      +---------------------------------------+
                      |               Client                  |
                      |    React 19 + Tailwind CSS (JSX)      |
                      |               `src/`                  |
                      +-------------------+-------------------+
                                          |
                                          | HTTP / REST API calls
                                          | via `src/services/api.js`
                                          v
                      +---------------------------------------+
                      |             API Router                |
                      |        `server/routes/index.js`       |
                      +-------------------+-------------------+
                                          |
                      +-------------------+-------------------+
                      |               Backend                 |
                      |     Express.js + Node (`server/`)     |
                      |   - Modular Controllers (`.js`)       |
                      |   - JWT Auth Middleware               |
                      |   - In-Memory / Atlas Database Store  |
                      |   - Decoupled Pure Analytics Engine   |
                      +---------------------------------------+
```

---

## 2. Directory Structure & Boundaries

### Frontend: `/src` (JavaScript / JSX)
The frontend is exclusively responsible for user interface, state presentation, and user interaction.
- **`src/main.jsx`**: React 19 entry point.
- **`src/App.jsx`**: Main application container.
- **`src/components/*.jsx`**: React UI components (Dashboard, Leads Pipeline, Outreach Dial, Auth Screen, Evolution Pricing Overlay, Reviews & FAQ modals, SEO Audit view, Meeting view, etc.).
- **`src/services/api.js`**: Dedicated frontend API service layer. All network requests to `/api/*` are centralized here with automatic Bearer JWT header inclusion and standardized error handling.
- **`src/utils/*.js`**: Client-side UI utilities (form validators, password strength calculators, profile helpers, and test suites).

### Backend: `/server` (JavaScript ES Modules)
The backend is a standalone Express server layer with zero dependencies on React or `src/`.
- **`server.js`**: Root server entry point mounting Express, API routes, and Vite dev middleware.
- **`server/routes/*.js`**: Express route definitions organized by domain:
  - `auth.routes.js`: Authentication (`/api/auth/login`, `/api/auth/register`, `/api/auth/me`)
  - `leads.routes.js`: Lead operations (`/api/leads`, `/api/leads/:id`, `/api/leads/batch-outreach`, `/api/leads/import-csv`, `/api/leads/batch-create`)
  - `meetings.routes.js`: Booking and calendar queries (`/api/meetings`, `/api/meetings/book`)
  - `seo.routes.js`: SEO auditing engine (`/api/seo/history`, `/api/seo/audit`)
  - `analytics.routes.js`: Pipeline funnel breakdown & real-time telemetry (`/api/analytics/realtime`)
  - `db.routes.js`: MongoDB Atlas connection & diagnostics (`/api/db/status`, `/api/db/connect`)
  - `index.js`: Aggregator mounting all sub-routes.
- **`server/controllers/*.js`**: Controller classes encapsulating business logic:
  - `auth.controller.js`
  - `leads.controller.js`
  - `meetings.controller.js`
  - `seo.controller.js`
  - `analytics.controller.js`
  - `db.controller.js`
- **`server/middleware/auth.middleware.js`**: Bearer token JWT verification.
- **`server/utils/analytics.js`**: Standalone server-side analytics and funnel calculation logic.
- **`server/db.js`**: Resilient persistent in-memory data store with optional MongoDB Atlas sync.

---

## 3. Communication Contract

All communication between frontend and backend occurs over HTTP REST endpoints prefixed with `/api`.

| Domain | Method | Endpoint | Description |
|---|---|---|---|
| **Auth** | `POST` | `/api/auth/login` | Login with email & password |
| **Auth** | `POST` | `/api/auth/register` | Register new account |
| **Auth** | `GET` | `/api/auth/me` | Fetch authenticated user profile |
| **Auth** | `PUT` | `/api/user/profile` | Update user settings and profile |
| **Leads** | `GET` | `/api/leads` | Search and filter pipeline leads |
| **Leads** | `POST` | `/api/leads` | Create single lead |
| **Leads** | `PUT` | `/api/leads/:id` | Update lead details |
| **Leads** | `DELETE` | `/api/leads/:id` | Delete lead |
| **Leads** | `POST` | `/api/leads/batch-outreach` | Trigger bulk WhatsApp blast |
| **Leads** | `POST` | `/api/leads/import-csv` | Simulate CSV bulk import |
| **Leads** | `POST` | `/api/leads/batch-create` | Batch import discovered leads |
| **Prospects** | `POST` | `/api/prospects/discover` | AI Prospect Discovery search |
| **Meetings** | `GET` | `/api/meetings` | Retrieve scheduled meetings |
| **Meetings** | `POST` | `/api/meetings/book` | Book demo / discovery call |
| **SEO** | `GET` | `/api/seo/history` | Fetch past SEO scan results |
| **SEO** | `POST` | `/api/seo/audit` | Run instant website audit |
| **Analytics** | `GET` | `/api/analytics/realtime` | Funnel metrics & pipeline KPIs |
| **DB** | `GET` | `/api/db/status` | Database health & cluster status |
| **DB** | `POST` | `/api/db/connect` | Connect to MongoDB Atlas URI |

---

## 4. Isolation Guarantees

1. **Pure JavaScript / JSX**: All components use `.jsx`, server code uses `.js`. No TypeScript compilation or type barriers.
2. **No Frontend Leaks in Server**: `server/` does not import any file from `src/`.
3. **No Backend Leaks in Frontend**: `src/` does not import any file from `server/`.
4. **Decoupled API Client**: Frontend components never use raw inline URLs; all communication goes through `src/services/api.js`.
