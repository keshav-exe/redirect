-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  links JSONB NOT NULL DEFAULT '[]'::jsonb,
  ad_free BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safe to re-run: adds the column for databases created before ad_free existed
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ad_free BOOLEAN NOT NULL DEFAULT false;

-- Create index on username for fast lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Deny direct table access for anon/authenticated clients.
-- The app uses the service role server-side, which bypasses RLS.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
