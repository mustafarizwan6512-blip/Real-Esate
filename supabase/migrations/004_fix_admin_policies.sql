-- REFERESTATES Supabase Migration - Phase 10 Hotfix (Fix Infinite Recursion)

-- 1. Drop the recursive policies
DROP POLICY IF EXISTS "Admins can view admins" ON admins;
DROP POLICY IF EXISTS "Super admins can manage admins" ON admins;

-- 2. Recreate them using non-recursive checks
-- This allows users to read their own admin record (which satisfies the EXISTS checks in other tables)
CREATE POLICY "Admins can view their own admin record" ON admins 
FOR SELECT USING (
    auth.uid() = user_id
);

-- For super admins, they need to be able to manage all admins.
-- We use a subquery on the auth.users table (which doesn't have RLS causing a loop) 
-- OR we can just use a non-recursive approach. 
-- Since we just need to prevent the policy from querying the SAME table in a way that triggers itself,
-- the easiest way is to let admins view all admins if they are a super admin. 
-- But wait, a policy on `admins` shouldn't query `admins`.

-- Create a secure function to check for super_admin status without triggering RLS
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

-- Use the security definer function for the super admin policy
CREATE POLICY "Super admins can manage admins" ON admins 
FOR ALL USING (
    public.is_super_admin()
);
