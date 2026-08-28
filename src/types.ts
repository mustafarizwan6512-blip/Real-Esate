export interface ProjectHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectAmenity {
  title: string;
  description?: string;
  icon?: string;
}

export interface NearbyPlace {
  name: string;
  category: string;
  distance: string;
  time?: string;
}

export interface WhyConsiderItem {
  title: string;
  description: string;
}

export interface UnitType {
  type: string;
  bedrooms?: string;
  beds?: string;
  bathrooms?: string;
  size: string;
  price?: string;
  availability?: string;
}

export interface Project {
  id: string;
  name: string;
  slug?: string;
  developer: string;
  developer_id?: string;
  city: string;
  district?: string;
  address?: string;
  location: string;
  category: string;
  property_type?: string;
  description: string;
  short_description?: string;
  bedrooms?: string;
  bathrooms?: string;
  size?: string;
  starting_price?: number;
  currency?: string;
  payment_plan?: string;
  handover_date?: string;
  furnished_status?: string;
  status: 'Available' | 'Limited Availability' | 'Coming Soon' | 'Sold Out' | 'Temporarily Unavailable' | 'Hidden' | 'Under Construction' | string;
  featured: boolean;
  hero_image_url?: string;
  floor_plan_url?: string;
  video_url?: string;
  virtual_tour_url?: string;
  brochure_url?: string;
  latitude?: number;
  longitude?: number;
  seo_title?: string;
  seo_description?: string;
  notes?: string;
  images: string[];
  highlights: (ProjectHighlight | string)[];
  amenities: (ProjectAmenity | string)[];
  nearby_places?: NearbyPlace[];
  why_consider?: WhyConsiderItem[];
  unit_types?: UnitType[];
}

export interface Developer {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  location?: string;
}

export interface Location {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface Lead {
  id: string;
  name: string;
  country?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  city?: string;
  preferred_city?: string;
  property_id?: string;
  property_name?: string;
  propertyType?: string;
  purpose?: string;
  budget?: string;
  bedrooms?: string;
  preferred_contact?: string;
  requirements?: string;
  message?: string;
  source?: string;
  date?: string;
  status?: string;
}

