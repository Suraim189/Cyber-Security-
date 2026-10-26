# NTU Cyber Security Society — Official Web Platform

Official website and administrative portal for the **Cyber Security Society** at **National Textile University (NTU)**, Faisalabad, Pakistan.

---

## 🛡️ Project Overview
This repository contains the full-stack web application designed with an **elite, award-level cybersecurity research & defense command** aesthetic. It provides:
- **Interactive 3D Threat Matrix**: Interactive Three.js particle globe with simulated attack arcs and real-time defense telemetry HUD.
- **Functional Defense Terminal**: Interactive browser shell supporting command parsing (`help`, `about`, `team`, `events`, `ctf`, `whoami`, `nmap`, `matrix`, `ping`, `sudo`), tab autocomplete, and history navigation.
- **Live CTF Arena**: Jeopardy wargames matrix with server-side SHA-256 flag validation, rate-limiting, first-blood tracking, and interactive leaderboard.
- **Direct Event Registration**: In-app seat reservation with instant RFC 5545 `.ics` iCalendar export and attendee confirmation codes.
- **Security Wings & Roster**: 3D hover-tilt profile cards with wing classifications (Red Team, Blue Team, CTF, Executive, Advisor).
- **Public Showcase & Resources**: Society focus areas, faculty mentorship, student CVE research, and curated tactical learning roadmaps.
- **Administrative Portal (`/admin`)**: Secure interface powered by Supabase Auth for managing team rosters, scheduling events, publishing projects, and reviewing membership applications.

---

## 🔒 Security Architecture & Protections

As an official university cybersecurity organization, defensive posture is non-negotiable:

| Layer | Implementation | Description |
| :--- | :--- | :--- |
| **HTTP Security Headers** | `next.config.mjs` | HSTS (`max-age=63072000; preload`), X-Frame-Options (`DENY`), X-Content-Type-Options (`nosniff`), Referrer-Policy (`strict-origin-when-cross-origin`), Permissions-Policy. |
| **Server Flag Validation** | `/api/ctf/submit` | CTF challenge flags are hashed with SHA-256 and never shipped to the client bundle. Submissions are rate-limited to prevent automated brute-forcing. |
| **Input Sanitization** | `zod` schemas | Strict validation schemas on event registrations, contact messaging, and student membership forms. |
| **RFC 9116 Compliance** | `/.well-known/security.txt` | Standardized vulnerability reporting metadata with faculty oversight contact and PGP encryption details. |
| **Vulnerability Policy** | `/security` | Public Vulnerability Disclosure Policy (VDP) with Safe Harbor protection for students and ethical security researchers. |
| **Database Protection** | Supabase PostgreSQL RLS | Strict Row Level Security policies enforce read/write access boundaries. Public tables are read-only; admin tables require authenticated sessions. |
| **Client Bundle Security** | Zero-Secret Bundling | Service-role keys and backend credentials are never exposed to browser client chunks. |

---

## 🤖 Persistent AI Agent Memory
This project uses a file-based AI memory system to allow multiple agents to collaborate seamlessly:
- **[AGENTS.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/AGENTS.md)** — Core agent operating rules and conventions
- **[task.txt](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/task.txt)** — Current actionable task queue
- **[docs/ai-memory/](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/)** — Project overview, architecture, current state, progress logs, decisions, and handoffs.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Note: If Supabase credentials are not set, the app runs gracefully using resilient local mock data.)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
