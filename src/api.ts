import { Project, Developer, Location, Lead, ProjectHighlight, ProjectAmenity, NearbyPlace, WhyConsiderItem, UnitType } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import parkResidence2Hero from './assets/images/regenerated_image_1789115498656.png';

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
  hero_image_url: parkResidence2Hero,
  images: [
    parkResidence2Hero,
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

export const lamerEliteComplexProject: Project = {
  id: "3",
  slug: "lamer-elite-complex",
  name: "LAMER ELITE COMPLEX",
  developer: "LAMER REAL ESTATE",
  city: "Jeddah",
  district: "Al Hamra",
  address: "Al Hamra Street, Jeddah",
  location: "Al Hamra Street, Jeddah",
  category: "Residential, commercial",
  property_type: "Residential, commercial",
  description: "A distinguished residential destination in the heart of Al Hamra, LAMER ELITE COMPLEX combines refined luxury with exceptional everyday living.\n\nDeveloped by LAMER REAL ESTATE, this ready-to-move-in development is ideally located on Al Hamra Street, connecting King Abdulaziz Road and Medina Road. Designed for an elevated lifestyle, the complex features premium amenities including outdoor seating areas, barbecue spaces overlooking the Jeddah Fountain, a swimming pool, gym, lounge, cinema hall, and dedicated meeting facilities-creating a complete residential experience where comfort, leisure, and productivity come together.",
  short_description: "A distinguished ready-to-move residential and commercial destination on Al Hamra Street, Jeddah by LAMER REAL ESTATE.",
  bedrooms: "Residential & Commercial Units",
  bathrooms: "Luxury Fitted Bathrooms",
  size: "84 to 184 SQ FT",
  starting_price: 660000,
  currency: "SAR",
  handover_date: "Ready to Move",
  furnished_status: "Ready to Move - Luxury Specification",
  status: "Ready to Move",
  featured: true,
  hero_image_url: "/lamer-elite-complex.jpg",
  images: [
    "/lamer-elite-complex.jpg",
    "/lamer-pool.jpg",
    "/lamer-intercom.jpg",
    "/lamer-amenities.jpg",
    "/lamer-booking-app.jpg",
    "/lamer-smart-access.jpg",
    "/lamer-cinema.jpg",
    "/lamer-lounge.jpg"
  ],
  highlights: [
    {
      title: "Outdoor Lounge & BBQ Areas",
      description: "Beautiful outdoor seating and barbecue spaces overlooking the iconic Jeddah Fountain.",
      icon: "Coffee"
    },
    {
      title: "Swimming Pool",
      description: "A dedicated swimming pool offering residents a serene space to relax and unwind.",
      icon: "Waves"
    },
    {
      title: "Fully Equipped Gym",
      description: "A modern fitness center designed to support an active and healthy lifestyle.",
      icon: "Dumbbell"
    },
    {
      title: "Exclusive Cinema Hall",
      description: "A private cinema hall providing an elevated entertainment experience for residents.",
      icon: "Tv"
    },
    {
      title: "Owners' Meeting Room",
      description: "A dedicated meeting space allowing residents to conveniently manage work and private meetings.",
      icon: "Briefcase"
    },
    {
      title: "24/7 Security & Smart Access",
      description: "Round-the-clock security guarding and modern smart access systems throughout.",
      icon: "ShieldCheck"
    }
  ],
  amenities: [
    {
      title: "24/7 Security",
      description: "Round-the-clock security services help provide a safe and secure residential environment.",
      icon: "ShieldCheck"
    },
    {
      title: "Smart Access System",
      description: "Modern smart entry solutions offer enhanced convenience and controlled access throughout the complex.",
      icon: "Sparkles"
    },
    {
      title: "Gym",
      description: "A fully equipped fitness center designed to support an active and healthy lifestyle.",
      icon: "Dumbbell"
    },
    {
      title: "Swimming Pool",
      description: "A dedicated swimming pool offering residents a space to relax and unwind.",
      icon: "Waves"
    },
    {
      title: "Outdoor Lounge & BBQ Areas",
      description: "Beautiful outdoor seating and barbecue spaces create the perfect setting for relaxation and social gatherings.",
      icon: "Coffee"
    },
    {
      title: "Cinema Hall",
      description: "An exclusive cinema space providing an elevated entertainment experience for residents.",
      icon: "Tv"
    },
    {
      title: "Meeting Room",
      description: "A dedicated meeting space allowing residents to conveniently manage work and private meetings.",
      icon: "Briefcase"
    },
    {
      title: "Community & Event Hall",
      description: "A welcoming space designed for resident gatherings, celebrations, and special occasions.",
      icon: "Building"
    }
  ],
  nearby_places: [
    {
      name: "Al Hamra Corniche",
      category: "Scenic Waterfront",
      distance: "1.9 km",
      time: "3 mins",
      description: "Located approximately 1.9 km away, offering easy access to Jeddah’s scenic waterfront."
    },
    {
      name: "King Abdulaziz Road",
      category: "Major City Arterial",
      distance: "Direct Connection",
      time: "1 min",
      description: "Conveniently connected to one of Jeddah’s major roads."
    },
    {
      name: "Madinah Road",
      category: "Primary Transit Route",
      distance: "Direct Connection",
      time: "3 mins",
      description: "Excellent connectivity to one of the city’s primary transportation routes."
    },
    {
      name: "Government & Business Districts",
      category: "Civic & Financial",
      distance: "Central Core",
      time: "5 mins",
      description: "Close to major government entities, ministries, and important city destinations."
    },
    {
      name: "Jeddah Fountain",
      category: "Iconic Waterfront Landmark",
      distance: "Waterfront Proximity",
      time: "4 mins",
      description: "Enjoy proximity to one of Jeddah’s most iconic waterfront landmarks."
    },
    {
      name: "Modern Tourist Attractions",
      category: "Emerging Tourism",
      distance: "Surrounding Area",
      time: "5 mins",
      description: "Surrounded by several prominent landmarks and emerging tourism developments in Jeddah."
    }
  ],
  why_consider: [
    {
      title: "Prime Al Hamra Street Location",
      description: "Directly on Al Hamra Street, linking King Abdulaziz Road (Al-Andalus) and Madinah Road, with proximity to Al Hamra Corniche, government entities, and modern tourist projects."
    },
    {
      title: "Ready to Move - Immediate Occupancy",
      description: "A fully completed, ready-to-move residential and commercial complex with no construction waiting period."
    },
    {
      title: "Resort-Grade Amenities & Facilities",
      description: "Facilities including outdoor seating, barbecue areas overlooking the Jeddah Fountain, gym, swimming pool, lounge, cinema hall, and a meeting room for owners."
    },
    {
      title: "Developed by LAMER REAL ESTATE",
      description: "Superior craftsmanship, modern smart infrastructure, and refined architecture in Jeddah's prestigious Al Hamra district."
    }
  ],
  unit_types: [
    {
      type: "Residential Luxury Suite",
      beds: "Residential",
      bathrooms: "Luxury Fitted",
      size: "84 to 184 SQ FT",
      price: "Starting from SAR 660,000",
      availability: "Ready to Move"
    },
    {
      type: "Commercial Boutique Unit",
      beds: "Commercial",
      bathrooms: "Fitted",
      size: "84 to 184 SQ FT",
      price: "Starting from SAR 660,000",
      availability: "Ready to Move"
    }
  ],
  seo_title: "LAMER ELITE COMPLEX Jeddah | LAMER REAL ESTATE | REFERESTATES",
  seo_description: "Discover LAMER ELITE COMPLEX on Al Hamra Street, Jeddah by LAMER REAL ESTATE. Ready to Move, starting from SAR 660k, 84 to 184 SQ FT. Residential and commercial units."
};

export const asail5960Project: Project = {
  id: "asail-59-60",
  slug: "asail-59-60",
  name: "ASAIL 59 & 60",
  developer: "Eqnaa Real Estate",
  city: "Jeddah",
  district: "Darb Al Haramain",
  address: "Darb Al Haramain, Jeddah",
  location: "Darb Al Haramain, Jeddah",
  category: "Apartment & Penthouse",
  property_type: "Apartment & Penthouse",
  description: "We are pleased to introduce ASAIL 59 & 60 residential project in Jeddah. Designed with diverse layouts, it offers an unparalleled experience in residential luxury, spanning over 2,000 square meters. A state-of-the-art fitness club, A dedicated children's play area, A hotel-style lobby, Recreational spaces, Advanced surveillance systems, and many more amenities, in addition to its prime location, the project allows you to reach major landmarks within minutes.",
  short_description: "Luxury apartment & penthouse development in Darb Al Haramain, Jeddah by Eqnaa Real Estate.",
  bedrooms: "2, 3, 4, 5 Beds",
  bathrooms: "2 - 5 Baths",
  size: "90 m² - 200 m²",
  starting_price: 315000,
  currency: "SAR",
  handover_date: "2027",
  furnished_status: "Premium High Specification",
  status: "Under Construction",
  featured: true,
  hero_image_url: "/asail-exterior.jpg",
  images: [
    "/asail-exterior.jpg",
    "/asail-lobby.jpg",
    "/asail-staircase.jpg",
    "/asail-living-room.jpg",
    "/asail-bedroom.jpg",
    "/asail-bathroom.jpg",
    "/asail-kitchen.jpg"
  ],
  highlights: [
    { title: "Structural construction: 25 years", description: "Backed by a comprehensive 25-year structural warranty for ultimate peace of mind.", icon: "Shield" },
    { title: "Partitions / walls: 25 years", description: "Long-term durability guaranteed with a 25-year warranty on partitions and walls.", icon: "Shield" },
    { title: "Homeowners’ Association: Warranty/coverage as specified", description: "Dedicated HOA support and professional facility management coverage.", icon: "FileText" },
    { title: "Plumbing & electrical systems: 3 years", description: "Reliable 3-year warranty covering all internal plumbing and electrical installations.", icon: "Zap" },
    { title: "Quality you can trust, backed by long-term warranties: 1 year", description: "Comprehensive 1-year general maintenance and finish warranty.", icon: "Award" },
    { title: "Spacious entrances and corridors", description: "Elegantly designed wide hallways and grand building access areas.", icon: "DoorOpen" },
    { title: "Smart entry system", description: "Advanced keyless and secure intercom access controls for residents.", icon: "KeyRound" },
    { title: "24/7 CCTV security", description: "Round-the-clock professional monitoring across all building perimeters.", icon: "ShieldCheck" },
    { title: "One year free homeowners’ association fees", description: "Complimentary HOA management fees for the first year of residency.", icon: "Gift" },
    { title: "Luxury design and finishes", description: "Exquisite contemporary interiors with high-spec architectural detailing.", icon: "Sparkles" },
    { title: "Private parking spaces", description: "Dedicated and secure vehicle parking bays for residents and guests.", icon: "Car" },
    { title: "High ceilings", description: "Generous vertical clearance enhancing spaciousness and natural light.", icon: "Maximize2" },
    { title: "Central gas system", description: "Safe and convenient metered central gas distribution throughout.", icon: "Flame" },
    { title: "Independent water tanks", description: "Dedicated individual water storage tanks ensuring reliable supply.", icon: "Droplets" },
    { title: "State-of-the-art fitness club", description: "Fully equipped modern gym facilities supporting an active lifestyle.", icon: "Dumbbell" },
    { title: "Dedicated children’s play area", description: "Safe, engaging recreational space designed specially for children.", icon: "Smile" },
    { title: "Hotel-style lobby", description: "Grand, welcoming reception lounge reflecting absolute luxury.", icon: "Building" },
    { title: "Recreational spaces", description: "Expansive green and communal zones spanning over 2,000 square meters.", icon: "Trees" }
  ],
  amenities: [
    { title: "Structural construction: 25 years", description: "Comprehensive 25-year structural warranty.", icon: "Shield" },
    { title: "Partitions / walls: 25 years", description: "25-year warranty on partitions and walls.", icon: "Shield" },
    { title: "Homeowners’ Association: Warranty/coverage as specified", description: "HOA coverage and professional management.", icon: "FileText" },
    { title: "Plumbing & electrical systems: 3 years", description: "3-year warranty on plumbing and electrical installations.", icon: "Zap" },
    { title: "Quality you can trust, backed by long-term warranties: 1 year", description: "1-year general warranty on finishes.", icon: "Award" },
    { title: "Spacious entrances and corridors", description: "Wide hallways and grand access areas.", icon: "DoorOpen" },
    { title: "Smart entry system", description: "Keyless entry and secure intercom controls.", icon: "KeyRound" },
    { title: "24/7 CCTV security", description: "Continuous around-the-clock monitoring.", icon: "ShieldCheck" },
    { title: "One year free homeowners’ association fees", description: "Complimentary first-year HOA fees.", icon: "Gift" },
    { title: "Luxury design and finishes", description: "High-spec contemporary interior finishes.", icon: "Sparkles" },
    { title: "Private parking spaces", description: "Secure resident parking bays.", icon: "Car" },
    { title: "High ceilings", description: "Elevated ceiling heights for enhanced spatial volume.", icon: "Maximize2" },
    { title: "Central gas system", description: "Safe central gas distribution.", icon: "Flame" },
    { title: "Independent water tanks", description: "Dedicated individual water storage.", icon: "Droplets" },
    { title: "State-of-the-art fitness club", description: "Fully equipped modern gym facilities.", icon: "Dumbbell" },
    { title: "Dedicated children’s play area", description: "Safe play area for children.", icon: "Smile" },
    { title: "Hotel-style lobby", description: "Grand reception and waiting lounge.", icon: "Building" },
    { title: "Recreational spaces", description: "Spanning over 2,000 square meters.", icon: "Trees" }
  ],
  nearby_places: [
    { name: "King Abdulaziz International Airport", category: "Airport Hub", distance: "Convenient Transit", time: "15 mins" },
    { name: "King Abdulaziz Hospital", category: "Healthcare", distance: "Medical Care", time: "4 mins" },
    { name: "Al Salam Mall", category: "Retail & Shopping", distance: "Shopping & Dining", time: "5 mins" },
    { name: "Mosque & Gardens", category: "Community", distance: "Spiritual & Greenery", time: "2 mins" },
    { name: "Haramain Railway Station", category: "Transit Hub", distance: "High-Speed Rail", time: "15 mins" },
    { name: "Restaurants & Cafés", category: "Dining", distance: "Culinary Hotspots", time: "2 mins" }
  ],
  why_consider: [
    { title: "Developed by Eqnaa Real Estate", description: "Superior craftsmanship, premium architecture, and exceptional delivery standards in Jeddah." },
    { title: "Prime Darb Al Haramain Location", description: "Effortless connectivity to key arterial roads and major city landmarks within minutes." },
    { title: "Attractive Starting Price from SAR 315K", description: "Exceptional luxury apartments and penthouses spanning 90 m² - 200 m² with flexible layouts." }
  ],
  unit_types: [
    { type: "Luxury Apartment & Penthouse Suite", beds: "2, 3, 4, 5 Beds", bathrooms: "2 - 5 Baths", size: "90 m² - 200 m²", price: "Starting from SAR 315,000", availability: "Under Construction" }
  ]
};

export const padelLivingResidencesProject: Project = {
  id: "padel-living-residences",
  slug: "padel-living-residences",
  name: "PADEL LIVING RESIDENCES",
  developer: "DAR Global",
  city: "Jeddah",
  district: "King AbdulAziz Road",
  address: "King AbdulAziz Road, Jeddah",
  location: "King AbdulAziz Road, Jeddah",
  category: "Apartments",
  property_type: "Apartments",
  description: "LIFE IS HAPPENING HERE Padel Living Residences are located at one of last major developments in central Jeddah, spanning over 1,000,000 sqm in a highly connected urban location. Designed as an all-in-one community, it brings living, working, and recreation together with direct access to key city destinations. Parks, shaded paths, and essential amenities make it Jeddah's greenest and most integrated new district.",
  short_description: "Luxury apartments development on King AbdulAziz Road, Jeddah by DAR Global featuring green community and rooftop padel courts.",
  bedrooms: "1, 2, 3, 4 Beds",
  bathrooms: "1 - 5 Baths",
  size: "55 m² - 197 m²",
  starting_price: 689000,
  currency: "SAR",
  handover_date: "December 2030",
  furnished_status: "Premium High Specification",
  status: "Under Construction",
  featured: true,
  hero_image_url: "/padel-living-1.jpg",
  images: [
    "/padel-living-1.jpg",
    "/padel-living-2.jpg",
    "/padel-living-3.jpg",
    "/padel-living-4.jpg"
  ],
  highlights: [
    { title: "Air Condition", description: "Concealed AC units installed throughout.", icon: "Wind" },
    { title: "Balcony / Terrace", description: "Porcelain Tiles flooring on all balconies and terraces.", icon: "Maximize" },
    { title: "External Glazing", description: "All windows feature double glazing with thermal insulation.", icon: "Sun" },
    { title: "CCTV and Connectivity", description: "Telephone and data provided with fiber optic cables, CCTV cameras outside and in building corridors, access control, and internal intercom.", icon: "ShieldCheck" },
    { title: "Private Parking", description: "Secure dedicated resident parking facilities.", icon: "Car" }
  ],
  amenities: [
    { title: "Foyer / Living / Dining / Majlis / Powder Room", description: "Porcelain tiles 60x60 GCC Origin, porcelain skirting, wooden doors on stainless steel hinges, powder room with porcelain tiles, engineered stone countertop, and MDF laminate vanity.", icon: "Layout" },
    { title: "Kitchen and Storage", description: "Porcelain tiles 60x60 GCC Origin, plastered walls with local emulsion paint, engineered stone/quartz countertops, marble backsplash, MDF laminate cabinets, and premium appliances (Hob/Oven, Fridge/Freezer, Hood, Washer/Dryer).", icon: "Utensils" },
    { title: "Bathroom", description: "Porcelain tiles 60x60 GCC Origin, engineered stone countertop, MDF laminate vanity, electric water heater (local brand), and domestic water tanks in basement.", icon: "Droplets" },
    { title: "Master Bedroom", description: "Porcelain tiles 60x60 GCC Origin, plastered walls with local emulsion paint, accent wallpaper wall, gypsum ceiling, and walk-in closet as per design.", icon: "Bed" },
    { title: "Secondary Bedrooms", description: "Porcelain tiles 60x60 GCC Origin, plastered walls with local emulsion paint, gypsum ceiling, and custom closet as per design.", icon: "Home" }
  ],
  nearby_places: [
    { name: "Red Sea Mall", category: "Retail & Shopping", distance: "Shopping Mall", time: "02 min" },
    { name: "British International School of Jeddah", category: "Education", distance: "International School", time: "02 min" },
    { name: "Jeddah Corniche & Formula 1 Circuit", category: "Leisure & Sport", distance: "Corniche & Circuit", time: "08 min" },
    { name: "American International School of Jeddah", category: "Education", distance: "International School", time: "08 min" },
    { name: "Four Seasons Hotel (under development)", category: "Hospitality", distance: "Luxury Hotel", time: "10 min" },
    { name: "Jeddah Knowledge International School", category: "Education", distance: "School", time: "10 min" },
    { name: "Raffles Hotel Jeddah", category: "Hospitality", distance: "Luxury Hotel", time: "12 min" },
    { name: "King Abdulaziz International Airport", category: "Airport", distance: "Airport Hub", time: "12 min" },
    { name: "Trump Tower Jeddah", category: "Landmark", distance: "Commercial Tower", time: "15 min" },
    { name: "Medcare Hospital", category: "Healthcare", distance: "Medical Center", time: "20 min" },
    { name: "International Medical Center (IMC)", category: "Healthcare", distance: "Hospital", time: "22 min" },
    { name: "Al Balad, Jeddah", category: "Heritage", distance: "Historic District", time: "22 min" },
    { name: "Saudi German Hospital", category: "Healthcare", distance: "Hospital", time: "25 min" },
    { name: "Dr. Soliman Fakeeh Hospital", category: "Healthcare", distance: "Hospital", time: "28 min" }
  ],
  why_consider: [
    { title: "Developed by DAR Global", description: "World-class master planning and prestigious residential delivery across international standards." },
    { title: "King AbdulAziz Road Location", description: "Central Jeddah location spanning over 1,000,000 sqm green integrated community." },
    { title: "Completion December 2030", description: "State-of-the-art greenest and most integrated new district featuring rooftop padel courts and luxury finishes." }
  ],
  unit_types: [
    { type: "Padel Living Luxury Apartment", beds: "1, 2, 3, 4 Beds", bathrooms: "1 - 5 Baths", size: "55 m² - 197 m²", price: "Starting from SAR 689,000", availability: "Under Construction" }
  ]
};

export const whiteTowerProject: Project = {
  id: "white-tower",
  slug: "white-tower",
  name: "WHITE TOWER",
  developer: "Sadana Real Estate",
  city: "Jeddah",
  district: "Darb Al Haramain",
  address: "Darb Al Haramain District, Jeddah",
  location: "Darb Al Haramain, Jeddah",
  category: "Apartments",
  property_type: "Apartments",
  description: "White Tower is a 12-story building located in the Darb Al-Haramain model district in central Jeddah. Each floor contains six residential units of various sizes. The project is situated near major educational institutions like King Abdulaziz University and Dar Al-Hekma University, health facilities such as East Jeddah Hospital, and major shopping centers like Al Salam Mall and Al Andalus Mall. The project offers a unique investment opportunity with a 10-year operating contract and expected annual returns of up to 18%.",
  short_description: "12-story luxury apartment development in Darb Al Haramain, Jeddah by Sadana Real Estate with 10-year operating contract.",
  bedrooms: "2, 3, 4, 5 Beds",
  bathrooms: "2 - 5 Baths",
  size: "94 m² - 137 m²",
  starting_price: 545000,
  currency: "SAR",
  handover_date: "2028",
  furnished_status: "Fully Furnished with 10-Year Operating Contract",
  status: "READY TO MOVE",
  featured: true,
  hero_image_url: "/white-tower-exterior.jpg",
  images: [
    "/white-tower-exterior.jpg",
    "/white-tower-gym.jpg",
    "/white-tower-apartment.jpg"
  ],
  highlights: [
    { title: "All Unit Prices include furniture and a 10-year operating contract", description: "Turnkey furnished suites complete with a lucrative 10-year professional operating contract yielding up to 18% annual returns.", icon: "Award" },
    { title: "Smart Home System", description: "Advanced home automation for lighting, climate control, and security.", icon: "Sparkles" },
    { title: "Hotel Style Entrances", description: "Grand, welcoming double-height reception lobby reflecting elite hospitality standards.", icon: "Building" },
    { title: "Surveillance System", description: "24/7 advanced security monitoring across all building perimeters.", icon: "ShieldCheck" },
    { title: "Building Area 500 m²", description: "Prime architectural footprint in central Jeddah.", icon: "Maximize2" },
    { title: "Private Parking", description: "Secure dedicated resident parking facilities.", icon: "Car" }
  ],
  amenities: [
    { title: "Modern Architecture & High Ceilings", description: "The building features a modern design with high ceilings, large balconies, and hotel-style entrances.", icon: "Maximize" },
    { title: "Comprehensive Luxury Amenities", description: "Includes a gym, lounge, cinema, children's area, swimming pool, rooftop landscape, and smart home systems.", icon: "Smile" },
    { title: "Free Homeowners Association Management", description: "Sadana Real Estate provides 10 years of free property management, covering maintenance and cleaning for all facilities and common areas at no extra cost to owners.", icon: "Gift" },
    { title: "Extended Developer Guarantees", description: "25 years for the structural frame (excluding natural disasters) and electrical switches, 20 years for electrical wiring, 5 years for sanitary tools, and 2 years for internal plumbing and elevators.", icon: "Shield" },
    { title: "Gym & Fitness Club", description: "Fully equipped modern gym facilities.", icon: "Dumbbell" },
    { title: "Executive Lounge & Cinema", description: "Private resident lounge and cinema hall for entertainment.", icon: "Film" },
    { title: "Swimming Pool & Rooftop Landscape", description: "Relaxing pool deck and landscaped rooftop relaxation zones.", icon: "Waves" }
  ],
  nearby_places: [
    { name: "King Abdulaziz University", category: "Educational Institution", distance: "Major University", time: "5 mins" },
    { name: "Dar Al-Hekma University", category: "Educational Institution", distance: "Academic Campus", time: "6 mins" },
    { name: "East Jeddah Hospital", category: "Healthcare", distance: "Medical Care", time: "4 mins" },
    { name: "Al Salam Mall", category: "Retail & Shopping", distance: "Shopping Center", time: "5 mins" },
    { name: "Al Andalus Mall", category: "Retail & Shopping", distance: "Retail Hub", time: "6 mins" },
    { name: "Darb Al Haramain Model District", category: "Strategic Location", distance: "Central District", time: "1 min" }
  ],
  why_consider: [
    { title: "Developed by Sadana Real Estate", description: "Uncompromising quality, meticulous architectural design, and elite delivery standards in Jeddah." },
    { title: "10-Year Operating Contract", description: "Unique investment opportunity offering expected annual returns of up to 18% with furniture included." },
    { title: "Extensive Warranties & Free HOA", description: "Backed by up to 25 years structural and electrical warranty plus 10 years free property management." }
  ],
  unit_types: [
    { type: "White Tower Luxury Apartment", beds: "2, 3, 4, 5 Beds", bathrooms: "2 - 5 Baths", size: "94 m² - 137 m²", price: "Starting from SAR 545,000", availability: "READY TO MOVE" }
  ]
};

export const sadanaLuxuryProject: Project = {
  id: "sadana-luxury",
  slug: "sadana-luxury",
  name: "SADANA LUXURY",
  developer: "Sodasyat Real Estate",
  city: "Jeddah",
  district: "Red Sea Road",
  address: "Red Sea Road, Jeddah",
  location: "Red Sea Road, Jeddah",
  category: "Villa",
  property_type: "Villa",
  description: "Invest in the site that shortens your distances! Our project is located at the fulcrum among the most important landmarks of the Red Sea bride. Its unique location on King Road makes you in the heart of the commercial movement, next to the finest entertainment facilities such as Redsea Mall and the waterfront. A location that guarantees you sustainable value and proximity to vital services such as Al Salam Hospital and speed of mobility thanks to proximity to the airport.",
  short_description: "Luxury villa development on Red Sea Road, Jeddah by Sodasyat Real Estate.",
  bedrooms: "3, 4, 5, 6, 7 Beds",
  bathrooms: "4 - 7 Baths",
  size: "241 m² - 530 m²",
  starting_price: 3900000,
  currency: "SAR",
  handover_date: "2028",
  furnished_status: "Premium High Specification",
  status: "Under Construction",
  featured: true,
  hero_image_url: "/sadana-exterior.jpg",
  images: [
    "/sadana-exterior.jpg",
    "/sadana-rooftop.jpg",
    "/sadana-street.jpg",
    "/sadana-dining.jpg",
    "/sadana-living.jpg",
    "/sadana-bedroom.jpg",
    "/sadana-lounge.jpg",
    "/sadana-mezzanine.jpg"
  ],
  highlights: [
    { title: "10 Villa's", description: "Exclusive gated collection of 10 ultra-luxury architectural villas.", icon: "Home" },
    { title: "Building Area 530 m²", description: "Expansive built-up area offering maximum comfort and architectural grandeur.", icon: "Maximize2" },
    { title: "2 Separate Villa's", description: "Independent standalone villa options for ultimate privacy.", icon: "Building" },
    { title: "8 Connected Villa's", description: "Sophisticated semi-detached villa units featuring contemporary elegance.", icon: "Home" },
    { title: "Private Parking", description: "Dedicated private parking facilities on plot.", icon: "Car" }
  ],
  amenities: [
    { title: "Spacious Halls", description: "Generously proportioned living and reception halls designed for grand entertaining.", icon: "Layout" },
    { title: "Water Surface", description: "Exquisite water feature integration enhancing the tranquil ambiance.", icon: "Droplets" },
    { title: "Smart Home", description: "Advanced automation system for lighting, security, and climate control.", icon: "Sparkles" },
    { title: "Fresh Sun Light", description: "Architecturally optimized orientation maximizing natural daylight.", icon: "Sun" },
    { title: "Large Windows", description: "Floor-to-ceiling glass windows offering expansive views and bright interiors.", icon: "Maximize" },
    { title: "Working Room", description: "Dedicated home office or study space for remote productivity.", icon: "Briefcase" },
    { title: "Distinctive Location", description: "Prime position on Red Sea Road near vital landmarks and upscale shopping.", icon: "MapPin" },
    { title: "Driver's Room", description: "Dedicated private accommodation for household drivers.", icon: "UserCheck" },
    { title: "Laundry Room", description: "Conveniently dedicated laundry and utility space.", icon: "Shirt" },
    { title: "Spacious Entrances and Corridors", description: "Grand architectural arrival experience and wide hallways.", icon: "DoorOpen" },
    { title: "Smart Entry System", description: "Keyless secure access control for enhanced security.", icon: "KeyRound" },
    { title: "Luxury Design and Finishes", description: "Exquisite contemporary material palettes and premium craftsmanship.", icon: "Award" },
    { title: "Private Parking Spaces", description: "Secure on-plot vehicle parking bays.", icon: "Car" },
    { title: "High Ceilings", description: "Elevated vertical clearance amplifying spatial elegance.", icon: "Maximize2" },
    { title: "Independent Water Tank", description: "Dedicated private water storage ensuring uninterrupted supply.", icon: "Droplets" },
    { title: "Interior Furnishing Package (Additional Amount)", description: "Optional bespoke interior styling and turnkey furniture packages.", icon: "Package" },
    { title: "After-Sales Services", description: "Dedicated ongoing homeowner support and maintenance management.", icon: "Headphones" },
    { title: "Home Cleaning (Upon Request)", description: "Professional housekeeping services available on demand.", icon: "Sparkles" },
    { title: "Plumbing 24 Months Warranty", description: "Comprehensive 24-month warranty covering all plumbing installations.", icon: "Zap" },
    { title: "Sanitary 5 Years Warranty", description: "Extended 5-year warranty on all sanitary ware and fixtures.", icon: "Shield" },
    { title: "15 Years Warranty For the Structure", description: "Robust 15-year structural construction warranty.", icon: "ShieldCheck" }
  ],
  nearby_places: [
    { name: "King Abdul Aziz Road", category: "Major Artery", distance: "Immediate Access", time: "1 minute" },
    { name: "Hira Street", category: "Commercial Artery", distance: "Direct Connection", time: "1 minute" },
    { name: "Jeddah Waterfront", category: "Leisure & Coastline", distance: "Coastal Promenade", time: "5 minutes" },
    { name: "King Abdul Aziz International Airport", category: "Airport Hub", distance: "Transit Hub", time: "10 minutes" },
    { name: "Red Sea Mall", category: "Retail & Shopping", distance: "Shopping Destination", time: "3 minutes" },
    { name: "Al Salam Hospital", category: "Healthcare", distance: "Medical Care", time: "2 minutes" }
  ],
  why_consider: [
    { title: "Developed by Sodasyat Real Estate", description: "Exceptional luxury villa construction standards and premium architectural delivery in Jeddah." },
    { title: "Red Sea Road Location", description: "Prime prestige location on King Road in the heart of Jeddah's commercial and coastal activity." },
    { title: "Comprehensive Guarantees", description: "Backed by up to 15 years structural warranty and long-term plumbing and sanitary coverages." }
  ],
  unit_types: [
    { type: "Luxury Villa Suite", beds: "3, 4, 5, 6, 7 Beds", bathrooms: "4 - 7 Baths", size: "241 m² - 530 m²", price: "Starting from SAR 3,900,000", availability: "Under Construction" }
  ]
};

// High-end fallback demo projects for when Supabase is initially empty or offline
export const fallbackProjects: Project[] = [
  padelLivingResidencesProject,
  whiteTowerProject,
  sadanaLuxuryProject,
  parkResidence2Project,
  lamerEliteComplexProject,
  asail5960Project,
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
    const projects = data.map((p: any) => {
      if (
        p.slug === 'padel-living-residences' ||
        (p.name && /padel/i.test(p.name))
      ) {
        return padelLivingResidencesProject;
      }
      if (
        p.slug === 'white-tower' ||
        (p.name && /white tower/i.test(p.name))
      ) {
        return whiteTowerProject;
      }
      if (
        p.slug === 'sadana-luxury' ||
        (p.name && /sadana/i.test(p.name))
      ) {
        return sadanaLuxuryProject;
      }
      if (
        p.id === '2' ||
        p.slug === 'marina-residences' ||
        p.slug === 'park-residence-2' ||
        p.id === 'bbbbbbbb-2222-2222-2222-222222222222' ||
        (p.name && /park/i.test(p.name))
      ) {
        return parkResidence2Project;
      }
      if (
        p.id === 'dddddddd-4444-4444-4444-444444444444' ||
        p.slug === 'al-fursan' ||
        p.slug === 'asail-60-59' ||
        p.slug === 'asail-59-60' ||
        (p.name && /asail/i.test(p.name)) ||
        (p.name && /fursan/i.test(p.name))
      ) {
        return asail5960Project;
      }
      if (
        p.id === '3' ||
        p.slug === 'lamer-elite-complex' ||
        p.slug === 'the-line-estates' ||
        p.id === 'cccccccc-3333-3333-3333-333333333333' ||
        (p.name && /lamer/i.test(p.name)) ||
        (p.name && /line/i.test(p.name))
      ) {
        return lamerEliteComplexProject;
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
        highlights: isRehab ? fallbackProjects[2].highlights : normalizeHighlights([], notesJson),
        amenities: isRehab ? fallbackProjects[2].amenities : normalizeAmenities([], notesJson),
        nearby_places: isRehab ? fallbackProjects[2].nearby_places : normalizeNearby(notesJson, isRehab ? 'Jeddah' : p.city, isRehab ? 'Al Rehab District' : p.district),
        why_consider: isRehab ? fallbackProjects[2].why_consider : normalizeWhyConsider(notesJson),
        unit_types: isRehab ? fallbackProjects[2].unit_types : notesJson.unit_types
      };
    });

    const hasPadel = projects.some(p => p.slug === 'padel-living-residences' || /padel/i.test(p.name));
    if (!hasPadel) {
      projects.unshift(padelLivingResidencesProject);
    }
    const hasWhiteTower = projects.some(p => p.slug === 'white-tower' || /white tower/i.test(p.name));
    if (!hasWhiteTower) {
      projects.splice(1, 0, whiteTowerProject);
    }
    const hasSadana = projects.some(p => p.slug === 'sadana-luxury' || (/sadana/i.test(p.name) && !/white tower/i.test(p.name) && !/padel/i.test(p.name)));
    if (!hasSadana) {
      projects.splice(2, 0, sadanaLuxuryProject);
    }
    return projects;
  } catch (err) {
    console.error("Error fetching projects from Supabase:", err);
    return fallbackProjects;
  }
}

export async function fetchProject(identifier: string): Promise<Project> {
  const cleanId = (identifier || '').toLowerCase();
  if (
    cleanId === 'padel-living-residences' ||
    cleanId.includes('padel') ||
    cleanId.includes('living')
  ) {
    return padelLivingResidencesProject;
  }
  if (
    cleanId === 'white-tower' ||
    cleanId.includes('white') ||
    cleanId.includes('tower')
  ) {
    return whiteTowerProject;
  }
  if (
    cleanId === 'sadana-luxury' ||
    cleanId.includes('sadana')
  ) {
    return sadanaLuxuryProject;
  }
  if (
    cleanId === '2' ||
    cleanId === 'marina-residences' ||
    cleanId === 'park-residence-2' ||
    cleanId === 'bbbbbbbb-2222-2222-2222-222222222222' ||
    cleanId.includes('park')
  ) {
    return parkResidence2Project;
  }

  if (
    cleanId === '3' ||
    cleanId === 'lamer-elite-complex' ||
    cleanId === 'the-line-estates' ||
    cleanId === 'cccccccc-3333-3333-3333-333333333333' ||
    cleanId.includes('lamer') ||
    cleanId.includes('line')
  ) {
    return lamerEliteComplexProject;
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
      highlights: isRehab ? fallbackProjects[2].highlights : normalizeHighlights([], notesJson),
      amenities: isRehab ? fallbackProjects[2].amenities : normalizeAmenities([], notesJson),
      nearby_places: isRehab ? fallbackProjects[2].nearby_places : normalizeNearby(notesJson, isRehab ? 'Jeddah' : data.city, isRehab ? 'Al Rehab District' : data.district),
      why_consider: isRehab ? fallbackProjects[2].why_consider : normalizeWhyConsider(notesJson),
      unit_types: isRehab ? fallbackProjects[2].unit_types : notesJson.unit_types
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


