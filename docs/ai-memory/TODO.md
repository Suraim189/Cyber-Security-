# Technical Debt & Discovered Backlog

## Pending User / External Assets
- **[TD-001] Official NTU Logo & Society Vector Assets**
  - **Description**: Add verified official NTU and society SVG/PNG logos to `public/images/branding/` when provided by the executive team.
  - **Priority**: Low (Graceful modern SVG monogram placeholder implemented).
- **[TD-002] Real Leadership Portraits & Bio Confirmations**
  - **Description**: Replace initial executive roster placeholders with official approved portraits and biographies from the society president and faculty advisor.
  - **Priority**: Medium.
- **[TD-003] Production Supabase Project Provisioning**
  - **Description**: Run the migration script (`supabase/migrations/20261026_init.sql`) on the live Supabase project and inject credentials into Vercel environment variables.
  - **Priority**: High (required for live production persistence).
