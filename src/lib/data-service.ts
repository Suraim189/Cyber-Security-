import { 
  TeamMember, 
  SocietyEvent, 
  SocietyProject, 
  EducationalResource, 
  MembershipApplication, 
  ContactSubmission 
} from './types';
import { createClient as createBrowserSupabase } from './supabase/client';

// Initial curated fallback data representing authentic NTU society categories
export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-1",
    name: "Dr. Faculty Advisor",
    designation: "Faculty Advisor & Patron",
    hierarchy_order: 1,
    department: "Department of Computer Science, NTU",
    bio: "Guiding the academic, research, and ethical direction of the NTU Cyber Security Society.",
    email: "advisor.cyber@ntu.edu.pk",
    is_published: true,
  },
  {
    id: "tm-2",
    name: "Society President",
    designation: "President",
    hierarchy_order: 2,
    department: "Computer Science, NTU",
    bio: "Leading society initiatives, CTF team preparation, and industry collaboration.",
    email: "president.css@ntu.edu.pk",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
    is_published: true,
  },
  {
    id: "tm-3",
    name: "Vice President",
    designation: "Vice President",
    hierarchy_order: 2,
    department: "Software Engineering, NTU",
    bio: "Overseeing operations, student mentorship, and internal security workshops.",
    linkedin_url: "https://linkedin.com",
    is_published: true,
  },
  {
    id: "tm-4",
    name: "General Secretary",
    designation: "General Secretary",
    hierarchy_order: 3,
    department: "Computer Science, NTU",
    bio: "Managing administrative correspondence, event logistics, and member registrations.",
    email: "secretary.css@ntu.edu.pk",
    is_published: true,
  },
  {
    id: "tm-5",
    name: "Technical Lead",
    designation: "Offensive Security Lead",
    hierarchy_order: 4,
    department: "Computer Science, NTU",
    bio: "Directing vulnerability assessment labs, CTF challenges, and ethical hacking seminars.",
    github_url: "https://github.com",
    is_published: true,
  },
  {
    id: "tm-6",
    name: "Defensive Security Lead",
    designation: "Blue Team & SOC Lead",
    hierarchy_order: 4,
    department: "Computer Science, NTU",
    bio: "Coordinating SIEM labs, network defense tutorials, and digital forensics workshops.",
    github_url: "https://github.com",
    is_published: true,
  }
];

export const INITIAL_EVENTS: SocietyEvent[] = [
  {
    id: "ev-1",
    title: "Hands-on Web Application Penetration Testing",
    slug: "hands-on-web-app-pentesting",
    category: "Workshop",
    event_date: "2026-11-15T14:00:00Z",
    venue: "Main Campus CS Lab 3, NTU Faisalabad",
    description: "An intensive practical session covering OWASP Top 10 vulnerabilities, session hijacking, SQL injection vectors, and mitigation techniques in modern web architectures.",
    registration_link: "https://forms.gle/sample",
    registration_deadline: "2026-11-14T23:59:00Z",
    is_published: true,
  },
  {
    id: "ev-2",
    title: "NTU Intra-University CTF Championship",
    slug: "ntu-intra-university-ctf",
    category: "CTF",
    event_date: "2026-11-28T09:00:00Z",
    venue: "Auditorium & Virtual Arena",
    description: "A 24-hour jeopardy-style Capture The Flag competition featuring binary exploitation, reverse engineering, cryptography, web security, and digital forensics.",
    registration_link: "https://forms.gle/sample",
    registration_deadline: "2026-11-26T18:00:00Z",
    is_published: true,
  },
  {
    id: "ev-3",
    title: "Industry Seminar: Zero Trust Architecture in Modern Enterprises",
    slug: "zero-trust-architecture-seminar",
    category: "Seminar",
    event_date: "2026-12-05T11:00:00Z",
    venue: "Executive Seminar Hall, NTU",
    description: "Invited keynote by seasoned security architects on enterprise identity federation, micro-segmentation, and zero-trust perimeter defense.",
    is_published: true,
  }
];

export const INITIAL_PROJECTS: SocietyProject[] = [
  {
    id: "proj-1",
    title: "Campus Network Vulnerability Assessment Scanner",
    slug: "campus-network-vulnerability-scanner",
    domain: "Network Security",
    summary: "An automated network mapping and service misconfiguration assessment tool customized for university lab subnets.",
    detailed_description: "Developed by society members to assist lab administrators in detecting unpatched services, default credentials, and unauthorized port bindings across authorized subnet ranges.",
    tech_stack: ["Python", "Nmap Lib", "Docker", "PostgreSQL"],
    lead_author: "NTU CSS Technical Wing",
    github_url: "https://github.com/example/network-scanner",
    is_published: true,
  },
  {
    id: "proj-2",
    title: "Cryptographic Protocol Benchmarking Suite",
    slug: "crypto-protocol-benchmarking",
    domain: "Cryptography",
    summary: "Performance and entropy evaluation testbed for post-quantum cryptographic primitives.",
    detailed_description: "An empirical benchmarking suite comparing lattice-based key encapsulation mechanisms with classical RSA/ECC implementations on resource-constrained embedded targets.",
    tech_stack: ["Rust", "C++", "Python", "Linux Perf"],
    lead_author: "Research Working Group",
    is_published: true,
  },
  {
    id: "proj-3",
    title: "Lightweight Memory Forensics Artifact Extractor",
    slug: "memory-forensics-extractor",
    domain: "Digital Forensics",
    summary: "Fast triage tool designed to parse volatile RAM dumps and pinpoint in-memory code injection.",
    detailed_description: "Built for incident response training, enabling students to inspect process memory descriptors, hook detections, and network sockets.",
    tech_stack: ["Go", "Volatility Framework", "React"],
    lead_author: "Digital Forensics Lead",
    is_published: true,
  }
];

export const INITIAL_RESOURCES: EducationalResource[] = [
  {
    id: "res-1",
    title: "Beginner's Pathway to Ethical Hacking & Linux Fundamentals",
    category: "Roadmaps",
    difficulty_level: "Beginner",
    description: "Curated learning roadmap covering Linux command line mastery, networking fundamentals (TCP/IP, DNS, Subnetting), and introductory web security.",
    url: "https://roadmap.sh/cyber-security",
    is_published: true,
  },
  {
    id: "res-2",
    title: "OverTheWire Bandit Wargame Guide",
    category: "Practice Labs",
    difficulty_level: "Beginner",
    description: "Interactive wargames for absolute beginners to build practical Linux server navigation, file permission, and shell scripting skills.",
    url: "https://overthewire.org/wargames/bandit/",
    is_published: true,
  },
  {
    id: "res-3",
    title: "PortSwigger Web Security Academy",
    category: "Practice Labs",
    difficulty_level: "Intermediate",
    description: "World-class interactive web vulnerability labs with free practical exercises covering SQLi, XSS, CSRF, SSRF, and authentication bypasses.",
    url: "https://portswigger.net/web-security",
    is_published: true,
  },
  {
    id: "res-4",
    title: "CTFtime Global Event Calendar & Team Standings",
    category: "CTF Platforms",
    difficulty_level: "Intermediate",
    description: "The premier portal tracking international Capture The Flag competitions, challenge archives, writeups, and team ratings.",
    url: "https://ctftime.org",
    is_published: true,
  },
  {
    id: "res-5",
    title: "OWASP Top 10 Security Risks & Cheat Sheets",
    category: "Documentation",
    difficulty_level: "Intermediate",
    description: "Comprehensive authoritative documentation and secure coding cheat sheets for developers, defenders, and security testers.",
    url: "https://owasp.org/www-project-top-ten/",
    is_published: true,
  }
];

// In-memory store for fallback operations
let fallbackTeam: TeamMember[] = [...INITIAL_TEAM_MEMBERS];
let fallbackEvents: SocietyEvent[] = [...INITIAL_EVENTS];
let fallbackProjects: SocietyProject[] = [...INITIAL_PROJECTS];
let fallbackResources: EducationalResource[] = [...INITIAL_RESOURCES];
let fallbackApplications: MembershipApplication[] = [];
let fallbackContacts: ContactSubmission[] = [];

export const DataService = {
  // TEAM MEMBERS
  async getTeamMembers(publishedOnly = true): Promise<TeamMember[]> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        let query = supabase.from('team_members').select('*').order('hierarchy_order', { ascending: true });
        if (publishedOnly) query = query.eq('is_published', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as TeamMember[];
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local dataset', err);
      }
    }
    return publishedOnly ? fallbackTeam.filter(m => m.is_published) : fallbackTeam;
  },

  async saveTeamMember(member: Partial<TeamMember>): Promise<TeamMember> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('team_members').upsert([member]).select().single();
        if (!error && data) return data as TeamMember;
      } catch (err) {
        console.warn('Supabase save failed, saving in local state', err);
      }
    }
    if (member.id) {
      fallbackTeam = fallbackTeam.map(m => m.id === member.id ? { ...m, ...member } as TeamMember : m);
      return fallbackTeam.find(m => m.id === member.id)!;
    } else {
      const newMember = { ...member, id: `tm-${Date.now()}`, is_published: true } as TeamMember;
      fallbackTeam.push(newMember);
      return newMember;
    }
  },

  async deleteTeamMember(id: string): Promise<boolean> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        await supabase.from('team_members').delete().eq('id', id);
        return true;
      } catch {
        // fallback
      }
    }
    fallbackTeam = fallbackTeam.filter(m => m.id !== id);
    return true;
  },

  // EVENTS
  async getEvents(publishedOnly = true): Promise<SocietyEvent[]> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        let query = supabase.from('events').select('*').order('event_date', { ascending: true });
        if (publishedOnly) query = query.eq('is_published', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as SocietyEvent[];
      } catch (err) {
        console.warn('Supabase fetch failed, using fallback events', err);
      }
    }
    return publishedOnly ? fallbackEvents.filter(e => e.is_published) : fallbackEvents;
  },

  async saveEvent(event: Partial<SocietyEvent>): Promise<SocietyEvent> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('events').upsert([event]).select().single();
        if (!error && data) return data as SocietyEvent;
      } catch (err) {
        console.warn('Supabase save failed', err);
      }
    }
    if (event.id) {
      fallbackEvents = fallbackEvents.map(e => e.id === event.id ? { ...e, ...event } as SocietyEvent : e);
      return fallbackEvents.find(e => e.id === event.id)!;
    } else {
      const newEvent = { ...event, id: `ev-${Date.now()}`, is_published: true } as SocietyEvent;
      fallbackEvents.push(newEvent);
      return newEvent;
    }
  },

  async deleteEvent(id: string): Promise<boolean> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        await supabase.from('events').delete().eq('id', id);
        return true;
      } catch {}
    }
    fallbackEvents = fallbackEvents.filter(e => e.id !== id);
    return true;
  },

  // PROJECTS
  async getProjects(publishedOnly = true): Promise<SocietyProject[]> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (publishedOnly) query = query.eq('is_published', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as SocietyProject[];
      } catch (err) {
        console.warn('Supabase projects fetch failed', err);
      }
    }
    return publishedOnly ? fallbackProjects.filter(p => p.is_published) : fallbackProjects;
  },

  async saveProject(project: Partial<SocietyProject>): Promise<SocietyProject> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').upsert([project]).select().single();
        if (!error && data) return data as SocietyProject;
      } catch (err) {
        console.warn('Supabase save project failed', err);
      }
    }
    if (project.id) {
      fallbackProjects = fallbackProjects.map(p => p.id === project.id ? { ...p, ...project } as SocietyProject : p);
      return fallbackProjects.find(p => p.id === project.id)!;
    } else {
      const newProj = { ...project, id: `proj-${Date.now()}`, is_published: true } as SocietyProject;
      fallbackProjects.push(newProj);
      return newProj;
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
        return true;
      } catch {}
    }
    fallbackProjects = fallbackProjects.filter(p => p.id !== id);
    return true;
  },

  // RESOURCES
  async getResources(publishedOnly = true): Promise<EducationalResource[]> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        let query = supabase.from('resources').select('*').order('title', { ascending: true });
        if (publishedOnly) query = query.eq('is_published', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as EducationalResource[];
      } catch (err) {
        console.warn('Supabase resources fetch failed', err);
      }
    }
    return publishedOnly ? fallbackResources.filter(r => r.is_published) : fallbackResources;
  },

  async saveResource(resource: Partial<EducationalResource>): Promise<EducationalResource> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('resources').upsert([resource]).select().single();
        if (!error && data) return data as EducationalResource;
      } catch (err) {
        console.warn('Supabase save resource failed', err);
      }
    }
    if (resource.id) {
      fallbackResources = fallbackResources.map(r => r.id === resource.id ? { ...r, ...resource } as EducationalResource : r);
      return fallbackResources.find(r => r.id === resource.id)!;
    } else {
      const newRes = { ...resource, id: `res-${Date.now()}`, is_published: true } as EducationalResource;
      fallbackResources.push(newRes);
      return newRes;
    }
  },

  async deleteResource(id: string): Promise<boolean> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        await supabase.from('resources').delete().eq('id', id);
        return true;
      } catch {}
    }
    fallbackResources = fallbackResources.filter(r => r.id !== id);
    return true;
  },

  // MEMBERSHIP APPLICATIONS
  async submitMembershipApplication(application: Omit<MembershipApplication, 'id' | 'status' | 'created_at'>): Promise<{ success: boolean; id?: string; error?: string }> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('membership_applications').insert([application]).select('id').single();
        if (!error && data) return { success: true, id: data.id };
      } catch (err: any) {
        console.warn('Supabase application submission failed', err);
      }
    }
    const newApp: MembershipApplication = {
      ...application,
      id: `app-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    fallbackApplications.push(newApp);
    return { success: true, id: newApp.id };
  },

  async getMembershipApplications(): Promise<MembershipApplication[]> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('membership_applications').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as MembershipApplication[];
      } catch (err) {
        console.warn('Supabase applications fetch failed', err);
      }
    }
    return fallbackApplications;
  },

  async updateApplicationStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<boolean> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        await supabase.from('membership_applications').update({ status }).eq('id', id);
        return true;
      } catch {}
    }
    fallbackApplications = fallbackApplications.map(a => a.id === id ? { ...a, status } : a);
    return true;
  },

  // CONTACT SUBMISSIONS
  async submitContact(contact: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
    const supabase = createBrowserSupabase();
    if (supabase) {
      try {
        await supabase.from('contact_messages').insert([contact]);
        return { success: true };
      } catch (err: any) {
        console.warn('Supabase contact submission failed', err);
      }
    }
    fallbackContacts.push({
      ...contact,
      id: `cnt-${Date.now()}`,
      created_at: new Date().toISOString(),
    });
    return { success: true };
  }
};
