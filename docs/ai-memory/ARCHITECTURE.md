# NTU Cyber Security Society — System Architecture

## 1. High-Level Architecture Overview
The application follows modern Next.js App Router full-stack conventions with Supabase as the BaaS (Backend-as-a-Service).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT BROWSER                                 │
│  Public Views (Home, About, Team, Events, Projects, Resources, Contact)      │
│  Admin Portal (/admin: Auth, Management Tables, Uploads)                     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / Server Actions / API Routes
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                           NEXT.JS APPLICATION                               │
│  ┌────────────────────────┐  ┌───────────────────────────────────────────┐  │
│  │ Server Components      │  │ Client Components ("use client")          │  │
│  │ (Direct Supabase data  │  │ (Interactive filters, modals, forms,      │  │
│  │ fetch, SEO metadata)   │  │  admin state, mobile drawer navigation)   │  │
│  └───────────┬────────────┘  └─────────────────────┬─────────────────────┘  │
│              │                                     │                        │
│  ┌───────────▼─────────────────────────────────────▼─────────────────────┐  │
│  │ Data Layer (lib/supabase.ts & lib/data-service.ts)                    │  │
│  │ - Supabase Server Client (cookies, auth verification)                 │  │
│  │ - Supabase Browser Client (interactive UI, auth state listener)       │  │
│  │ - Local Fallback / Mock Adapter (seamless local preview)              │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                             SUPABASE BACKEND                                │
│  - PostgreSQL: Relational tables with strict Row-Level Security (RLS)       │
│  - Supabase Auth: Session cookies, protected admin role enforcement         │
│  - Supabase Storage: Buckets for branding, team, events, projects, gallery  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. Directory Layout & Modular Responsibilities
- `src/app/`: Next.js App Router pages and layouts.
  - `(public)/`: Public routes including `/`, `/about`, `/team`, `/events`, `/projects`, `/resources`, `/contact`.
  - `admin/`: Admin login and dashboard suites (`/admin`, `/admin/team`, `/admin/events`, `/admin/projects`, `/admin/resources`, `/admin/applications`).
  - `api/`: Route handlers for form submissions and health check.
- `src/components/`:
  - `layout/`: Navbar, Footer, MobileNav, AdminSidebar.
  - `ui/`: Button, Card, Badge, Modal, Input, Textarea, Select, Alert, Tabs.
  - `home/`: Hero, FocusAreas, EventPreview, LeadershipPreview, CTABanner.
  - `team/`: MemberCard, ExecutiveGrid, TeamFilter.
  - `events/`: EventCard, EventRegistrationModal, CategoryFilter.
  - `projects/`: ProjectCard, TechBadgeList.
  - `resources/`: ResourceCard, CategoryFilter.
  - `admin/`: DataTable, AdminFormModal, FileUploader, StatusBadge.
- `src/lib/`:
  - `supabase/`: Server & client initialization, auth helpers.
  - `data-service.ts`: Unified data access layer combining Supabase fetchers with local mock fallback.
  - `types.ts`: TypeScript interfaces for all domain entities.
  - `utils.ts`: Classname merge (`cn`), date formatting, text truncation.

## 3. Authentication & Authorization Flow
- **Public**: Anonymous access to published items. Cannot access draft items or membership applications.
- **Admin**:
  - Sign in via `/admin/login`.
  - Session verified server-side in layout/middleware.
  - Row Level Security ensures only authenticated admin accounts can mutate records or read sensitive applicant data.

## 4. Media Storage Strategy
- Public read access for `branding`, `team`, `events`, `projects`, `gallery`.
- Admin write/delete access governed by storage policies.
- Form submissions allow resume/portfolio attachment into private or validated bucket.
