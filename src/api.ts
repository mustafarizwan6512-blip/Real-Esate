import { Project, Developer, Location, Lead, ProjectHighlight, ProjectAmenity, NearbyPlace, WhyConsiderItem, UnitType } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabase';

// High-end fallback demo projects for when Supabase is initially empty or offline
export const fallbackProjects: Project[] = [
  {
    id: "al-rehab-center",
    slug: "al-rehab-center",
    name: "AL REHAB CENTER",
    developer: "Tamleek Al Nahdi",
    city: "Jeddah",
    district: "Al Rehab District",
    address: "Palestine Street / Prince Mutaib Axis, Al Rehab, Jeddah",
    location: "Al Rehab, Jeddah",
    category: "Commercial & Luxury Residential Complex",
    property_type: "Commercial & Residential Center",
    description: "A monumental contemporary landmark fusing boutique ground-floor commercial retail with luxury residential living. Designed for discerning buyers seeking serene private architecture, illuminated vertical fins, and seamless access to Jeddah's prime commercial arteries.",
    short_description: "A refined mixed-use commercial and residential landmark in the heart of Jeddah by Tamleek Al Nahdi.",
    bedrooms: "2, 3 & 4 Bedrooms + Commercial Suites",
    bathrooms: "3 - 5 Bathrooms",
    size: "185 – 540 sqm",
    starting_price: 1850000,
    currency: "SAR",
    payment_plan: "10% Down Payment / 4-Year Flexible Construction-Linked Installments",
    handover_date: "Q4 2026",
    furnished_status: "Bespoke Italian Kitchens & Luxury Fitted Bathrooms",
    status: "Available",
    featured: true,
    hero_image_url: "/al-rehab-center.webp",
    floor_plan_url: "",
    video_url: "",
    virtual_tour_url: "",
    brochure_url: "",
    latitude: 21.5433,
    longitude: 39.1728,
    seo_title: "AL REHAB CENTER Jeddah | REFERESTATES Private Discovery",
    seo_description: "Discover AL REHAB CENTER in Jeddah by Tamleek Al Nahdi. Exceptional commercial suites, retail boutiques, and luxury residences presented by REFERESTATES.",
    images: [
      "/al-rehab-center.webp",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    highlights: [
      {
        title: "Prime Central Axis",
        description: "Strategically located in Al Rehab with instant access to Palestine Road and the Jeddah Corniche corridor.",
        icon: "Compass"
      },
      {
        title: "Architectural Grandeur",
        description: "Modernist multi-tower stone facade engineered with illuminated vertical accent fins and acoustic glazing.",
        icon: "Building2"
      },
      {
        title: "Ground-Floor Boutique Promenade",
        description: "Vibrant ground level featuring specialty cafes, wellness salons, and curated lifestyle boutiques.",
        icon: "ShoppingBag"
      },
      {
        title: "Integrated Smart Living",
        description: "Full KNX home automation with biometric keyless entry and climate optimization.",
        icon: "Sparkles"
      },
      {
        title: "Secure Street & Subterranean Parking",
        description: "Dedicated front-street and basement monitored parking bays with EV charging stations.",
        icon: "ShieldCheck"
      },
      {
        title: "High Investment Yield",
        description: "Strong capital appreciation and high commercial & residential tenant demand in Jeddah's hub.",
        icon: "DollarSign"
      }
    ],
    amenities: [
      { title: "Ground-Level Boutique Arcade", description: "Curated artisanal cafes, specialty dining, and retail storefronts.", icon: "ShoppingBag" },
      { title: "Executive Health Club & Gym", description: "Fully outfitted with state-of-the-art cardiovascular and strength systems.", icon: "Dumbbell" },
      { title: "24/7 Dedicated Concierge", description: "White-glove reception, parcel management, and security staff.", icon: "Award" },
      { title: "Private Business Lounge", description: "Sophisticated lounge and meeting suites for commercial hosting.", icon: "Coffee" },
      { title: "Landscaped Promenade", description: "Pedestrian-friendly sidewalks with native greenery and outdoor seating.", icon: "Trees" },
      { title: "Smart Access & 24/7 Surveillance", description: "CCTV security perimeter and high-speed encrypted elevators.", icon: "Shield" }
    ],
    nearby_places: [
      { name: "Jeddah Waterfront & Corniche", category: "Leisure & Coastal", distance: "8.5 km", time: "12 mins" },
      { name: "King Abdulaziz International Airport (JED)", category: "Aviation Hub", distance: "18.0 km", time: "18 mins" },
      { name: "Al Andalus Mall & Town Square", category: "Retail & Dining", distance: "4.2 km", time: "7 mins" },
      { name: "International Medical Center (IMC)", category: "Healthcare", distance: "5.1 km", time: "9 mins" },
      { name: "King Abdulaziz University Campus", category: "Education", distance: "6.0 km", time: "10 mins" },
      { name: "Madinah Highway Arterial Link", category: "Transportation", distance: "2.0 km", time: "3 mins" }
    ],
    why_consider: [
      {
        title: "Developed by Tamleek Al Nahdi",
        description: "Delivered with trusted local expertise, stringent construction governance, and transparent milestone tracking."
      },
      {
        title: "Strategic Al Rehab Location Advantage",
        description: "Centrally positioned with effortless vehicular transit across major Jeddah expressways and commercial zones."
      },
      {
        title: "Dual Commercial & Residential Appeal",
        description: "Combines high-footfall street-level retail with tranquil upper-floor residential suites for diverse revenue potential."
      },
      {
        title: "Enduring Asset Quality",
        description: "High-grade exterior cladding, robust MEP infrastructure, and energy-efficient climate envelope."
      }
    ],
    unit_types: [
      { type: "Executive 2-Bedroom Suite", beds: "2 Beds", bathrooms: "2.5 Baths", size: "185 sqm", price: "From SAR 1,850,000", availability: "Available" },
      { type: "Luxury 3-Bedroom Residence", beds: "3 Beds + Maid", bathrooms: "4 Baths", size: "260 sqm", price: "From SAR 2,450,000", availability: "Limited" },
      { type: "Commercial Retail Storefront", beds: "Retail Floor", bathrooms: "2 Baths", size: "140 – 350 sqm", price: "Price Upon Application", availability: "Available" }
    ]
  },
  {
    id: "the-boulevard-villas",
    slug: "the-boulevard-villas",
    name: "AL REHAB CENTER",
    developer: "Tamleek Al Nahdi",
    city: "Jeddah",
    district: "Al Rehab District",
    address: "Al Rehab, Jeddah, Saudi Arabia",
    location: "Al Rehab, Jeddah",
    category: "Commercial & Luxury Residential Complex",
    property_type: "Commercial & Residential Center",
    description: "A premier commercial and residential landmark in Al Rehab, Jeddah by Tamleek Al Nahdi, featuring illuminated facade architecture, ground floor boutique retail, and luxury residential apartments.",
    short_description: "Modern commercial & residential landmark in Jeddah by Tamleek Al Nahdi.",
    bedrooms: "2, 3 & 4 Bedrooms",
    bathrooms: "3 - 5 Bathrooms",
    size: "185 – 520 sqm",
    starting_price: 1850000,
    currency: "SAR",
    payment_plan: "Flexible Construction-Linked Installments",
    handover_date: "Q4 2026",
    furnished_status: "Premium High Specification",
    status: "Available",
    featured: true,
    hero_image_url: "/al-rehab-center.webp",
    images: [
      "/al-rehab-center.webp",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    highlights: [
      { title: "Prime Jeddah Hub", description: "Conveniently situated in Al Rehab with seamless arterial connectivity.", icon: "Compass" },
      { title: "Illuminated Modern Facade", description: "Distinctive architectural lighting fins and commercial storefronts.", icon: "Building2" },
      { title: "24/7 Security & CCTV", description: "Round-the-clock facility surveillance and access management.", icon: "ShieldCheck" }
    ],
    amenities: [
      { title: "Ground Floor Boutiques", description: "Artisanal cafes, salons, and retail shops.", icon: "ShoppingBag" },
      { title: "Fitness & Wellness", description: "Equipped cardiovascular and training suites.", icon: "Dumbbell" }
    ],
    nearby_places: [
      { name: "Jeddah Corniche & Waterfront", category: "Leisure", distance: "8.5 km", time: "12 mins" },
      { name: "King Abdulaziz Airport", category: "Airport", distance: "18 km", time: "18 mins" }
    ],
    why_consider: [
      { title: "By Tamleek Al Nahdi", description: "Proven track record with high architectural and delivery standards." },
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
      const isBoulevard = (p.name && /boulevard/i.test(p.name)) || (p.slug && /boulevard/i.test(p.slug));
      const notesJson = parseNotesJson(p.notes);
      const mediaImages = (p.property_media || [])
        .filter((m: any) => !m.media_type || m.media_type === 'image')
        .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
        .map((m: any) => m.url);

      const allImages = isBoulevard 
        ? ["/al-rehab-center.webp", ...mediaImages]
        : (p.hero_image_url 
          ? [p.hero_image_url, ...mediaImages.filter((u: string) => u !== p.hero_image_url)]
          : mediaImages.length > 0 
            ? mediaImages 
            : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]);

      return {
        id: p.id,
        slug: isBoulevard ? 'al-rehab-center' : (p.slug || p.id),
        name: isBoulevard ? 'AL REHAB CENTER' : p.name,
        developer: isBoulevard ? 'Tamleek Al Nahdi' : (p.developers?.name || notesJson.developer_name || 'Independent Luxury Developer'),
        developer_id: p.developer_id,
        city: isBoulevard ? 'Jeddah' : (p.city || 'Riyadh'),
        district: isBoulevard ? 'Al Rehab District' : (p.district || ''),
        address: isBoulevard ? 'Palestine Street / Prince Mutaib Axis, Al Rehab, Jeddah' : (p.address || ''),
        location: isBoulevard ? 'Al Rehab, Jeddah' : (p.district ? `${p.district}, ${p.city}` : p.city),
        category: isBoulevard ? 'Commercial & Luxury Residential Complex' : (p.property_type || 'Residential'),
        property_type: isBoulevard ? 'Commercial & Residential Center' : (p.property_type || 'Residential'),
        description: isBoulevard ? 'A premier commercial and residential landmark in Al Rehab, Jeddah by Tamleek Al Nahdi, featuring illuminated facade architecture, ground floor boutique retail, and luxury residential apartments.' : (p.description || p.short_description || 'A prime luxury property offering curated living in Saudi Arabia.'),
        short_description: isBoulevard ? 'Modern commercial & residential landmark in Jeddah by Tamleek Al Nahdi.' : (p.short_description || p.description?.substring(0, 150) || ''),
        bedrooms: p.bedrooms || '',
        bathrooms: p.bathrooms || '',
        size: p.size || '',
        starting_price: p.starting_price ? Number(p.starting_price) : undefined,
        currency: p.currency || 'SAR',
        payment_plan: p.payment_plan || '',
        handover_date: p.handover_date || '',
        furnished_status: p.furnished_status || 'Unfurnished',
        status: p.status || 'Available',
        featured: Boolean(p.featured),
        hero_image_url: isBoulevard ? "/al-rehab-center.webp" : (p.hero_image_url || allImages[0]),
        floor_plan_url: p.floor_plan_url || notesJson.floor_plan_url || '',
        video_url: notesJson.video_url || '',
        virtual_tour_url: notesJson.virtual_tour_url || '',
        brochure_url: notesJson.brochure_url || '',
        latitude: p.latitude,
        longitude: p.longitude,
        seo_title: isBoulevard ? 'AL REHAB CENTER Jeddah | REFERESTATES Private Discovery' : (p.seo_title || `${p.name} | REFERESTATES`),
        seo_description: isBoulevard ? 'Discover AL REHAB CENTER in Jeddah by Tamleek Al Nahdi. Exceptional commercial suites, retail boutiques, and luxury residences presented by REFERESTATES.' : (p.seo_description || p.short_description || p.description),
        notes: p.notes,
        images: allImages,
        highlights: normalizeHighlights([], notesJson),
        amenities: normalizeAmenities([], notesJson),
        nearby_places: normalizeNearby(notesJson, isBoulevard ? 'Jeddah' : p.city, isBoulevard ? 'Al Rehab District' : p.district),
        why_consider: normalizeWhyConsider(notesJson),
        unit_types: notesJson.unit_types
      };
    });
  } catch (err) {
    console.error("Error fetching projects from Supabase:", err);
    return fallbackProjects;
  }
}

export async function fetchProject(identifier: string): Promise<Project> {
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

    const isBoulevard = (data.name && /boulevard/i.test(data.name)) || (data.slug && /boulevard/i.test(data.slug));
    const notesJson = parseNotesJson(data.notes);
    const mediaImages = (data.property_media || [])
      .filter((m: any) => !m.media_type || m.media_type === 'image')
      .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((m: any) => m.url);

    const allImages = isBoulevard
      ? ["/al-rehab-center.webp", ...mediaImages]
      : (data.hero_image_url 
        ? [data.hero_image_url, ...mediaImages.filter((u: string) => u !== data.hero_image_url)]
        : mediaImages.length > 0 
          ? mediaImages 
          : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"]);

    return {
      id: data.id,
      slug: isBoulevard ? 'al-rehab-center' : (data.slug || data.id),
      name: isBoulevard ? 'AL REHAB CENTER' : data.name,
      developer: isBoulevard ? 'Tamleek Al Nahdi' : (data.developers?.name || notesJson.developer_name || 'Independent Luxury Developer'),
      developer_id: data.developer_id,
      city: isBoulevard ? 'Jeddah' : (data.city || 'Riyadh'),
      district: isBoulevard ? 'Al Rehab District' : (data.district || ''),
      address: isBoulevard ? 'Palestine Street / Prince Mutaib Axis, Al Rehab, Jeddah' : (data.address || ''),
      location: isBoulevard ? 'Al Rehab, Jeddah' : (data.district ? `${data.district}, ${data.city}` : (data.city || 'Saudi Arabia')),
      category: isBoulevard ? 'Commercial & Luxury Residential Complex' : (data.property_type || 'Residential'),
      property_type: isBoulevard ? 'Commercial & Residential Center' : (data.property_type || 'Residential'),
      description: isBoulevard ? 'A premier commercial and residential landmark in Al Rehab, Jeddah by Tamleek Al Nahdi, featuring illuminated facade architecture, ground floor boutique retail, and luxury residential apartments.' : (data.description || data.short_description || 'A prestigious residential development in Saudi Arabia.'),
      short_description: isBoulevard ? 'Modern commercial & residential landmark in Jeddah by Tamleek Al Nahdi.' : (data.short_description || data.description?.substring(0, 160) || ''),
      bedrooms: data.bedrooms || '',
      bathrooms: data.bathrooms || '',
      size: data.size || '',
      starting_price: data.starting_price ? Number(data.starting_price) : undefined,
      currency: data.currency || 'SAR',
      payment_plan: data.payment_plan || '',
      handover_date: data.handover_date || '',
      furnished_status: data.furnished_status || 'Unfurnished',
      status: data.status || 'Available',
      featured: Boolean(data.featured),
      hero_image_url: isBoulevard ? "/al-rehab-center.webp" : (data.hero_image_url || allImages[0]),
      floor_plan_url: data.floor_plan_url || notesJson.floor_plan_url || '',
      video_url: notesJson.video_url || '',
      virtual_tour_url: notesJson.virtual_tour_url || '',
      brochure_url: notesJson.brochure_url || '',
      latitude: data.latitude,
      longitude: data.longitude,
      seo_title: isBoulevard ? 'AL REHAB CENTER Jeddah | REFERESTATES Private Discovery' : (data.seo_title || `${data.name} | REFERESTATES Private Discovery`),
      seo_description: isBoulevard ? 'Discover AL REHAB CENTER in Jeddah by Tamleek Al Nahdi. Exceptional commercial suites, retail boutiques, and luxury residences presented by REFERESTATES.' : (data.seo_description || data.short_description || data.description),
      notes: data.notes,
      images: allImages,
      highlights: normalizeHighlights([], notesJson),
      amenities: normalizeAmenities([], notesJson),
      nearby_places: normalizeNearby(notesJson, isBoulevard ? 'Jeddah' : data.city, isBoulevard ? 'Al Rehab District' : data.district),
      why_consider: normalizeWhyConsider(notesJson),
      unit_types: notesJson.unit_types
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
  if (!isSupabaseConfigured) {
    console.log("Mock lead submission:", lead);
    return { success: true, lead: { id: "mock-" + Date.now(), ...lead } as Lead };
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name: lead.name,
        country: lead.country || 'Saudi Arabia',
        whatsapp: lead.whatsapp || lead.phone || '',
        phone: lead.phone || lead.whatsapp || '',
        email: lead.email || '',
        preferred_city: lead.city || lead.preferred_city || '',
        property_id: lead.property_id || null,
        property_name: lead.property_name || null,
        budget: lead.budget || '',
        bedrooms: lead.bedrooms || '',
        message: lead.message || lead.requirements || '',
        source: (lead.source as any) || 'Property Page'
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("submitLead error:", error);
    throw error;
  }
  
  return { success: true, lead: data as any };
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


