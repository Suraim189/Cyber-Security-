export type MemberHierarchy = 1 | 2 | 3 | 4 | 5;
export type SecurityWing = "Executive" | "Red Team" | "Blue Team" | "CTF" | "Advisor";

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  hierarchy_order: MemberHierarchy; // 1: Advisor, 2: President, 3: Executive, 4: Lead, 5: Member
  wing?: SecurityWing;
  department: string;
  bio?: string;
  image_url?: string;
  github_url?: string;
  linkedin_url?: string;
  email?: string;
  skills?: string[];
  certifications?: string[];
  tryhackme_url?: string;
  hackthebox_url?: string;
  is_published: boolean;
  created_at?: string;
}

export type EventCategory = 'Workshop' | 'CTF' | 'Seminar' | 'Hackathon' | 'Guest Lecture';

export interface SocietyEvent {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  event_date: string; // ISO date string
  venue: string;
  description: string;
  cover_image_url?: string;
  registration_link?: string;
  registration_deadline?: string;
  is_published: boolean;
  created_at?: string;
}

export type ProjectDomain = 
  | 'Penetration Testing'
  | 'Network Security'
  | 'Digital Forensics'
  | 'Cryptography'
  | 'Web App Security'
  | 'Threat Intelligence';

export interface SocietyProject {
  id: string;
  title: string;
  slug: string;
  domain: ProjectDomain;
  summary: string;
  detailed_description?: string;
  tech_stack: string[];
  cover_image_url?: string;
  github_url?: string;
  live_demo_url?: string;
  lead_author: string;
  is_published: boolean;
  created_at?: string;
}

export type ResourceCategory = 
  | 'Roadmaps' 
  | 'CTF Platforms' 
  | 'Practice Labs' 
  | 'Tools' 
  | 'Documentation';

export interface EducationalResource {
  id: string;
  title: string;
  category: ResourceCategory;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  url: string;
  is_published: boolean;
  created_at?: string;
}

export interface MembershipApplication {
  id: string;
  full_name: string;
  email: string;
  student_id: string;
  department: string;
  year_of_study: string;
  interests: string[];
  prior_experience?: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}
