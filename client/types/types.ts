export interface UserResponse {
  user: {
    name: string;
    email: string;
    role: string;
    phone_number: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

// --------------ART---------------
// export interface Reference {
//   title: string;
//   link: string;
// }

export type DashboardData = Record<string, SourceData>;

export interface SourceData {
  key_pain_points?: string[];
  key_triggers?: string[];
  hooks?: string[];
  meta_tags?: string[];
  keywords?: string[];
  references?: string[];
  cta?: {
    title: string;
    description: string;
    cta_message: string;
  }
}