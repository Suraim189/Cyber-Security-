# Architectural Decision Records (ADR)

## ADR-001: Next.js App Router with TypeScript & Tailwind CSS
- **Date**: 2026-10-26
- **Status**: Accepted
- **Context**: The NTU Cyber Security Society requires a modern, SEO-friendly, performant web platform with both public showcase pages and an administrative management portal.
- **Decision**: Adopt Next.js 14+ with App Router, TypeScript (strict mode), and Tailwind CSS with custom editorial tokens.
- **Rationale**: 
  - Server Components allow direct server-side data fetching and fast initial loads with minimal JavaScript.
  - Route groups (`(public)` vs `admin`) simplify layout isolation.
  - Tailwind CSS provides rapid, consistent styling adhering to the clean-light design guidelines without bloated CSS files.
- **Consequences**: Developers and agents must maintain separation between Server and Client Components (`"use client"` only when necessary).

---

## ADR-002: Dual-Mode Data Provider (Supabase + Graceful Local Mock)
- **Date**: 2026-10-26
- **Status**: Accepted
- **Context**: The site relies on Supabase for Auth, PostgreSQL, and Storage. However, during local development or when users first clone the repository before setting up Supabase API keys, the website must not crash or display broken pages.
- **Decision**: Implement a unified `data-service.ts` that checks for active Supabase environment variables. If present, it interacts with Supabase; if absent, it gracefully delivers high-fidelity mock fallback data and logs a non-intrusive warning banner.
- **Rationale**: Guarantees zero-friction local development, instant previewing, and immediate build readiness on CI/Vercel without requiring mock credentials.
- **Consequences**: Mutations in mock mode are stored in-memory/localStorage during preview and do not persist to a remote database until Supabase credentials are configured.

---

## ADR-003: Clean-Light Editorial Aesthetic over Cyber Clichés
- **Date**: 2026-10-26
- **Status**: Accepted
- **Context**: Cybersecurity sites frequently resort to generic dark templates with matrix rain, neon purple glowing cards, and hooded hacker silhouettes.
- **Decision**: Standardize on a clean-light, modern academic research & high-tech editorial identity with balanced whitespace, navy/charcoal typography, electric blue accents, and clean technical diagrams.
- **Rationale**: Reflects an authentic university society aligned with National Textile University, conveying credibility, professionalism, and high academic standards.
