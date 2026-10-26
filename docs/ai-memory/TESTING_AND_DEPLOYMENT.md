# Testing & Deployment Manual

## 1. Verified Development Commands
```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Type-check TypeScript codebase
npx tsc --noEmit

# 4. Run lint checks
npm run lint

# 5. Build for production
npm run build
```

## 2. Environment Variables Specification
Create a `.env.local` file for local development:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note on Local Degradation**: If `NEXT_PUBLIC_SUPABASE_URL` is omitted, the application runs seamlessly in Mock Fallback mode.

## 3. Database Migration Workflow
Run the migration file located at `supabase/migrations/20261026_init.sql` directly inside the Supabase SQL Editor:
1. Open your Supabase Dashboard.
2. Navigate to **SQL Editor** -> **New Query**.
3. Copy-paste the contents of `supabase/migrations/20261026_init.sql`.
4. Click **Run**.
5. Navigate to **Storage** -> Ensure buckets (`branding`, `team`, `events`, `projects`, `gallery`) are created as public read.

## 4. Vercel Deployment Checklist
1. Connect the GitHub repository `Cyber-Security-` to Vercel.
2. Set Environment Variables in Vercel Project Settings (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Deploy! Next.js will build static pages and server routes automatically.
4. Add custom domain (e.g. `cybersecurity.ntu.edu.pk`) when DNS is delegated by NTU IT center.
