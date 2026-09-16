# Alka Industry – Solar Rooftop Consumer Management System

Production-ready Rooftop Solar Consumer Management System built for **Alka Industry** to manage consumers end-to-end under India's **PM Surya Ghar** Rooftop Solar (RTS) subsidy program.

---

## 📁 1. Project Structure

```text
Alka-Industry-Full-Project/
├── mobile/                 # React Native + Expo Android Mobile App (TypeScript)
│   ├── src/
│   │   ├── api/            # Dynamic Axios REST API Client
│   │   ├── components/     # UI Design System Components
│   │   ├── navigation/     # AppNavigator & Bottom Tab Bar (5 icons)
│   │   ├── screens/        # 10 App Screens (Splash, Login, Dashboard, Consumers, Add, Details, Docs, Camera, Sync, Profile)
│   │   ├── store/          # Zustand State Stores (Auth, Consumer, Offline Queue)
│   │   └── theme/          # Design System Theme Tokens (Navy, Solar Gold, Green, Blue)
│   ├── app.json            # Expo App Configuration (Permissions, Plugins, Package Name)
│   ├── eas.json            # EAS Build Profile for Standalone Android APK
│   ├── package.json        # Mobile Dependencies
│   └── tsconfig.json       # TypeScript Configuration
│
├── server/                 # Flask REST API Backend (Python)
│   ├── app/
│   │   ├── models.py       # SQLAlchemy Models (User, Consumer, Status, Documents, AuditLog)
│   │   ├── routes/         # REST Endpoints (Auth, Consumers, Statuses, Uploads, Sync)
│   │   ├── config.py       # Environment Configuration
│   │   └── middleware.py   # JWT Authentication Middleware
│   ├── alka_solar.db       # Demo SQLite Database
│   ├── main.py             # Server Application Entry Point
│   ├── seed.py             # Initial Database Seeder
│   ├── test_api.py         # Automated REST API Test Suite
│   └── requirements.txt    # Python Dependencies
│
├── client/                 # Web Management Portal (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── pages/          # SolarRooftopPortal.jsx & Dashboard Views
│   │   └── App.jsx         # Web Routing
│   └── package.json        # Web Client Dependencies
│
├── README.md               # Complete Project Documentation & Deployment Guide
└── package.json            # Monorepo Root Script Runner
```

---

## 🚀 2. How to Start the Flask Backend Server

```bash
cd server

# Install Python dependencies
pip install -r requirements.txt

# Seed initial database (Admin & Agent demo accounts + sample RTS consumers)
python seed.py

# Start Flask API server (runs on http://localhost:5000)
python main.py
```

---

## 💻 3. How to Start the Web Client

```bash
cd client

# Install Node dependencies
npm install

# Start Vite dev server (runs on http://localhost:5173)
npm run dev
```

---

## 📱 4. How to Start the Expo Mobile App

```bash
cd mobile

# Install Node dependencies
npm install

# Configure environment variables (specify your server IP or domain)
cp .env.example .env

# Start Expo Mobile app
npx expo start
```
- Press `a` to launch on Android Emulator, or scan the QR code with **Expo Go** on a physical Android device connected to the same LAN.

---

## 📦 5. How to Build the Standalone Android APK

To build an `.apk` file ready to install directly on an Android device:

```bash
cd mobile

# 1. Log in to Expo account
npx eas-cli login

# 2. Trigger EAS APK compilation
npx eas-cli build --platform android --profile preview
```

---

## ⚙️ 6. Required Environment Variables

### Mobile App (`mobile/.env`)
```ini
# Production Server API Base URL (Must use local network IP or production domain for physical phones)
EXPO_PUBLIC_API_URL=http://192.168.1.100:5000/api
```

### Flask Server (`server/.env`)
```ini
SECRET_KEY=alka_solar_production_secret_key_2026
JWT_SECRET_KEY=alka_solar_jwt_token_secret_key_2026
DATABASE_URL=sqlite:///alka_solar.db
FRONTEND_URL=http://localhost:5173
```

---

## 🔑 7. Demo Accounts (Included for Testing)

| Role | Email Address | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@alkaindustry.com` | `Admin@123` | Full control, view all records, reassign agents, audit history |
| **Field Agent 1** | `agent1@alkaindustry.com` | `Agent@123` | Add/update assigned consumers, capture geotagged photos, offline queue |
| **Field Agent 2** | `agent2@alkaindustry.com` | `Agent@123` | Manage assigned consumers, document uploads, dual status toggles |

---

## 🌐 8. Production Deployment Requirements & Important Notes

> [!IMPORTANT]
> **Mobile App API URL Configuration**: When installing the compiled Android APK on a physical phone, `localhost` or `127.0.0.1` refers to the phone itself, NOT your server machine. Ensure `EXPO_PUBLIC_API_URL` in `mobile/.env` is set to your server's reachable public domain or local network IP (e.g. `http://192.168.1.100:5000/api`) before running `eas build`.

---

## 📜 9. License & Ownership
Copyright © 2026 **Alka Industry Solar Solutions**. All rights reserved.
