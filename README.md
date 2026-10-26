# NTU Cyber Security Society — Official Web Platform

Official website and administrative portal for the **Cyber Security Society** at **National Textile University (NTU)**, Faisalabad, Pakistan.

---

## 🛡️ Project Overview
This repository contains the full-stack web application designed with a **clean-light, editorial, modern academic technology** aesthetic. It provides:
- **Public Showcase**: Society focus areas (Penetration Testing, Digital Forensics, CTF, Network Security), faculty leadership, executive directory, event calendars, technical projects, and curated learning roadmaps.
- **Membership & Contact**: Interactive student membership application form with real-time validation.
- **Administrative Portal (`/admin`)**: Secure interface powered by Supabase Auth for managing team rosters, scheduling events, publishing projects, and reviewing membership applications.
- **Storage & Database**: PostgreSQL schemas with Row-Level Security (RLS) and Supabase Storage bucket configurations.

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
*(Note: If Supabase credentials are not set, the app will run gracefully using local mock data.)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
