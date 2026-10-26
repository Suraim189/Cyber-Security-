# Supabase, Database & Storage Architecture

## 1. PostgreSQL Schema Overview
The database is structured to support society content management and public engagement:

### Tables:
1. **`team_members`**
   - `id`: UUID (PK, default uuid_generate_v4())
   - `name`: TEXT NOT NULL
   - `designation`: TEXT NOT NULL (e.g. Faculty Advisor, President, General Secretary, Lead)
   - `hierarchy_order`: INTEGER (1 for Faculty, 2 for President, 3 for Executives, 4 for Leads, 5 for Members)
   - `department`: TEXT (e.g. Computer Science, Software Engineering)
   - `bio`: TEXT
   - `image_url`: TEXT
   - `github_url`: TEXT
   - `linkedin_url`: TEXT
   - `email`: TEXT
   - `is_published`: BOOLEAN DEFAULT true
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()

2. **`events`**
   - `id`: UUID (PK)
   - `title`: TEXT NOT NULL
   - `slug`: TEXT UNIQUE NOT NULL
   - `category`: TEXT NOT NULL (Workshop, CTF, Seminar, Hackathon, Guest Lecture)
   - `event_date`: TIMESTAMPTZ NOT NULL
   - `venue`: TEXT NOT NULL (e.g. Main Auditorium / CS Lab 3 / Online)
   - `description`: TEXT NOT NULL
   - `cover_image_url`: TEXT
   - `registration_link`: TEXT
   - `registration_deadline`: TIMESTAMPTZ
   - `is_published`: BOOLEAN DEFAULT true
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()

3. **`projects`**
   - `id`: UUID (PK)
   - `title`: TEXT NOT NULL
   - `slug`: TEXT UNIQUE NOT NULL
   - `domain`: TEXT NOT NULL (e.g. Network Security, Threat Intelligence, Web App Sec, Cryptography)
   - `summary`: TEXT NOT NULL
   - `detailed_description`: TEXT
   - `tech_stack`: TEXT[] (Array of technologies)
   - `cover_image_url`: TEXT
   - `github_url`: TEXT
   - `live_demo_url`: TEXT
   - `lead_author`: TEXT
   - `is_published`: BOOLEAN DEFAULT true
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()

4. **`resources`**
   - `id`: UUID (PK)
   - `title`: TEXT NOT NULL
   - `category`: TEXT NOT NULL (Roadmaps, CTF Platforms, Practice Labs, Tools, Documentation)
   - `difficulty_level`: TEXT (Beginner, Intermediate, Advanced)
   - `description`: TEXT NOT NULL
   - `url`: TEXT NOT NULL
   - `is_published`: BOOLEAN DEFAULT true
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()

5. **`membership_applications`**
   - `id`: UUID (PK)
   - `full_name`: TEXT NOT NULL
   - `email`: TEXT NOT NULL
   - `student_id`: TEXT NOT NULL
   - `department`: TEXT NOT NULL
   - `year_of_study`: TEXT NOT NULL
   - `interests`: TEXT[]
   - `prior_experience`: TEXT
   - `motivation`: TEXT NOT NULL
   - `status`: TEXT DEFAULT 'pending' (pending, approved, rejected)
   - `created_at`: TIMESTAMPTZ DEFAULT NOW()

6. **`site_settings`**
   - `key`: TEXT (PK)
   - `value`: JSONB NOT NULL
   - `updated_at`: TIMESTAMPTZ DEFAULT NOW()

---

## 2. Row Level Security (RLS) Policies
- **Public Tables (`team_members`, `events`, `projects`, `resources`)**:
  - `SELECT`: `USING (is_published = true)` for anonymous users.
  - `ALL`: `USING (auth.role() = 'authenticated')` for logged-in administrators.
- **Private Tables (`membership_applications`)**:
  - `INSERT`: Allowed for anonymous public users with valid inputs.
  - `SELECT`, `UPDATE`, `DELETE`: Strictly restricted to `auth.role() = 'authenticated'`. Anonymous users CANNOT read applications.
- **Site Settings**:
  - `SELECT`: Public for approved display settings.
  - `UPDATE`: Authenticated admins only.

---

## 3. Storage Buckets
Configured buckets in Supabase Storage:
- `branding`: Public read. Logos, banners, official society seals.
- `team`: Public read. Member portraits.
- `events`: Public read. Event promotional posters & recaps.
- `projects`: Public read. Technical diagrams, project screenshots.
- `gallery`: Public read. Campus activities, workshop photos.
