# Routes & Components Navigation Guide

## 1. App Routes (Next.js App Router)

### Public Routes
- `src/app/page.tsx` — Homepage (Hero, Live Telemetry, Terminal, 3D Matrix, Defense Matrix, CTF Arena, Partners Strip, Achievements, Event Gallery, Learning Roadmap, FAQ, Leadership, Projects)
- `src/app/about/page.tsx` — About NTU Cyber Security Society, mission, vision, history, faculty advisory with PageHeader
- `src/app/team/page.tsx` — Leadership & Tactical Roster (Wing filters, 3D tilt cards, TryHackMe/HTB links, skills tags, PageHeader)
- `src/app/events/page.tsx` — Events calendar, mission briefings, workshop registration modal, .ics export, past photo gallery, PageHeader
- `src/app/projects/page.tsx` — Technical portfolio, research initiatives, security tools with PageHeader
- `src/app/resources/page.tsx` — Categorized roadmaps, CTF practice platforms, interactive learning roadmap, PageHeader
- `src/app/contact/page.tsx` — Membership application form, general society inquiries, official contact channels with PageHeader
- `src/app/verify/page.tsx` — Public credential & membership verification lookup
- `src/app/verify/[id]/page.tsx` — Dynamic digital certificate attestation page with QR seal representation and SHA-256 digital signature
- `src/app/dashboard/page.tsx` — Student member portal with level XP progression, active streaks, unlocked badges, and shortcut actions
- `src/app/security/page.tsx` — Vulnerability Disclosure Policy & Responsible Disclosure guidelines

### Admin Routes (`/admin`)
- `src/app/admin/page.tsx` — Admin Dashboard overview (stats, recent applications, quick links)
- `src/app/admin/login/page.tsx` — Admin sign-in screen
- `src/app/admin/team/page.tsx` — Team management (add, edit, toggle visibility, reorder)
- `src/app/admin/events/page.tsx` — Event management (schedule, edit, unpublish)
- `src/app/admin/projects/page.tsx` — Project management (add, update tech stack, publish)
- `src/app/admin/resources/page.tsx` — Resource links curation
- `src/app/admin/applications/page.tsx` — Membership applications review & status approval

---

## 2. Shared & Feature Components
- `src/components/layout/Navbar.tsx`: Responsive navigation header with scroll progress bar, compact icon search button, and slide-out mobile drawer.
- `src/components/layout/PageHeader.tsx`: Reusable cyber header with animated radar sweep HUD, blips, and telemetry badge.
- `src/components/layout/CommandPalette.tsx`: Global search and shortcut command dialog (`⌘K` / `Ctrl+K`).
- `src/components/layout/Footer.tsx`: Comprehensive footer with university links, ethics statement, copyright.
- `src/components/cyber/ThreeGlobe.tsx`: Three.js rotating particle sphere with mobile particle reduction and reduced-motion fallback.
- `src/components/cyber/LiveCtfArena.tsx`: Jeopardy-style challenge matrix with confetti and server-side flag validation.
- `src/components/cyber/AchievementsTimeline.tsx`: Filterable collegiate CTF competition timeline with rank badges and solve counts.
- `src/components/events/EventGallery.tsx`: Past-events photo gallery with category filter and modal image lightbox.
- `src/components/events/EventRegistrationModal.tsx`: In-app event registration dialog with instant RFC 5545 `.ics` export.
- `src/components/home/PartnersStrip.tsx`: Academic & industry affiliations strip.
- `src/components/home/FaqAccordion.tsx`: Accessible interactive FAQ accordion.
- `src/components/learning/LearningRoadmap.tsx`: Interactive multi-tier roadmap with persistent `localStorage` progress tracking.
- `src/components/team/TeamMemberCard.tsx`: 3D tilt member card with blur-up image skeleton, fallback initials avatar, skills, certifications, and external profile links.
- `src/components/forms/MembershipForm.tsx`: Interactive client form with client-side validation and feedback.
- `src/components/forms/ContactForm.tsx`: Direct inquiries form.
