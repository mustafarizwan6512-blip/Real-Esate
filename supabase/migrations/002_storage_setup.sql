-- REFERESTATES Supabase Migration - Phase 5 (Storage)

-- Create Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('property-media', 'property-media', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('developer-media', 'developer-media', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('website-media', 'website-media', true) ON CONFLICT DO NOTHING;

-- Policies for property-media
CREATE POLICY "Public Read Property Media" ON storage.objects FOR SELECT USING (bucket_id = 'property-media');
CREATE POLICY "Admin Insert Property Media" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'property-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);
CREATE POLICY "Admin Update Property Media" ON storage.objects FOR UPDATE USING (
    bucket_id = 'property-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);
CREATE POLICY "Admin Delete Property Media" ON storage.objects FOR DELETE USING (
    bucket_id = 'property-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);

-- Policies for developer-media
CREATE POLICY "Public Read Developer Media" ON storage.objects FOR SELECT USING (bucket_id = 'developer-media');
CREATE POLICY "Admin Insert Developer Media" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'developer-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);
CREATE POLICY "Admin Update Developer Media" ON storage.objects FOR UPDATE USING (
    bucket_id = 'developer-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);
CREATE POLICY "Admin Delete Developer Media" ON storage.objects FOR DELETE USING (
    bucket_id = 'developer-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);

-- Policies for website-media
CREATE POLICY "Public Read Website Media" ON storage.objects FOR SELECT USING (bucket_id = 'website-media');
CREATE POLICY "Admin Insert Website Media" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'website-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);
CREATE POLICY "Admin Update Website Media" ON storage.objects FOR UPDATE USING (
    bucket_id = 'website-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);
CREATE POLICY "Admin Delete Website Media" ON storage.objects FOR DELETE USING (
    bucket_id = 'website-media' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);
