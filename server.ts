import express from "express";
import cors from "cors";
import path from "path";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

// In-memory data store for the prototype
const db = {
  projects: [
    {
      id: "1",
      name: "AL REHAB CENTER",
      developer: "Tamleek Al Nahdi",
      city: "Jeddah",
      location: "Al Rehab, Jeddah",
      category: "Premium Mixed-Use (Commercial & Residential)",
      description: "A prominent mixed-use development situated directly on Prince Mutaib bin Abdulaziz Road in Al Rehab District, Jeddah. Developed by Tamleek Al Nahdi, AL REHAB CENTER combines premier ground-floor commercial showrooms and retail boutiques with luxury residential suites, secure basement parking, and expansive private rooftop terraces.",
      highlights: [
        "SPORTS & WELLNESS DISTRICT: Situated just 250 meters from extensive public parks",
        "COMMUNITY PARK & GARDENS: Only 70 meters from Al-Suroor Garden & Mosque",
        "INTEGRATED SHOPPING CORRIDOR: Adjacent to commercial showrooms and retail malls",
        "SECURE BASEMENT PARKING: 98 secure and designated underground parking slots",
        "MAIN ROAD ACCESSIBILITY: Direct frontage on Prince Mutaib bin Abdulaziz Road",
        "EXCLUSIVE ROOFTOP TERRACES: Luxury penthouse units with front and rear terraces"
      ],
      amenities: ["Commercial Showrooms", "98 Underground Parking Slots", "Private Rooftop Terraces", "24/7 Monitored Security"],
      images: [
        "/al-rehab-center.webp",
        "/rehab-facade.jpg",
        "/rehab-living-room.jpg",
        "/rehab-bedroom.jpg",
        "/rehab-staircase.jpg"
      ],
      status: "Under Construction",
      featured: true,
    },
    {
      id: "2",
      slug: "park-residence-2",
      name: "PARK RESIDENCE 2",
      developer: "REAL Real Estate",
      city: "Jeddah",
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
      images: [
        "/image.png",
        "/park_facade.jpg",
        "/park_entrance.jpg",
        "/park_amenities.jpg",
        "/park_guarantees.jpg",
        "/park_view.jpg"
      ],
      highlights: [
        "CENTRAL PARK: Prime location with direct views of the central park, surrounded by lush greenery and walking paths.",
        "Smart Home System: Enhanced security and convenience through digital access controls.",
        "Surveillance System: 24/7 surveillance systems are active throughout the property.",
        "Gym: A fully equipped fitness center",
        "AC Community Hall: A climate-controlled communal space for resident gatherings and events",
        "Firefighting System: Integrated safety systems built to high-quality construction and professional standards"
      ],
      amenities: ["24/7 Surveillance System", "Smart Home System", "Fully Equipped Gym", "AC Community Hall", "Integrated Firefighting System"],
    },
    {
      id: "3",
      name: "The Line Estates",
      developer: "NEOM Company",
      city: "NEOM",
      location: "The Line",
      category: "Mixed Use",
      description: "A breathtaking, futuristic mixed-use development in NEOM.",
      highlights: ["Zero Carbon", "AI Integrated", "Nature Integrated"],
      amenities: ["Transit", "Parks", "Retail"],
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      status: "Sold Out",
      featured: true,
    },
    {
      id: "4",
      name: "Al-Fursan Residences",
      developer: "DAR Global",
      city: "Riyadh",
      location: "Riyadh, Saudi Arabia",
      category: "Apartment",
      description: "Al-Fursan Residences embodies the pinnacle of architectural minimalism in the heart of Riyadh.",
      highlights: [
        "Private Concierge Services",
        "Infinity Pool & Spa Facilities",
        "State-of-the-Art Fitness Center",
        "Smart Home Integration",
        "Secure Underground Parking",
        "Landscaped Private Gardens",
      ],
      amenities: ["Pool", "Gym", "Security"],
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      status: "Available",
      featured: true,
    }
  ],
  leads: [],
  developers: [
    { id: "1", name: "Tamleek Al Nahdi", logo: "" },
    { id: "2", name: "Dar Al Arkan", logo: "" },
    { id: "3", name: "NEOM Company", logo: "" },
    { id: "4", name: "DAR Global", logo: "" },
  ],
  locations: [
    { id: "1", name: "Riyadh", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
    { id: "2", name: "Jeddah", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
    { id: "3", name: "Makkah", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
    { id: "4", name: "Madinah", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  ]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- SEO & Crawlers ---
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: https://referestates.com/sitemap.xml\n");
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    const urls = [
      { loc: "https://referestates.com/", priority: "1.0", changefreq: "daily" },
      { loc: "https://referestates.com/projects", priority: "0.9", changefreq: "daily" },
      { loc: "https://referestates.com/projects/al-rehab-center", priority: "0.95", changefreq: "weekly" },
      { loc: "https://referestates.com/contact", priority: "0.7", changefreq: "monthly" }
    ];

    db.projects.forEach(p => {
      if (p.id !== "1") {
        urls.push({ loc: `https://referestates.com/projects/${p.id}`, priority: "0.8", changefreq: "weekly" });
      }
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
    res.send(xml);
  });

  // --- API Routes ---
  
  // Public Routes
  app.get("/api/projects", (req, res) => {
    // Only return published high-level info (we just return all for prototype)
    res.json(db.projects);
  });

  app.get("/api/projects/:id", (req, res) => {
    const project = db.projects.find(p => p.id === req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.get("/api/locations", (req, res) => {
    res.json(db.locations);
  });

  app.get("/api/developers", (req, res) => {
    res.json(db.developers);
  });

  app.post("/api/leads", async (req, res) => {
    const newLead = {
      id: Date.now().toString(),
      ...req.body,
      date: new Date().toISOString(),
      status: "New"
    };
    db.leads.push(newLead);

    // Insert into Supabase from the backend server securely using runtime environment variables
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabaseServer = createClient(supabaseUrl, supabaseAnonKey);
        
        const isUUID = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
        const safePropertyId = (req.body.property_id && isUUID(req.body.property_id)) ? req.body.property_id : null;

        const { error } = await supabaseServer
          .from('leads')
          .insert([
            {
              name: req.body.name || 'Anonymous',
              country: req.body.country || 'Saudi Arabia',
              whatsapp: req.body.whatsapp || req.body.phone || '',
              phone: req.body.phone || req.body.whatsapp || '',
              email: req.body.email || '',
              preferred_city: req.body.city || req.body.preferred_city || '',
              property_id: safePropertyId,
              property_name: req.body.property_name || null,
              budget: req.body.budget || '',
              bedrooms: req.body.bedrooms || '',
              message: req.body.message || req.body.requirements || '',
              source: req.body.source || 'Contact Form',
              status: 'New'
            }
          ]);

        if (error) {
          console.error("[Supabase Server Insert Error]:", error);
        } else {
          console.log("[Supabase Server Success] Successfully saved lead to Supabase.");
          
          // Trigger the Supabase Edge Function to deliver the email via Resend
          try {
            console.log("[Edge Function Trigger] Invoking send-lead-email Edge Function...");
            const { data: funcData, error: funcError } = await supabaseServer.functions.invoke('send-lead-email', {
              body: {
                name: req.body.name || 'Anonymous',
                email: req.body.email || '',
                phone: req.body.phone || req.body.whatsapp || '',
                whatsapp: req.body.whatsapp || req.body.phone || '',
                country: req.body.country || 'Saudi Arabia',
                preferred_city: req.body.city || req.body.preferred_city || '',
                property_name: req.body.property_name || 'General Inquiry',
                budget: req.body.budget || '',
                bedrooms: req.body.bedrooms || '',
                message: req.body.message || req.body.requirements || '',
                source: req.body.source || 'Contact Form',
                created_at: new Date().toISOString()
              }
            });

            if (funcError) {
              console.error("[Edge Function Error] Failed to invoke send-lead-email:", funcError);
            } else {
              console.log("[Edge Function Success] send-lead-email completed:", funcData);
            }
          } catch (funcCallErr) {
            console.error("[Edge Function Invoke Catch Error]:", funcCallErr);
          }
        }
      } catch (sbErr) {
        console.error("[Supabase Server Connection Error]:", sbErr);
      }
    } else {
      console.warn("[Supabase Server Warning] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing on the server. Cannot save lead to Supabase.");
    }

    res.json({ success: true, lead: newLead });
  });

  // Admin Routes (Simulated Auth)
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === "admin123") { // Prototype simple auth
      res.json({ token: "fake-jwt-token" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/admin/leads", (req, res) => {
    res.json(db.leads);
  });

  app.put("/api/admin/projects/:id/status", (req, res) => {
    const { status } = req.body;
    const projectIndex = db.projects.findIndex(p => p.id === req.params.id);
    if (projectIndex > -1) {
      db.projects[projectIndex].status = status;
      res.json(db.projects[projectIndex]);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
