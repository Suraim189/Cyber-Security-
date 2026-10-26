# Routes & Components Navigation Guide

## 1. App Routes (Next.js App Router)

### Public Routes
- `src/app/page.tsx` — Homepage (Hero, About preview, Focus Areas, Events, Leadership preview, Projects preview, Membership CTA)
- `src/app/about/page.tsx` — About NTU Cyber Security Society, mission, vision, history, faculty advisors
- `src/app/team/page.tsx` — Society Leadership & Team Directory (Hierarchy: Faculty, President, Executives, Leads)
- `src/app/events/page.tsx` — Events showcase with upcoming/past filtering and registration links
- `src/app/events/[slug]/page.tsx` — Detailed event briefing and registration
- `src/app/projects/page.tsx` — Technical portfolio, research initiatives, security tools
- `src/app/resources/page.tsx` — Categorized roadmaps, CTF practice platforms, workshop materials
- `src/app/contact/page.tsx` — Membership application form, general society inquiries, official contact channels

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
- `src/components/layout/Navbar.tsx`: Responsive navigation header with brand seal and mobile drawer.
- `src/components/layout/Footer.tsx`: Comprehensive footer with university links, ethics statement, copyright.
- `src/components/layout/AdminSidebar.tsx`: Administrative panel navigation and logout action.
- `src/components/ui/`: Atomic primitives (Button, Card, Badge, Modal, Input, Textarea, Select, Tabs).
- `src/components/home/`: Hero, FocusAreaGrid, EventPreviewList, LeadershipPreview.
- `src/components/forms/MembershipForm.tsx`: Interactive client form with client-side validation and feedback.
- `src/components/admin/DataManagementTable.tsx`: Generic data grid with search, filter, and action buttons.
