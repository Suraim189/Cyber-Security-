# AGENTS.md — Permanent Instructions for AI Coding Agents

## Project Identity & Mission
- **Project**: Official Website for the NTU Cyber Security Society (National Textile University, Faisalabad, Pakistan).
- **Stack**: Next.js (App Router), TypeScript (Strict), Tailwind CSS, Lucide Icons, Supabase (PostgreSQL, Auth, Storage), Vercel.
- **Design Philosophy**: Clean light, premium editorial, modern academic cybersecurity organization. Strictly avoid generic AI clichés (purple neon gradients everywhere, matrix rain, hooded hacker illustrations, decorative floating blobs, excessive glassmorphism).
- **Core Principle**: Deliver real, working, verified functionality. Never fabricate university credentials, leadership identities, achievements, or official affiliations. Display polished fallback/empty states when real data is pending.

---

## Mandatory Task Workflow

Every agent must follow this exact sequence:

1. **Bootstrap**:
   - Read `AGENTS.md` (this file).
   - Read `task.txt` to find active priorities and task IDs.
   - Read `docs/ai-memory/PROJECT_OVERVIEW.md`, `CURRENT_STATE.md`, and `HANDOFF.md`.
   - Read other memory documents in `docs/ai-memory/` only when relevant to the current task.
2. **Determine Actual State**:
   - Inspect existing files, Git status, and implementation details before modifying code.
   - Never assume a task is incomplete purely based on memory docs without code inspection.
   - Do not overwrite uncommitted user changes.
3. **Plan**:
   - Identify Task ID, scope, acceptance criteria, and verification steps.
   - Keep plans proportionate and actionable.
4. **Implement**:
   - Modify the minimum appropriate set of files.
   - Maintain strict typing, accessibility, responsive design, and modular code architecture.
5. **Verify**:
   - Run TypeScript checks (`npm run type-check` or `npx tsc --noEmit`), linting, and production builds (`npm run build`).
   - Test functionality in browser / runtime when applicable.
   - Report limitations honestly if credentials or external services are not configured.
6. **Update Memory**:
   - Update `CURRENT_STATE.md`, `PROGRESS.md`, `task.txt`, and `HANDOFF.md`.
   - Update `ROUTES_AND_COMPONENTS.md`, `DATABASE_AND_SUPABASE.md`, `DECISIONS.md`, or `TESTING_AND_DEPLOYMENT.md` if affected.
7. **Handoff Response**:
   - Provide a concise summary of what was completed, files changed, verification results, known issues, and next actionable steps.

---

## Project Memory Locations
All persistent memory lives in `docs/ai-memory/`:
- [PROJECT_OVERVIEW.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/PROJECT_OVERVIEW.md): Goals, tech stack, constraints, links.
- [ARCHITECTURE.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/ARCHITECTURE.md): System design, frontend/backend roles, auth & data flow.
- [CURRENT_STATE.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/CURRENT_STATE.md): Real-time snapshot of active work, blockers, next step.
- [PROGRESS.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/PROGRESS.md): Chronological changelog of completed milestones.
- [DECISIONS.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/DECISIONS.md): Architectural Decision Records (ADRs).
- [TODO.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/TODO.md): Discovered tech debt and non-blocking follow-ups.
- [DATABASE_AND_SUPABASE.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/DATABASE_AND_SUPABASE.md): Schema, migrations, RLS policies, storage bucket configs.
- [ROUTES_AND_COMPONENTS.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/ROUTES_AND_COMPONENTS.md): Directory of pages, layout components, and data hooks.
- [TESTING_AND_DEPLOYMENT.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/TESTING_AND_DEPLOYMENT.md): Verified terminal commands, build steps, deployment guides.
- [HANDOFF.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/HANDOFF.md): Immediate handoff note for the next developer/agent.

---

## Coding & Security Conventions
- **Framework**: Next.js App Router with Server Components by default; use `"use client"` only when interactive state, effects, or browser APIs are required.
- **Styling**: Tailwind CSS with custom editorial design tokens defined in `tailwind.config.ts` and `src/app/globals.css`.
- **Typing**: TypeScript strict mode. Never use `any` when explicit interface or type is possible.
- **Security**:
  - Never commit API keys, service role secrets, or database passwords.
  - Enforce server-side authorization on all `/admin` routes and actions.
  - Row Level Security (RLS) must protect private tables (`membership_applications`, private admin settings).
  - Public endpoints and forms must sanitize inputs and use CSRF/validation guards.
  - Support graceful degradation: when Supabase environment variables are missing during local preview, fallback safely with clear informational banners rather than crashing.

---

## Essential Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript checks
npx tsc --noEmit

# Run production build
npm run build
```
