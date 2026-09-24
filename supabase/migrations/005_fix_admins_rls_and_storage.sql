-- ==============================================================================
-- REFERESTATES Supabase Migration - 005: Fix Admin RLS Recursion & Storage Policies
-- ==============================================================================

-- 1. Ensure Unique Constraints on Admins Table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'admins_user_id_unique'
  ) THEN
    -- In case of duplicate user_ids, keep only the latest row before adding constraint
    DELETE FROM public.admins a
    WHERE a.id NOT IN (
      SELECT DISTINCT ON (user_id) id
      FROM public.admins
      ORDER BY user_id, updated_at DESC
    );
    ALTER TABLE public.admins ADD CONSTRAINT admins_user_id_unique UNIQUE (user_id);
  END IF;
END $$;

-- 2. Drop all existing/conflicting policies to prevent recursion
-- Admins policies
DROP POLICY IF EXISTS "Admins can view their own admin record" ON public.admins;
DROP POLICY IF EXISTS "Admins can view admins" ON public.admins;
DROP POLICY IF EXISTS "Super admins can manage admins" ON public.admins;
DROP POLICY IF EXISTS "Admins can view own admin profile" ON public.admins;
DROP POLICY IF EXISTS "Admins can update own profile" ON public.admins;
DROP POLICY IF EXISTS "Super admins can insert admins" ON public.admins;
DROP POLICY IF EXISTS "Super admins can delete admins" ON public.admins;

-- Developers policies
DROP POLICY IF EXISTS "Public can view active developers" ON public.developers;
DROP POLICY IF EXISTS "Admins can manage developers" ON public.developers;
DROP POLICY IF EXISTS "Admins can insert developers" ON public.developers;
DROP POLICY IF EXISTS "Admins can update developers" ON public.developers;
DROP POLICY IF EXISTS "Admins can delete developers" ON public.developers;

-- Properties policies
DROP POLICY IF EXISTS "Public can view non-hidden properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can manage properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can update properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can delete properties" ON public.properties;

-- Property Media policies
DROP POLICY IF EXISTS "Public can view media" ON public.property_media;
DROP POLICY IF EXISTS "Admins can manage media" ON public.property_media;
DROP POLICY IF EXISTS "Admins can insert media" ON public.property_media;
DROP POLICY IF EXISTS "Admins can update media" ON public.property_media;
DROP POLICY IF EXISTS "Admins can delete media" ON public.property_media;

-- Leads policies
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view and update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can read leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;

-- Website Content policies
DROP POLICY IF EXISTS "Public can view website content" ON public.website_content;
DROP POLICY IF EXISTS "Admins can manage website content" ON public.website_content;

-- Settings policies
DROP POLICY IF EXISTS "Public can view settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can manage settings" ON public.settings;

-- Activity Logs policies
DROP POLICY IF EXISTS "Admins can view logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Admins can insert logs" ON public.activity_logs;

-- Storage policies
DROP POLICY IF EXISTS "Public Read Property Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert Property Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Property Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Property Media" ON storage.objects;

DROP POLICY IF EXISTS "Public Read Developer Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert Developer Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Developer Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Developer Media" ON storage.objects;

DROP POLICY IF EXISTS "Public Read Website Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert Website Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Website Media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Website Media" ON storage.objects;

DROP POLICY IF EXISTS "Public Read Media Objects" ON storage.objects;
DROP POLICY IF EXISTS "Public View Media Objects" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Media Objects" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Media Objects" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Media Objects" ON storage.objects;


-- ==============================================================================
-- 3. Non-Recursive Security Definer Authorization Functions
-- ==============================================================================

-- Safe check for active admin status (bypasses RLS on public.admins without recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
STABLE
AS $$
DECLARE
  admin_active boolean;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.admins
    WHERE user_id = auth.uid()
      AND is_active = true
  ) INTO admin_active;

  RETURN COALESCE(admin_active, false);
END;
$$;

-- Safe check for super admin status
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
STABLE
AS $$
DECLARE
  super_active boolean;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.admins
    WHERE user_id = auth.uid()
      AND role = 'super_admin'
      AND is_active = true
  ) INTO super_active;

  RETURN COALESCE(super_active, false);
END;
$$;

-- Grant execution permissions
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, anon, service_role;


-- ==============================================================================
-- 4. RLS Policies for `public.admins`
-- ==============================================================================
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Admins can view their own profile; Super admins can view all profiles
CREATE POLICY "Admins can view own admin profile"
ON public.admins
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() OR public.is_super_admin()
);

-- Admins can update their own profile; Super admins can update all profiles
CREATE POLICY "Admins can update own admin profile"
ON public.admins
FOR UPDATE
TO authenticated
USING (
  user_id = auth.uid() OR public.is_super_admin()
)
WITH CHECK (
  user_id = auth.uid() OR public.is_super_admin()
);

-- Super admins can insert new admins, or an authenticated user registering their initial profile
CREATE POLICY "Super admins can insert admins"
ON public.admins
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_super_admin() OR user_id = auth.uid()
);

-- Super admins can delete admin profiles
CREATE POLICY "Super admins can delete admins"
ON public.admins
FOR DELETE
TO authenticated
USING (
  public.is_super_admin()
);


-- ==============================================================================
-- 5. RLS Policies for Developers
-- ==============================================================================
ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active developers"
ON public.developers
FOR SELECT
USING (
  status = true OR public.is_admin()
);

CREATE POLICY "Admins can insert developers"
ON public.developers
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can update developers"
ON public.developers
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can delete developers"
ON public.developers
FOR DELETE
TO authenticated
USING (
  public.is_admin()
);


-- ==============================================================================
-- 6. RLS Policies for Properties
-- ==============================================================================
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view non-hidden properties"
ON public.properties
FOR SELECT
USING (
  status != 'Hidden' OR public.is_admin()
);

CREATE POLICY "Admins can insert properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can update properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can delete properties"
ON public.properties
FOR DELETE
TO authenticated
USING (
  public.is_admin()
);


-- ==============================================================================
-- 7. RLS Policies for Property Media
-- ==============================================================================
ALTER TABLE public.property_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view property media"
ON public.property_media
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.properties
    WHERE id = property_media.property_id
      AND (status != 'Hidden' OR public.is_admin())
  )
);

CREATE POLICY "Admins can insert property media"
ON public.property_media
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can update property media"
ON public.property_media
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can delete property media"
ON public.property_media
FOR DELETE
TO authenticated
USING (
  public.is_admin()
);


-- ==============================================================================
-- 8. RLS Policies for Leads
-- ==============================================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Website visitors can submit inquiries
CREATE POLICY "Public can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Only authenticated admins can read, update, or delete customer leads
CREATE POLICY "Admins can select leads"
ON public.leads
FOR SELECT
TO authenticated
USING (
  public.is_admin()
);

CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (
  public.is_admin()
);


-- ==============================================================================
-- 9. RLS Policies for Website Content & Settings
-- ==============================================================================
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view website content"
ON public.website_content
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert website content"
ON public.website_content
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can update website content"
ON public.website_content
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can delete website content"
ON public.website_content
FOR DELETE
TO authenticated
USING (
  public.is_admin()
);

-- Settings Table
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view settings"
ON public.settings
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert settings"
ON public.settings
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can update settings"
ON public.settings
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Admins can delete settings"
ON public.settings
FOR DELETE
TO authenticated
USING (
  public.is_admin()
);


-- ==============================================================================
-- 10. RLS Policies for Activity Logs
-- ==============================================================================
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view logs"
ON public.activity_logs
FOR SELECT
TO authenticated
USING (
  public.is_admin()
);

CREATE POLICY "Admins can insert logs"
ON public.activity_logs
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
);


-- ==============================================================================
-- 11. Storage Setup & Storage Policies
-- ==============================================================================

-- Create or update the storage buckets to ensure public readability
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('property-media', 'property-media', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']),
  ('developer-media', 'developer-media', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']),
  ('website-media', 'website-media', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'])
ON CONFLICT (id) DO UPDATE SET 
  public = true;

-- Enable RLS on storage objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 1. Anyone (public website visitors and admins) can view media in public buckets
CREATE POLICY "Public View Media Objects"
ON storage.objects
FOR SELECT
USING (
  bucket_id IN ('property-media', 'developer-media', 'website-media')
);

-- 2. Authenticated administrators can upload files into the media buckets
CREATE POLICY "Admin Upload Media Objects"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('property-media', 'developer-media', 'website-media')
  AND public.is_admin()
);

-- 3. Authenticated administrators can update/replace files (required for upsert: true)
CREATE POLICY "Admin Update Media Objects"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('property-media', 'developer-media', 'website-media')
  AND public.is_admin()
)
WITH CHECK (
  bucket_id IN ('property-media', 'developer-media', 'website-media')
  AND public.is_admin()
);

-- 4. Authenticated administrators can delete media files
CREATE POLICY "Admin Delete Media Objects"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id IN ('property-media', 'developer-media', 'website-media')
  AND public.is_admin()
);
