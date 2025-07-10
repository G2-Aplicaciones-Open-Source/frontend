import {Category} from './category.model';

export interface Experience {
  id: number;
  agency_id: number;
  category: Category;
  destination_id: number;
  title: string;
  description: string;
  duration: string;
  meetingPoint: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  media?: ExperienceMedia[];
}

export interface ExperienceMedia {
  id: number;
  experience_id: number;
  mediaUrl: string;
  caption: string;
  uploaded_at: string;
  deleted_at?: string | null;
}
