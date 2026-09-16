# Alka Industry – Developer Handoff & Deployment Manual

Welcome to the **Alka Industry Solar Rooftop Consumer Management System** handoff package. This document contains everything a developer or DevOps engineer needs to deploy, run, and build the application for production.

---

## 🏗️ 1. System Architecture Overview

```text
                                ┌──────────────────────────────────────────┐
                                │     React Native + Expo Mobile App       │
                                │  (TypeScript, Zustand, Camera, GPS, DB)  │
                                └────────────────────┬─────────────────────┘
                                                     │ HTTP REST API
                                                     ▼
┌──────────────────────────────┐        ┌──────────────────────────────────┐
│      Web Client Portal       │◄──────►│       Flask REST API Backend     │
│  (React, Vite, Tailwind CSS) │        │ (Python, SQLAlchemy, JWT Auth)   │
└──────────────────────────────┘        └────────────────────┬─────────────┘
                                                             │
                                                             ▼
                                                ┌──────────────────────────┐
                                                │   SQLite / MySQL / Postgres  │
                                                └──────────────────────────┘
```

---

## 🚀 2. Quick-Start Local Development

### A. Backend API Server (`server/`)
```bash
cd server

# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Seed initial SQLite database with demo accounts & consumers
python seed.py

# 3. Start local API server (runs on http://localhost:5000)
python main.py
```

### B. Mobile Application (`mobile/`)
```bash
cd mobile

# 1. Install Node dependencies
npm install

# 2. Configure environment variables (point EXPO_PUBLIC_API_URL to server)
cp .env.example .env

# 3. Start Expo development server
npx expo start
```
- Press `a` for Android Emulator, or scan the QR code with **Expo Go** on a physical Android phone connected to the same WiFi/LAN network.

### C. Web Client Portal (`client/`)
```bash
cd client

# 1. Install Node dependencies
npm install

# 2. Start Vite dev server (runs on http://localhost:5173)
npm run dev
```

---

## 📦 3. How to Build the Standalone Android APK

To generate a standalone `.apk` binary file for testing or client installation:

```bash
cd mobile

# 1. Set EXPO_PUBLIC_API_URL in mobile/.env to your production server IP/domain:
# EXPO_PUBLIC_API_URL=http://<PRODUCTION_SERVER_IP>:5000/api

# 2. Log in to Expo account
npx eas-cli login

# 3. Trigger EAS Android APK preview build
npx eas-cli build --platform android --profile preview
```
- The Expo build service will output a direct `.apk` download link when compilation completes.

---

## ⚙️ 4. Environment Configuration Variables

### Mobile App Environment (`mobile/.env`)
```ini
# Production Server API Base URL (Must use server IP/domain for real mobile phones)
EXPO_PUBLIC_API_URL=http://192.168.1.100:5000/api
```

### Backend Server Environment (`server/.env`)
```ini
SECRET_KEY=alka_solar_production_secret_key_2026
JWT_SECRET_KEY=alka_solar_jwt_token_secret_key_2026
DATABASE_URL=sqlite:///alka_solar.db
FRONTEND_URL=http://localhost:5173
```

---

## 🔑 5. Pre-Configured Demo Accounts

| Role | Email Address | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@alkaindustry.com` | `Admin@123` | Full system control, assign agents, edit all records, audit logs |
| **Field Agent 1** | `agent1@alkaindustry.com` | `Agent@123` | Add/update assigned consumers, capture geotagged photos, offline queue |
| **Field Agent 2** | `agent2@alkaindustry.com` | `Agent@123` | Manage assigned consumers, document uploads, status toggles |

---

## 🧪 6. Automated Test Suites

To verify backend API integrity and database persistence:
```bash
cd server
python test_api.py
python test_e2e_mobile_backend.py
```

---

## 🛡️ 7. Developer Handoff Checklist
- [x] All 10 mobile screens implemented & tested
- [x] Dual status tracking (RTS Process & National Portal Approval)
- [x] Geotagged camera photo capture with lat/long metadata
- [x] Local SQLite offline sync engine
- [x] Zero hardcoded production secrets
- [x] EAS APK configuration ready (`eas.json`)

Copyright © 2026 **Alka Industry Solar Solutions**. All rights reserved.
