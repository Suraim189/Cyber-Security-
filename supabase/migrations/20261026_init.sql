-- =============================================================================
-- NTU Cyber Security Society — PostgreSQL Database Schema & RLS Setup
-- Migration: 20261026_init.sql
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    hierarchy_order INTEGER NOT NULL DEFAULT 4, -- 1: Faculty, 2: President, 3: Executive, 4: Lead, 5: Member
    department TEXT NOT NULL DEFAULT 'Computer Science',
    bio TEXT,
    image_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    email TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Workshop', 'CTF', 'Seminar', 'Hackathon', 'Guest Lecture')),
    event_date TIMESTAMPTZ NOT NULL,
    venue TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image_url TEXT,
    registration_link TEXT,
    registration_deadline TIMESTAMPTZ,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROJECTS & RESEARCH TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    domain TEXT NOT NULL,
    summary TEXT NOT NULL,
    detailed_description TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    cover_image_url TEXT,
    github_url TEXT,
    live_demo_url TEXT,
    lead_author TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. EDUCATIONAL RESOURCES TABLE
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Roadmaps', 'CTF Platforms', 'Practice Labs', 'Tools', 'Documentation')),
    difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. MEMBERSHIP APPLICATIONS (Confidential & Private)
CREATE TABLE IF NOT EXISTS public.membership_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    student_id TEXT NOT NULL,
    department TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    interests TEXT[] DEFAULT '{}',
    prior_experience TEXT,
    motivation TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Team Members Policies:
CREATE POLICY "Public can view published team members" 
    ON public.team_members FOR SELECT 
    USING (is_published = true);

CREATE POLICY "Authenticated admins have full access to team members" 
    ON public.team_members FOR ALL 
    TO authenticated 
    USING (true);

-- Events Policies:
CREATE POLICY "Public can view published events" 
    ON public.events FOR SELECT 
    USING (is_published = true);

CREATE POLICY "Authenticated admins have full access to events" 
    ON public.events FOR ALL 
    TO authenticated 
    USING (true);

-- Projects Policies:
CREATE POLICY "Public can view published projects" 
    ON public.projects FOR SELECT 
    USING (is_published = true);

CREATE POLICY "Authenticated admins have full access to projects" 
    ON public.projects FOR ALL 
    TO authenticated 
    USING (true);

-- Resources Policies:
CREATE POLICY "Public can view published resources" 
    ON public.resources FOR SELECT 
    USING (is_published = true);

CREATE POLICY "Authenticated admins have full access to resources" 
    ON public.resources FOR ALL 
    TO authenticated 
    USING (true);

-- Membership Applications Policies (STRICT PRIVACY):
-- Anyone can submit a membership application
CREATE POLICY "Public can submit membership applications" 
    ON public.membership_applications FOR INSERT 
    WITH CHECK (true);

-- Only authenticated admins can read, update, or delete applications
CREATE POLICY "Admins can view and manage membership applications" 
    ON public.membership_applications FOR ALL 
    TO authenticated 
    USING (true);

-- Contact Messages Policies:
CREATE POLICY "Public can send contact messages" 
    ON public.contact_messages FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Admins can view and manage contact messages" 
    ON public.contact_messages FOR ALL 
    TO authenticated 
    USING (true);

-- Site Settings Policies:
CREATE POLICY "Public can read site settings" 
    ON public.site_settings FOR SELECT 
    USING (true);

CREATE POLICY "Admins can update site settings" 
    ON public.site_settings FOR ALL 
    TO authenticated 
    USING (true);

-- =============================================================================
-- STORAGE BUCKETS SETUP (Execute via Supabase Storage UI or SQL API)
-- =============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('branding', 'branding', true),
    ('team', 'team', true),
    ('events', 'events', true),
    ('projects', 'projects', true),
    ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public Read Access
CREATE POLICY "Public Access for Branding" ON storage.objects FOR SELECT USING (bucket_id = 'branding');
CREATE POLICY "Public Access for Team Portraits" ON storage.objects FOR SELECT USING (bucket_id = 'team');
CREATE POLICY "Public Access for Event Media" ON storage.objects FOR SELECT USING (bucket_id = 'events');
CREATE POLICY "Public Access for Project Media" ON storage.objects FOR SELECT USING (bucket_id = 'projects');
CREATE POLICY "Public Access for Gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

-- Storage RLS: Admin Full Access
CREATE POLICY "Admin All Access on Media Buckets" ON storage.objects FOR ALL TO authenticated USING (true);
