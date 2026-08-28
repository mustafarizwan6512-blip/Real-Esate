import express from "express";
import cors from "cors";
import path from "path";
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
      name: "Marina Residences",
      developer: "Dar Al Arkan",
      city: "Jeddah",
      location: "Jeddah Corniche",
      category: "Apartment",
      description: "A luxurious seaside high-rise apartment building in Jeddah with expansive glass balconies.",
      highlights: ["Sea Views", "Infinity Pool", "Smart Home Integration"],
      amenities: ["Pool", "Spa", "Valet"],
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      status: "Limited Availability",
      featured: true,
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

  app.post("/api/leads", (req, res) => {
    const newLead = {
      id: Date.now().toString(),
      ...req.body,
      date: new Date().toISOString(),
      status: "New"
    };
    db.leads.push(newLead);
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
