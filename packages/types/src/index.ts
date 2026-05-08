export interface ApiResponse<T> {
  success: boolean;
  result: T;
}

export interface Profile {
  id: number;
  name: string;
  tagline: string | null;
  bio: string | null;
  email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  location: string | null;
  available: boolean;
  photo_url: string | null;
  updated_at: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string | null;
  year: string | null;
  display_order: number;
  created_at: string;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  tech_stack: string[] | null;
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  display_order: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export interface Skill {
  id: number;
  skill_group_id: number;
  name: string;
  proficiency: 'familiar' | 'proficient' | 'expert' | null;
  display_order: number;
}

export interface SkillGroup {
  id: number;
  name: string;
  display_order: number;
  skills: Skill[];
}

export interface ExperienceItem {
  id: number;
  experience_id: number;
  type: 'responsibility' | 'achievement';
  content: string;
  is_pinned: boolean;
  pin_order: number | null;
  display_order: number;
  created_at: string;
}

export interface Experience {
  id: number;
  company: string;
  title: string;
  location: string | null;
  employment_type: 'permanent' | 'contract' | 'casual' | 'volunteer' | null;
  start_date: string;
  end_date: string | null;
  summary: string | null;
  display_order: number;
  created_at: string;
  items: ExperienceItem[];
}
