# NTU Cyber Security Society — Project Overview

## 1. Project Purpose
The NTU Cyber Security Society (National Textile University, Faisalabad, Pakistan) website is the official digital hub for university cybersecurity initiatives, student education, research projects, CTF teams, and community outreach. 

The website provides:
- A public showcase of society leadership, focus areas, workshops, events, and technical projects.
- Curated educational roadmaps and practical resources for students entering cybersecurity.
- An online membership application and event registration flow.
- A secure administrative panel for society leads to manage content, events, team rosters, and review membership requests without editing code.

## 2. Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom editorial design tokens (clean-light aesthetic)
- **Icons**: Lucide React
- **Backend & Database**: Supabase (PostgreSQL, Row-Level Security)
- **Authentication**: Supabase Auth (Email/Password for Admin)
- **Storage**: Supabase Storage (Buckets: branding, team, events, projects, gallery)
- **Hosting & Deployment**: Vercel

## 3. Key Design Philosophy & Aesthetics
- **Theme**: Clean light, modern academic technology, editorial layout with deliberate whitespace and typography.
- **Color Palette**: Off-white/slate backgrounds (`#F8FAFC`, `#FFFFFF`), deep charcoal text (`#0F172A`), restrained cobalt/electric blue accents (`#0284C7`, `#2563EB`), muted slate borders (`#E2E8F0`).
- **Strict Anti-Cliché Rules**: No generic purple/neon gradients, no hooded hacker tropes, no fake matrix rain, no excessive glassmorphism.

## 4. Constraints & Principles
- **No Fabricated Information**: Real names, faculty advisors, and achievements are presented only when verified. Clean, dignified placeholder empty states are displayed otherwise.
- **Graceful Local Degradation**: The website functions locally with mock fallbacks even before Supabase environment variables are provided.
- **Security by Design**: Server-side authorization checks on admin routes, RLS on sensitive tables, no exposed secrets.

## 5. Memory Documents Index
- [AGENTS.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/AGENTS.md) — Workflow instructions for AI agents
- [task.txt](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/task.txt) — Active task queue
- [ARCHITECTURE.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/ARCHITECTURE.md) — System design & component responsibilities
- [CURRENT_STATE.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/CURRENT_STATE.md) — Real-time state of the repository
- [PROGRESS.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/PROGRESS.md) — Chronological work milestones
- [DECISIONS.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/DECISIONS.md) — Architectural Decision Records
- [TODO.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/TODO.md) — Backlog & technical debt
- [DATABASE_AND_SUPABASE.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/DATABASE_AND_SUPABASE.md) — Database tables, migrations, RLS, storage
- [ROUTES_AND_COMPONENTS.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/ROUTES_AND_COMPONENTS.md) — Codebase map
- [TESTING_AND_DEPLOYMENT.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/TESTING_AND_DEPLOYMENT.md) — Commands & deployment guide
- [HANDOFF.md](file:///home/suraim-ahmad/Cyber%20Security/Cyber-Security-/docs/ai-memory/HANDOFF.md) — Quick resumption notes
