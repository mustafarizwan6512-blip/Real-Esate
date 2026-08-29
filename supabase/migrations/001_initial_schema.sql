-- REFERESTATES Supabase Migration - Phase 1 to 4 (Database Schema, RLS, Roles, Leads)

-- ENUMS
CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'editor');
CREATE TYPE property_status AS ENUM ('Available', 'Limited Availability', 'Coming Soon', 'Sold Out', 'Hidden');
CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Follow-up', 'Interested', 'Viewing', 'Negotiation', 'Closed', 'Lost');
CREATE TYPE lead_priority AS ENUM ('Low', 'Medium', 'High', 'Urgent');
CREATE TYPE lead_source AS ENUM ('Website', 'Property Page', 'Contact Form', 'WhatsApp', 'Campaign', 'Other');

-- 1. ADMINS / PROFILES
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role admin_role DEFAULT 'editor',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DEVELOPERS
CREATE TABLE developers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    cover_image_url TEXT,
    description TEXT,
    website TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    location TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROPERTIES
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    developer_id UUID REFERENCES developers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    property_type TEXT,
    city TEXT,
    district TEXT,
    address TEXT,
    description TEXT,
    short_description TEXT,
    bedrooms TEXT,
    bathrooms TEXT,
    size TEXT,
    starting_price NUMERIC,
    currency TEXT DEFAULT 'SAR',
    payment_plan TEXT,
    availability TEXT,
    handover_date TEXT,
    furnished_status TEXT,
    featured BOOLEAN DEFAULT false,
    status property_status DEFAULT 'Available',
    hero_image_url TEXT,
    floor_plan_url TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    notes TEXT,
    sort_order INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROPERTY MEDIA
CREATE TABLE property_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL, -- 'image', 'video', 'floor_plan', 'brochure'
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    title TEXT,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LEADS
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    country TEXT,
    preferred_city TEXT,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    property_name TEXT,
    budget TEXT,
    bedrooms TEXT,
    message TEXT,
    source lead_source DEFAULT 'Website',
    status lead_status DEFAULT 'New',
    priority lead_priority DEFAULT 'Medium',
    assigned_to UUID REFERENCES admins(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. WEBSITE CONTENT
CREATE TABLE website_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    content_type TEXT DEFAULT 'text',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. WEBSITE SETTINGS
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ACTIVITY LOGS
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admins(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_developers_slug ON developers(slug);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Developers (Public Read, Admin Write)
CREATE POLICY "Public can view active developers" ON developers FOR SELECT USING (status = true);
CREATE POLICY "Admins can manage developers" ON developers FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- Properties (Public Read, Admin Write)
CREATE POLICY "Public can view non-hidden properties" ON properties FOR SELECT USING (status != 'Hidden');
CREATE POLICY "Admins can manage properties" ON properties FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- Property Media (Public Read, Admin Write)
CREATE POLICY "Public can view media" ON property_media FOR SELECT USING (
    EXISTS (SELECT 1 FROM properties WHERE id = property_media.property_id AND status != 'Hidden')
);
CREATE POLICY "Admins can manage media" ON property_media FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- Leads (Public Insert, Admin All)
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view and update leads" ON leads FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- Website Content (Public Read, Admin Write)
CREATE POLICY "Public can view website content" ON website_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage website content" ON website_content FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- Settings (Public Read, Admin Write)
CREATE POLICY "Public can view settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON settings FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- Admins & Activity Logs (Admin Only)
CREATE POLICY "Admins can view their own admin record" ON admins FOR SELECT USING (
    auth.uid() = user_id
);

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean AS $$
DECLARE
  is_super boolean;
BEGIN
  SELECT role = 'super_admin' INTO is_super
  FROM public.admins
  WHERE user_id = auth.uid();
  
  RETURN COALESCE(is_super, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE POLICY "Super admins can manage admins" ON admins FOR ALL USING (
    public.is_super_admin()
);

CREATE POLICY "Admins can view logs" ON activity_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);
CREATE POLICY "Admins can insert logs" ON activity_logs FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
);

-- TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admins_modtime BEFORE UPDATE ON admins FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_developers_modtime BEFORE UPDATE ON developers FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_properties_modtime BEFORE UPDATE ON properties FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_leads_modtime BEFORE UPDATE ON leads FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_website_content_modtime BEFORE UPDATE ON website_content FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_settings_modtime BEFORE UPDATE ON settings FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- ==========================================
-- OPTIONAL SEED DATA
-- ==========================================

-- Insert Example Developers
INSERT INTO developers (id, name, slug, description, featured, status) VALUES 
('11111111-1111-1111-1111-111111111111', 'ROSHN', 'roshn', 'Saudi Arabia''s national real estate developer.', true, true),
('22222222-2222-2222-2222-222222222222', 'Dar Al Arkan', 'dar-al-arkan', 'Leading real estate company in Saudi Arabia.', true, true),
('33333333-3333-3333-3333-333333333333', 'NEOM Company', 'neom', 'Developers of the futuristic city of NEOM.', true, true),
('44444444-4444-4444-4444-444444444444', 'DAR Global', 'dar-global', 'International luxury real estate developer.', true, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert Example Properties
INSERT INTO properties (id, developer_id, name, slug, property_type, city, district, address, description, short_description, bedrooms, bathrooms, starting_price, currency, status, featured, hero_image_url) VALUES 
('aaaaaaaa-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'The Boulevard Villas', 'boulevard-villas', 'Villa', 'Riyadh', 'Riyadh North', 'Boulevard Ave', 'An expansive, high-end residential complex in Riyadh featuring minimalist geometric villas.', 'High-end residential complex in Riyadh.', '4, 5', '5', 3500000, 'SAR', 'Available', true, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'),
('bbbbbbbb-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'PARK RESIDENCE 2', 'park-residence-2', 'Residential, Premium Penthouse, commercial', 'Jeddah', 'Darb Al Haramain', 'Darb Al Haramain, Jeddah', 'A breathtaking high-rise development situated in Darb Al Haramain. PARK RESIDENCE 2 combines absolute luxury with modern design. Developed by REAL Real Estate, this under-construction property features direct views of the central park, surrounded by lush greenery, walking paths, and world-class retail spaces.', 'Premium residential, penthouse, and commercial suites in Darb Al Haramain by REAL Real Estate.', 'Premium Penthouses & Residential Suites', '3+', 320000, 'SAR', 'Under Construction', true, '/image.png'),
('cccccccc-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'The Line Estates', 'the-line-estates', 'Mixed Use', 'NEOM', 'The Line', 'Sector 1', 'A breathtaking, futuristic mixed-use development in NEOM.', 'Futuristic mixed-use development.', '1, 2, 3', '2', 4500000, 'SAR', 'Sold Out', true, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'),
('dddddddd-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'Al-Fursan Residences', 'al-fursan', 'Apartment', 'Riyadh', 'Downtown', 'King Fahd Road', 'Al-Fursan Residences embodies the pinnacle of architectural minimalism in the heart of Riyadh.', 'Pinnacle of architectural minimalism.', '3, 4', '4', 5200000, 'SAR', 'Available', true, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')
ON CONFLICT (slug) DO NOTHING;

-- Insert Example Lead
INSERT INTO leads (name, email, phone, country, message, status) VALUES 
('Ahmed Al-Saud', 'ahmed@example.com', '+966 50 000 0000', 'Saudi Arabia', 'I am interested in PARK RESIDENCE 2. Please send a brochure.', 'New');

