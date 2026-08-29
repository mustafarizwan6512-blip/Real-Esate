import { Project, Developer, Location, Lead, ProjectHighlight, ProjectAmenity, NearbyPlace, WhyConsiderItem, UnitType } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabase';

export const parkResidence2Project: Project = {
  id: "2",
  slug: "park-residence-2",
  name: "PARK RESIDENCE 2",
  developer: "REAL Real Estate",
  city: "Jeddah",
  district: "Darb Al Haramain",
  address: "Darb Al Haramain, Jeddah",
  location: "Darb Al Haramain, Jeddah",
  category: "Residential, Premium Penthouse, commercial",
  property_type: "Residential, Premium Penthouse, commercial",
  description: "A breathtaking high-rise development situated in Darb Al Haramain. PARK RESIDENCE 2 combines absolute luxury with modern design. Developed by REAL Real Estate, this under-construction property features direct views of the central park, surrounded by lush greenery, walking paths, and world-class retail spaces.",
  short_description: "Premium residential, penthouse, and commercial suites in Darb Al Haramain by REAL Real Estate.",
  bedrooms: "Premium Penthouses & Residential Suites",
  bathrooms: "3+ Bathrooms",
  size: "14.89 Million SQ FT",
  starting_price: 320000,
  currency: "SAR",
  handover_date: "2028",
  furnished_status: "Premium High Specification",
  status: "Under Construction",
  featured: true,
  hero_image_url: "/image.png",
  images: [
    "/image.png",
    "/park_facade.jpg",
    "/park_entrance.jpg",
    "/park_amenities.jpg",
    "/park_guarantees.jpg",
    "/park_view.jpg"
  ],
  highlights: [
    {
      title: "CENTRAL PARK",
      description: "Prime location with direct views of the central park, surrounded by lush greenery and walking paths.",
      icon: "Trees"
    },
    {
      title: "Smart Home System",
      description: "Enhanced security and convenience through digital access controls.",
      icon: "Sparkles"
    },
    {
      title: "Surveillance System",
      description: "24/7 surveillance systems are active throughout the property.",
      icon: "ShieldCheck"
    },
    {
      title: "Gym",
      description: "A fully equipped fitness center",
      icon: "Dumbbell"
    },
    {
      title: "AC Community Hall",
      description: "A climate-controlled communal space for resident gatherings and events",
      icon: "Building"
    },
    {
      title: "Firefighting System",
      description: "Integrated safety systems built to high-quality construction and professional standards",
      icon: "Shield"
    }
  ],
  amenities: [
    { title: "24/7 Surveillance System", description: "24/7 surveillance systems are active throughout the property.", icon: "ShieldCheck" },
    { title: "Smart Home System", description: "Enhanced security and convenience through digital access controls.", icon: "Sparkles" },
    { title: "Fully Equipped Gym", description: "A fully equipped fitness center", icon: "Dumbbell" },
    { title: "AC Community Hall", description: "A climate-controlled communal space for resident gatherings and events", icon: "Building" },
    { title: "Integrated Firefighting System", description: "Integrated safety systems built to high-quality construction and professional standards", icon: "Shield" }
  ],
  nearby_places: [
    { name: "CENTRAL PARK", category: "Park & Nature", distance: "Direct View", time: "Immediate" },
    { name: "King Abdulaziz University", category: "Education", distance: "Nearby", time: "5 mins" },
    { name: "Haramain High-Speed Railway station", category: "Railway", distance: "Convenient Access", time: "8 mins" },
    { name: "Andalus Mall and Salam Mall", category: "Malls & Retail", distance: "Nearby", time: "6 mins" },
    { name: "King Fahd Medical Research Library & Center", category: "Medical Research", distance: "Nearby", time: "4 mins" },
    { name: "King Abdulaziz International Airport", category: "Airport", distance: "Airport Hub", time: "20 mins" },
    { name: "King Abdullah Road", category: "Landmark Arterial Road", distance: "Direct Access", time: "1 min" }
  ],
  why_consider: [
    {
      title: "Developed by REAL Real Estate",
      description: "Exceptional modern architecture and construction standards with high quality execution."
    },
    {
      title: "Darb Al Haramain Location",
      description: "Prime location offering spectacular direct views of the central park and city skyline."
    },
    {
      title: "Excellent Pricing & Terms",
      description: "Highly competitive starting price of SAR 320k for an ultra-premium development."
    }
  ],
  unit_types: [
    { type: "Premium Penthouse Suite", beds: "3 - 5 Beds", bathrooms: "3 - 5 Baths", size: "14.89 Million SQ FT", price: "Starting from SAR 320,000", availability: "Under Construction" },
    { type: "Luxury Residential Apartment", beds: "1 - 3 Beds", bathrooms: "2 - 4 Baths", size: "14.89 Million SQ FT", price: "Starting from SAR 320,000", availability: "Under Construction" },
    { type: "Commercial Boutique Showroom", beds: "Retail", bathrooms: "1 - 2 Baths", size: "14.89 Million SQ FT", price: "Starting from SAR 320,000", availability: "Under Construction" }
  ],
  seo_title: "PARK RESIDENCE 2 Jeddah | REAL Real Estate | REFERESTATES",
  seo_description: "Discover PARK RESIDENCE 2 in Jeddah by REAL Real Estate. Starting from SAR 320k, 14.89 Million SQ FT, Handover 2028. Premium residential, penthouses & commercial luxury suites."
};

// High-end fallback demo projects for when Supabase is initially empty or offline
export const fallbackProjects: Project[] = [
  parkResidence2Project,
  {
    id: "al-rehab-center",
    slug: "al-rehab-center",
    name: "AL REHAB CENTER",
    developer: "Tamleek Al Nahdi",
    city: "Jeddah",
    district: "Al Rehab District",
    address: "Prince Mutaib bin Abdulaziz Road, Al Rehab, Jeddah",
    location: "Al Rehab, Jeddah",
    category: "Premium Mixed-Use (Commercial & Residential)",
    property_type: "Premium Mixed-Use (Commercial & Residential)",
    description: "A prominent mixed-use development situated directly on Prince Mutaib bin Abdulaziz Road in Al Rehab District, Jeddah. Developed by Tamleek Al Nahdi, AL REHAB CENTER combines premier ground-floor commercial showrooms and retail boutiques with luxury residential suites, secure basement parking, and expansive private rooftop terraces.",
    short_description: "Premium mixed-use commercial and residential landmark in Al Rehab, Jeddah by Tamleek Al Nahdi.",
    bedrooms: "Commercial Showrooms & Residential Suites",
    bathrooms: "1 - 4 Bathrooms",
    size: "63.74m² - 311.80 m²",
    starting_price: 390000,
    currency: "SAR",
    handover_date: "12/2027",
    furnished_status: "Premium High Specification",
    status: "Under Construction",
    featured: true,
    hero_image_url: "/al-rehab-center.webp",
    floor_plan_url: "",
    video_url: "",
    virtual_tour_url: "",
    brochure_url: "",
    latitude: 21.5433,
    longitude: 39.1728,
    seo_title: "AL REHAB CENTER Jeddah | Tamleek Al Nahdi | REFERESTATES",
    seo_description: "Discover AL REHAB CENTER in Jeddah by Tamleek Al Nahdi. Starting from SAR 390k, 63.74m² - 311.80 m², Handover 12/2027. Commercial showrooms & residential luxury suites.",
    images: [
      "/al-rehab-center.webp",
      "/rehab-facade.jpg",
      "/rehab-living-room.jpg",
      "/rehab-bedroom.jpg",
      "/rehab-staircase.jpg"
    ],
    highlights: [
      {
        title: "SPORTS & WELLNESS DISTRICT",
        description: "Situated just 250 meters from extensive public parks that feature dedicated sports clubs and premium athletic playgrounds.",
        icon: "Dumbbell"
      },
      {
        title: "COMMUNITY PARK & GARDENS",
        description: "Only 70 meters away from the peaceful Al-Suroor Garden and local mosque, offering beautiful green spaces right nearby.",
        icon: "Trees"
      },
      {
        title: "INTEGRATED SHOPPING CORRIDOR",
        description: "Located immediately adjacent to multiple commercial showrooms and retail malls for absolute convenience.",
        icon: "ShoppingBag"
      },
      {
        title: "SECURE BASEMENT PARKING",
        description: "A massive, high-capacity underground garage providing 98 secure and designated vehicle parking slots for residents.",
        icon: "ShieldCheck"
      },
      {
        title: "MAIN ROAD ACCESSIBILITY",
        description: "Perfectly positioned with a direct premium frontage right on Prince Mutaib bin Abdulaziz Road for effortless transit.",
        icon: "Compass"
      },
      {
        title: "EXCLUSIVE ROOFTOP TERRACES",
        description: "Luxury rooftop penthouse units featuring expansive, private front and rear open-air terraces.",
        icon: "Sparkles"
      }
    ],
    amenities: [
      { title: "Ground-Level Commercial Showrooms", description: "Boutique retail, cafes, and business spaces with prominent street frontage.", icon: "ShoppingBag" },
      { title: "98 Underground Parking Slots", description: "Expansive multi-bay subterranean parking with secured automated access.", icon: "Car" },
      { title: "Private Penthouse Terraces", description: "Dual-aspect front and rear open-air rooftop terraces.", icon: "Sparkles" },
      { title: "24/7 Monitored Security", description: "Dedicated surveillance cameras and building access control.", icon: "Shield" },
      { title: "High-Speed Elevators", description: "Modern rapid passenger elevators serving all residential and retail levels.", icon: "Building2" },
      { title: "Al-Suroor Garden Proximity", description: "Direct 70m walk to lush municipal gardens and local mosque.", icon: "Trees" }
    ],
    nearby_places: [
      { name: "Al - Waha International School for Girls", category: "School", distance: "Nearby", time: "3 mins" },
      { name: "Al Baik, McDonald's", category: "Restaurants", distance: "Walking Distance", time: "2 mins" },
      { name: "Imam Abu Hanifa Mosque", category: "Mosque", distance: "70 m", time: "1 min" },
      { name: "Al-Suroor Garden & Park", category: "Community Park", distance: "70 m", time: "1 min" },
      { name: "Prince Mutaib bin Abdulaziz Road", category: "Main Arterial Axis", distance: "Direct Frontage", time: "Immediate" },
      { name: "Jeddah Waterfront & Corniche", category: "Leisure & Coastal", distance: "8.5 km", time: "12 mins" },
      { name: "King Abdulaziz International Airport (JED)", category: "Aviation Hub", distance: "18.0 km", time: "18 mins" }
    ],
    why_consider: [
      {
        title: "Developed by Tamleek Al Nahdi",
        description: "Delivered with proven architectural expertise, rigorous quality standards, and dependable delivery execution."
      },
      {
        title: "Direct Prince Mutaib Road Frontage",
        description: "Unrivaled visibility and effortless vehicular connectivity to Jeddah's principal commercial arteries."
      },
      {
        title: "Attractive Starting Price from SAR 390k",
        description: "Highly competitive entry price for premium mixed-use units spanning from 63.74m² to 311.80 m²."
      },
      {
        title: "Handover Scheduled for 12/2027",
        description: "Clear construction roadmap with targeted handover in December 2027."
      }
    ],
    unit_types: [
      { type: "Commercial Boutique & Showroom", beds: "Retail Floor", bathrooms: "1 - 2 Baths", size: "63.74m² - 311.80 m²", price: "Starting from SAR 390,000", availability: "Under Construction" },
      { type: "Luxury Residential Suite", beds: "Executive Suite", bathrooms: "2 - 4 Baths", size: "63.74m² - 311.80 m²", price: "Starting from SAR 390,000", availability: "Under Construction" },
      { type: "Penthouse with Private Terraces", beds: "Penthouse", bathrooms: "3 - 4 Baths", size: "Up to 311.80 m²", price: "Starting from SAR 390,000", availability: "Under Construction" }
    ]
  },
  {
    id: "the-boulevard-villas",
    slug: "the-boulevard-villas",
    name: "AL REHAB CENTER",
    developer: "Tamleek Al Nahdi",
    city: "Jeddah",
    district: "Al Rehab District",
    address: "Prince Mutaib bin Abdulaziz Road, Al Rehab, Jeddah",
    location: "Al Rehab, Jeddah",
    category: "Premium Mixed-Use (Commercial & Residential)",
    property_type: "Premium Mixed-Use (Commercial & Residential)",
    description: "A prominent mixed-use development situated directly on Prince Mutaib bin Abdulaziz Road in Al Rehab District, Jeddah. Developed by Tamleek Al Nahdi, AL REHAB CENTER combines premier ground-floor commercial showrooms and retail boutiques with luxury residential suites, secure basement parking, and expansive private rooftop terraces.",
    short_description: "Premium mixed-use commercial and residential landmark in Al Rehab, Jeddah by Tamleek Al Nahdi.",
    bedrooms: "Commercial Showrooms & Residential Suites",
    bathrooms: "1 - 4 Bathrooms",
    size: "63.74m² - 311.80 m²",
    starting_price: 390000,
    currency: "SAR",
    handover_date: "12/2027",
    furnished_status: "Premium High Specification",
    status: "Under Construction",
    featured: true,
    hero_image_url: "/al-rehab-center.webp",
    images: [
      "/al-rehab-center.webp",
      "/rehab-facade.jpg",
      "/rehab-living-room.jpg",
      "/rehab-bedroom.jpg",
      "/rehab-staircase.jpg"
    ],
    highlights: [
      {
        title: "SPORTS & WELLNESS DISTRICT",
        description: "Situated just 250 meters from extensive public parks that feature dedicated sports clubs and premium athletic playgrounds.",
        icon: "Dumbbell"
      },
      {
        title: "COMMUNITY PARK & GARDENS",
        description: "Only 70 meters away from the peaceful Al-Suroor Garden and local mosque, offering beautiful green spaces right nearby.",
        icon: "Trees"
      },
      {
        title: "INTEGRATED SHOPPING CORRIDOR",
        description: "Located immediately adjacent to multiple commercial showrooms and retail malls for absolute convenience.",
        icon: "ShoppingBag"
      },
      {
        title: "SECURE BASEMENT PARKING",
        description: "A massive, high-capacity underground garage providing 98 secure and designated vehicle parking slots for residents.",
        icon: "ShieldCheck"
      },
      {
        title: "MAIN ROAD ACCESSIBILITY",
        description: "Perfectly positioned with a direct premium frontage right on Prince Mutaib bin Abdulaziz Road for effortless transit.",
        icon: "Compass"
      },
      {
        title: "EXCLUSIVE ROOFTOP TERRACES",
        description: "Luxury rooftop penthouse units featuring expansive, private front and rear open-air terraces.",
        icon: "Sparkles"
      }
    ],
    amenities: [
      { title: "Ground-Level Commercial Showrooms", description: "Boutique retail, cafes, and business spaces.", icon: "ShoppingBag" },
      { title: "98 Underground Parking Slots", description: "Secured automated parking garage.", icon: "Car" }
    ],
    nearby_places: [
      { name: "Al - Waha International School for Girls", category: "School", distance: "Nearby", time: "3 mins" },
      { name: "Al Baik, McDonald's", category: "Restaurants", distance: "Walking Distance", time: "2 mins" },
      { name: "Imam Abu Hanifa Mosque", category: "Mosque", distance: "70 m", time: "1 min" },
      { name: "Al-Suroor Garden & Park", category: "Community Park", distance: "70 m", time: "1 min" },
      { name: "Prince Mutaib bin Abdulaziz Road", category: "Main Arterial Axis", distance: "Direct Frontage", time: "Immediate" },
      { name: "Jeddah Waterfront & Corniche", category: "Leisure & Coastal", distance: "8.5 km", time: "12 mins" },
      { name: "King Abdulaziz International Airport (JED)", category: "Aviation Hub", distance: "18.0 km", time: "18 mins" }
    ],
    why_consider: [
      { title: "Developed by Tamleek Al Nahdi", description: "Proven track record with high architectural and delivery standards." },
      { title: "Strategic Al Rehab Hub", description: "Centrally positioned in Jeddah with consistent high tenant demand." }
    ]
  }
];

function parseNotesJson(notes: string | undefined | null): any {
  if (!notes) return {};
  try {
    const trimmed = notes.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return JSON.parse(trimmed);
    }
  } catch (e) {
    // Non-JSON notes
  }
  return {};
}

function normalizeHighlights(rawHighlights: any, rawNotesJson: any): (ProjectHighlight | string)[] {
  if (Array.isArray(rawNotesJson?.highlights) && rawNotesJson.highlights.length > 0) {
    return rawNotesJson.highlights;
  }
  if (Array.isArray(rawHighlights) && rawHighlights.length > 0) {
    return rawHighlights;
  }
  return [
    { title: "Prime Strategic Location", description: "Exceptional positioning with swift access to key transit corridors and commercial districts.", icon: "Compass" },
    { title: "Contemporary Architectural Design", description: "Engineered with refined stone facades, high acoustic insulation, and expansive glazing.", icon: "Building2" },
    { title: "Integrated Smart Features", description: "State-of-the-art building infrastructure with automated climate and security controls.", icon: "Sparkles" },
    { title: "Dedicated Monitored Parking", description: "Private covered parking bays with seamless electronic access management.", icon: "ShieldCheck" }
  ];
}

function normalizeAmenities(rawAmenities: any, rawNotesJson: any): (ProjectAmenity | string)[] {
  if (Array.isArray(rawNotesJson?.amenities) && rawNotesJson.amenities.length > 0) {
    return rawNotesJson.amenities;
  }
  if (Array.isArray(rawAmenities) && rawAmenities.length > 0) {
    return rawAmenities;
  }
  return [
    { title: "Infinity Leisure Pool", description: "Temperature-controlled swimming pool with dedicated sunbathing terrace.", icon: "Waves" },
    { title: "Modern Fitness Center", description: "Equipped with high-end cardiovascular and resistance training gear.", icon: "Dumbbell" },
    { title: "24/7 Security & Concierge", description: "Professional management with surveillance coverage across all entryways.", icon: "Shield" },
    { title: "Landscaped Gardens", description: "Lush outdoor green pockets and shaded relaxation plazas.", icon: "Trees" }
  ];
}

function normalizeNearby(rawNotesJson: any, city: string, district?: string): NearbyPlace[] {
  if (Array.isArray(rawNotesJson?.nearby_places) && rawNotesJson.nearby_places.length > 0) {
    return rawNotesJson.nearby_places;
  }
  return [
    { name: `International Airport`, category: "Aviation Hub", distance: "15 km", time: "16 mins" },
    { name: `Central Commercial & Business District`, category: "Business", distance: "7.5 km", time: "10 mins" },
    { name: `Premier Shopping & Dining Promenade`, category: "Retail", distance: "3.2 km", time: "5 mins" },
    { name: `Specialized Healthcare Hospital`, category: "Healthcare", distance: "4.8 km", time: "8 mins" }
  ];
}

function normalizeWhyConsider(rawNotesJson: any): WhyConsiderItem[] {
  if (Array.isArray(rawNotesJson?.why_consider) && rawNotesJson.why_consider.length > 0) {
    return rawNotesJson.why_consider;
  }
  return [
    {
      title: "Strategic Location Advantage",
      description: "Positioned in a premier residential micro-market with robust infrastructure connectivity and immediate access to prominent business and lifestyle centers."
    },
    {
      title: "High-Caliber Construction Standards",
      description: "Built with rigorous architectural precision, modern MEP specifications, and long-term durability designed for low maintenance."
    },
    {
      title: "Promising Capital Preservation & Growth",
      description: "Consistent rental appeal from executive tenants and enduring capital value supported by Saudi Arabia's expanding urban economy."
    },
    {
      title: "Structured Developer Governance",
      description: "Developed under regulated escrow guidelines with clear milestone tracking and straightforward transfer protocols."
    }
  ];
}

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return fallbackProjects;

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*, developers(id, name, logo_url, description), property_media(url, media_type, sort_order)')
      .neq('status', 'Hidden')
      .order('sort_order', { ascending: true });
      
    if (error) throw error;
    if (!data || data.length === 0) return fallbackProjects;
    
    // Map Supabase schema to frontend schema
    return data.map((p: any) => {
      if (p.id === '2' || p.slug === 'marina-residences' || p.slug === 'park-residence-2' || p.id === 'bbbbbbbb-2222-2222-2222-222222222222') {
        return parkResidence2Project;
      }
      const isRehab = (p.name && (/rehab/i.test(p.name) || /boulevard/i.test(p.name))) || (p.slug && (/rehab/i.test(p.slug) || /boulevard/i.test(p.slug)));
      const notesJson = parseNotesJson(p.notes);
      const mediaImages = (p.property_media || [])
        .filter((m: any) => !m.media_type || m.media_type === 'image')
        .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
        .map((m: any) => m.url);

      const rehabImages = [
        "/al-rehab-center.webp",
        "/rehab-facade.jpg",
        "/rehab-living-room.jpg",
        "/rehab-bedroom.jpg",
        "/rehab-staircase.jpg"
      ];

      const allImages = isRehab 
        ? rehabImages
        : (p.hero_image_url 
          ? [p.hero_image_url, ...mediaImages.filter((u: string) => u !== p.hero_image_url)]
          : mediaImages.length > 0 
            ? mediaImages 
            : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]);

      return {
        id: p.id,
        slug: isRehab ? 'al-rehab-center' : (p.slug || p.id),
        name: isRehab ? 'AL REHAB CENTER' : p.name,
        developer: isRehab ? 'Tamleek Al Nahdi' : (p.developers?.name || notesJson.developer_name || 'Independent Luxury Developer'),
        developer_id: p.developer_id,
        city: isRehab ? 'Jeddah' : (p.city || 'Riyadh'),
        district: isRehab ? 'Al Rehab District' : (p.district || ''),
        address: isRehab ? 'Prince Mutaib bin Abdulaziz Road, Al Rehab, Jeddah' : (p.address || ''),
        location: isRehab ? 'Al Rehab, Jeddah' : (p.district ? `${p.district}, ${p.city}` : p.city),
        category: isRehab ? 'Premium Mixed-Use (Commercial & Residential)' : (p.property_type || 'Residential'),
        property_type: isRehab ? 'Premium Mixed-Use (Commercial & Residential)' : (p.property_type || 'Residential'),
        description: isRehab ? 'A prominent mixed-use development situated directly on Prince Mutaib bin Abdulaziz Road in Al Rehab District, Jeddah. Developed by Tamleek Al Nahdi, AL REHAB CENTER combines premier ground-floor commercial showrooms and retail boutiques with luxury residential suites, secure basement parking, and expansive private rooftop terraces.' : (p.description || p.short_description || 'A prime luxury property offering curated living in Saudi Arabia.'),
        short_description: isRehab ? 'Premium mixed-use commercial and residential landmark in Al Rehab, Jeddah by Tamleek Al Nahdi.' : (p.short_description || p.description?.substring(0, 150) || ''),
        bedrooms: isRehab ? 'Commercial Showrooms & Residential Suites' : (p.bedrooms || ''),
        bathrooms: isRehab ? '1 - 4 Bathrooms' : (p.bathrooms || ''),
        size: isRehab ? '63.74m² - 311.80 m²' : (p.size || ''),
        starting_price: isRehab ? 390000 : (p.starting_price ? Number(p.starting_price) : undefined),
        currency: p.currency || 'SAR',
        payment_plan: isRehab ? '' : (p.payment_plan || ''),
        handover_date: isRehab ? '12/2027' : (p.handover_date || ''),
        furnished_status: isRehab ? 'Premium High Specification' : (p.furnished_status || 'Unfurnished'),
        status: isRehab ? 'Under Construction' : (p.status || 'Available'),
        featured: Boolean(p.featured),
        hero_image_url: isRehab ? "/al-rehab-center.webp" : (p.hero_image_url || allImages[0]),
        floor_plan_url: p.floor_plan_url || notesJson.floor_plan_url || '',
        video_url: notesJson.video_url || '',
        virtual_tour_url: notesJson.virtual_tour_url || '',
        brochure_url: notesJson.brochure_url || '',
        latitude: p.latitude,
        longitude: p.longitude,
        seo_title: isRehab ? 'AL REHAB CENTER Jeddah | Tamleek Al Nahdi | REFERESTATES' : (p.seo_title || `${p.name} | REFERESTATES`),
        seo_description: isRehab ? 'Discover AL REHAB CENTER in Jeddah by Tamleek Al Nahdi. Starting from SAR 390k, 63.74m² - 311.80 m², Handover 12/2027. Commercial showrooms & residential luxury suites.' : (p.seo_description || p.short_description || p.description),
        notes: p.notes,
        images: allImages,
        highlights: isRehab ? fallbackProjects[0].highlights : normalizeHighlights([], notesJson),
        amenities: isRehab ? fallbackProjects[0].amenities : normalizeAmenities([], notesJson),
        nearby_places: isRehab ? fallbackProjects[0].nearby_places : normalizeNearby(notesJson, isRehab ? 'Jeddah' : p.city, isRehab ? 'Al Rehab District' : p.district),
        why_consider: isRehab ? fallbackProjects[0].why_consider : normalizeWhyConsider(notesJson),
        unit_types: isRehab ? fallbackProjects[0].unit_types : notesJson.unit_types
      };
    });
  } catch (err) {
    console.error("Error fetching projects from Supabase:", err);
    return fallbackProjects;
  }
}

export async function fetchProject(identifier: string): Promise<Project> {
  const cleanId = (identifier || '').toLowerCase();
  if (cleanId === '2' || cleanId === 'marina-residences' || cleanId === 'park-residence-2' || cleanId === 'bbbbbbbb-2222-2222-2222-222222222222') {
    return parkResidence2Project;
  }

  if (!isSupabaseConfigured) {
    const match = fallbackProjects.find(p => p.id === identifier || p.slug === identifier);
    return match || fallbackProjects[0];
  }
  
  try {
    // Check if identifier is a UUID or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

    let query = supabase
      .from('properties')
      .select('*, developers(*), property_media(*)');

    if (isUUID) {
      query = query.eq('id', identifier);
    } else {
      query = query.or(`slug.eq.${identifier},id.eq.${identifier}`);
    }

    const { data, error } = await query.maybeSingle();
      
    if (error) {
      console.error("Supabase fetchProject error:", error);
    }
    
    if (!data) {
      // Check fallback data
      const match = fallbackProjects.find(p => p.id === identifier || p.slug === identifier);
      if (match) return match;
      throw new Error(`Property not found: ${identifier}`);
    }

    const isRehab = (data.name && (/rehab/i.test(data.name) || /boulevard/i.test(data.name))) || (data.slug && (/rehab/i.test(data.slug) || /boulevard/i.test(data.slug)));
    const notesJson = parseNotesJson(data.notes);
    const mediaImages = (data.property_media || [])
      .filter((m: any) => !m.media_type || m.media_type === 'image')
      .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((m: any) => m.url);

    const rehabImages = [
      "/al-rehab-center.webp",
      "/rehab-facade.jpg",
      "/rehab-living-room.jpg",
      "/rehab-bedroom.jpg",
      "/rehab-staircase.jpg"
    ];

    const allImages = isRehab
      ? rehabImages
      : (data.hero_image_url 
        ? [data.hero_image_url, ...mediaImages.filter((u: string) => u !== data.hero_image_url)]
        : mediaImages.length > 0 
          ? mediaImages 
          : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"]);

    return {
      id: data.id,
      slug: isRehab ? 'al-rehab-center' : (data.slug || data.id),
      name: isRehab ? 'AL REHAB CENTER' : data.name,
      developer: isRehab ? 'Tamleek Al Nahdi' : (data.developers?.name || notesJson.developer_name || 'Independent Luxury Developer'),
      developer_id: data.developer_id,
      city: isRehab ? 'Jeddah' : (data.city || 'Riyadh'),
      district: isRehab ? 'Al Rehab District' : (data.district || ''),
      address: isRehab ? 'Prince Mutaib bin Abdulaziz Road, Al Rehab, Jeddah' : (data.address || ''),
      location: isRehab ? 'Al Rehab, Jeddah' : (data.district ? `${data.district}, ${data.city}` : (data.city || 'Saudi Arabia')),
      category: isRehab ? 'Premium Mixed-Use (Commercial & Residential)' : (data.property_type || 'Residential'),
      property_type: isRehab ? 'Premium Mixed-Use (Commercial & Residential)' : (data.property_type || 'Residential'),
      description: isRehab ? 'A prominent mixed-use development situated directly on Prince Mutaib bin Abdulaziz Road in Al Rehab District, Jeddah. Developed by Tamleek Al Nahdi, AL REHAB CENTER combines premier ground-floor commercial showrooms and retail boutiques with luxury residential suites, secure basement parking, and expansive private rooftop terraces.' : (data.description || data.short_description || 'A prestigious residential development in Saudi Arabia.'),
      short_description: isRehab ? 'Premium mixed-use commercial and residential landmark in Al Rehab, Jeddah by Tamleek Al Nahdi.' : (data.short_description || data.description?.substring(0, 160) || ''),
      bedrooms: isRehab ? 'Commercial Showrooms & Residential Suites' : (data.bedrooms || ''),
      bathrooms: isRehab ? '1 - 4 Bathrooms' : (data.bathrooms || ''),
      size: isRehab ? '63.74m² - 311.80 m²' : (data.size || ''),
      starting_price: isRehab ? 390000 : (data.starting_price ? Number(data.starting_price) : undefined),
      currency: data.currency || 'SAR',
      payment_plan: isRehab ? '' : (data.payment_plan || ''),
      handover_date: isRehab ? '12/2027' : (data.handover_date || ''),
      furnished_status: isRehab ? 'Premium High Specification' : (data.furnished_status || 'Unfurnished'),
      status: isRehab ? 'Under Construction' : (data.status || 'Available'),
      featured: Boolean(data.featured),
      hero_image_url: isRehab ? "/al-rehab-center.webp" : (data.hero_image_url || allImages[0]),
      floor_plan_url: data.floor_plan_url || notesJson.floor_plan_url || '',
      video_url: notesJson.video_url || '',
      virtual_tour_url: notesJson.virtual_tour_url || '',
      brochure_url: notesJson.brochure_url || '',
      latitude: data.latitude,
      longitude: data.longitude,
      seo_title: isRehab ? 'AL REHAB CENTER Jeddah | Tamleek Al Nahdi | REFERESTATES' : (data.seo_title || `${data.name} | REFERESTATES Private Discovery`),
      seo_description: isRehab ? 'Discover AL REHAB CENTER in Jeddah by Tamleek Al Nahdi. Starting from SAR 390k, 63.74m² - 311.80 m², Handover 12/2027. Commercial showrooms & residential luxury suites.' : (data.seo_description || data.short_description || data.description),
      notes: data.notes,
      images: allImages,
      highlights: isRehab ? fallbackProjects[0].highlights : normalizeHighlights([], notesJson),
      amenities: isRehab ? fallbackProjects[0].amenities : normalizeAmenities([], notesJson),
      nearby_places: isRehab ? fallbackProjects[0].nearby_places : normalizeNearby(notesJson, isRehab ? 'Jeddah' : data.city, isRehab ? 'Al Rehab District' : data.district),
      why_consider: isRehab ? fallbackProjects[0].why_consider : normalizeWhyConsider(notesJson),
      unit_types: isRehab ? fallbackProjects[0].unit_types : notesJson.unit_types
    };
  } catch (err) {
    console.error("fetchProject execution error:", err);
    const match = fallbackProjects.find(p => p.id === identifier || p.slug === identifier);
    if (match) return match;
    return fallbackProjects[0];
  }
}

export async function fetchRelatedProjects(currentProjectId: string, city?: string, category?: string): Promise<Project[]> {
  const all = await fetchProjects();
  const filtered = all.filter(p => p.id !== currentProjectId && p.slug !== currentProjectId);
  
  // Sort with matches in same city/category prioritized
  filtered.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (city && a.city?.toLowerCase() === city.toLowerCase()) scoreA += 2;
    if (city && b.city?.toLowerCase() === city.toLowerCase()) scoreB += 2;
    if (category && a.category?.toLowerCase() === category.toLowerCase()) scoreA += 1;
    if (category && b.category?.toLowerCase() === category.toLowerCase()) scoreB += 1;
    return scoreB - scoreA;
  });

  return filtered.slice(0, 3);
}

export async function fetchLocations(): Promise<Location[]> {
  return [
    { id: "1", name: "Riyadh", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
    { id: "2", name: "Jeddah", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
    { id: "3", name: "Makkah", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
    { id: "4", name: "Madinah", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  ];
}

export async function fetchDevelopers(): Promise<Developer[]> {
  if (!isSupabaseConfigured) return [];
  
  const { data, error } = await supabase
    .from('developers')
    .select('*')
    .eq('status', true);
    
  if (error) throw error;
  
  return data.map((d: any) => ({
    id: d.id,
    name: d.name,
    logo: d.logo_url,
    description: d.description
  }));
}

export async function submitLead(lead: Partial<Lead>): Promise<{ success: boolean; lead: Lead }> {
  console.log("Submitting lead details:", lead);

  // If Supabase is configured, submit directly from the client (critical for static environments like Vercel)
  if (isSupabaseConfigured) {
    // Generate UUID client-side using crypto.randomUUID() so the lead has its ID without needing .select()
    const generateUUID = (): string => {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    const leadId = generateUUID();
    const createdAt = new Date().toISOString();

    // Validate UUID for property_id to avoid PostgreSQL type error
    const isUUID = (str?: string): boolean => {
      if (!str) return false;
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
    };
    const safePropertyId = isUUID(lead.property_id) ? lead.property_id : null;

    // Handle lead_source Postgres enum mapping
    const allowedSources = ['Website', 'Property Page', 'Contact Form', 'WhatsApp', 'Campaign', 'Other'];
    let mappedSource = lead.source || 'Website';
    if (!allowedSources.includes(mappedSource)) {
      if (mappedSource.toLowerCase().includes('contact')) {
        mappedSource = 'Contact Form';
      } else if (mappedSource.toLowerCase().includes('property')) {
        mappedSource = 'Property Page';
      } else {
        mappedSource = 'Other';
      }
    }

    const leadData = {
      id: leadId,
      name: lead.name || 'Anonymous',
      email: lead.email || null,
      phone: lead.phone || lead.whatsapp || null,
      whatsapp: lead.whatsapp || lead.phone || null,
      country: lead.country || 'Saudi Arabia',
      preferred_city: lead.preferred_city || lead.city || null,
      property_id: safePropertyId,
      property_name: lead.property_name || null,
      budget: lead.budget || null,
      bedrooms: lead.bedrooms || null,
      message: lead.message || lead.requirements || null,
      source: mappedSource,
      status: 'New',
      priority: 'Medium',
      created_at: createdAt
    };

    console.log("[Client Supabase] Inserting row (write-only for RLS compliance):", leadData);
    
    // Write-only insert: do NOT use .select() because RLS intentionally prevents public SELECT access
    const { error: insertError } = await supabase
      .from('leads')
      .insert([leadData]);

    if (insertError) {
      console.error("[Client Supabase Database Error] Failed to insert lead:", insertError);
      throw new Error(insertError.message || "Failed to save inquiry to database");
    }

    console.log("[Client Supabase Database Success] Lead inserted with ID:", leadId);

    // Invoke resend-email Edge Function to dispatch Resend email notification
    // Note: The lead database insertion remains successful even if the email function fails
    try {
      console.log("[Client Supabase Edge Function] Triggering resend-email...");
      const { data: funcData, error: funcError } = await supabase.functions.invoke('resend-email', {
        body: leadData
      });

      if (funcError) {
        console.error("[Client Supabase Edge Function Error] Failed to invoke resend-email dispatch:", funcError);
      } else {
        console.log("[Client Supabase Edge Function Success] resend-email response:", funcData);
      }
    } catch (funcErr) {
      console.error("[Client Supabase Edge Function Invoke Catch]:", funcErr);
    }

    return { success: true, lead: { ...lead, ...leadData } as Lead };
  }

  // Fallback to local server proxy if Supabase client is not configured
  console.log("[Local Fallback] Attempting server proxy submission to /api/leads...");
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lead)
    });

    if (response.ok) {
      const resData = await response.json();
      console.log("[Local Fallback Success] Server lead submission response:", resData);
      return { success: true, lead: (resData.lead || lead) as Lead };
    } else {
      const errorText = await response.text();
      console.warn("[Local Fallback Error] Server responded with status:", response.status, errorText);
      throw new Error(`Server responded with status ${response.status}`);
    }
  } catch (apiErr: any) {
    console.error("[Local Fallback Catch Error] Backend lead API request failed:", apiErr);
    throw apiErr;
  }
}

export async function fetchWebsiteContent(section: string = 'homepage'): Promise<Record<string, string>> {
  if (!isSupabaseConfigured) return {};

  const { data, error } = await supabase
    .from('website_content')
    .select('key, value')
    .eq('section', section);
    
  if (error) {
    console.error('Error fetching website content:', error);
    return {};
  }
  
  const contentMap: Record<string, string> = {};
  data.forEach((item: any) => {
    contentMap[item.key] = item.value;
  });
  
  return contentMap;
}

export async function fetchGeneralSettings(): Promise<{ whatsapp: string; phone: string; email: string }> {
  const defaults = {
    whatsapp: '966536609534',
    phone: '+966 53 660 9534',
    email: 'info@referestates.com'
  };

  if (!isSupabaseConfigured) return defaults;

  try {
    const { data } = await supabase
      .from('website_content')
      .select('content')
      .eq('section', 'general_settings')
      .maybeSingle();

    if (data?.content) {
      return {
        whatsapp: data.content.contact_whatsapp?.replace(/[^0-9]/g, '') || defaults.whatsapp,
        phone: data.content.contact_phone || defaults.phone,
        email: data.content.contact_email || defaults.email
      };
    }
  } catch (e) {
    // Ignore and return defaults
  }
  return defaults;
}


