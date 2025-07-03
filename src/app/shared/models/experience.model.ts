export interface Experience {
  id: number;
  agency_id: number;
  category_id: number;
  destination_id: number;
  experience_name: string;
  description: string;
  duration: string;
  meeting_point: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  media?: ExperienceMedia[];
}

export interface ExperienceMedia {
  id: number;
  experience_id: number;
  media_url: string;
  caption: string;
  uploaded_at: string;
  deleted_at?: string | null;
}
