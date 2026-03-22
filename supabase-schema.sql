-- =====================================================
-- Life-Todo Health Tracker - Supabase Schema
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: daily_logs
-- =====================================================
CREATE TABLE IF NOT EXISTS daily_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  date date NOT NULL,
  breakfast boolean DEFAULT false,
  lunch boolean DEFAULT false,
  snack boolean DEFAULT false,
  dinner boolean DEFAULT false,
  activity_type text CHECK (activity_type IN ('none', 'walk', 'exercise', 'walk_and_exercise')),
  energy text CHECK (energy IN ('low', 'medium', 'high')),
  appetite text CHECK (appetite IN ('low', 'normal', 'high')),
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- =====================================================
-- TABLE: weekly_logs
-- =====================================================
CREATE TABLE IF NOT EXISTS weekly_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  week_start date NOT NULL,
  weight_kg decimal(5,2),
  waist_cm decimal(5,1),
  arm_cm decimal(5,1),
  weekly_feeling text CHECK (weekly_feeling IN ('worse', 'same', 'better')),
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, week_start)
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on both tables
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to recreate cleanly)
DROP POLICY IF EXISTS "Users can view their own daily_logs" ON daily_logs;
DROP POLICY IF EXISTS "Users can insert their own daily_logs" ON daily_logs;
DROP POLICY IF EXISTS "Users can update their own daily_logs" ON daily_logs;
DROP POLICY IF EXISTS "Users can delete their own daily_logs" ON daily_logs;

DROP POLICY IF EXISTS "Users can view their own weekly_logs" ON weekly_logs;
DROP POLICY IF EXISTS "Users can insert their own weekly_logs" ON weekly_logs;
DROP POLICY IF EXISTS "Users can update their own weekly_logs" ON weekly_logs;
DROP POLICY IF EXISTS "Users can delete their own weekly_logs" ON weekly_logs;

-- =====================================================
-- RLS Policies for daily_logs
-- =====================================================

CREATE POLICY "Users can view their own daily_logs"
  ON daily_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily_logs"
  ON daily_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily_logs"
  ON daily_logs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily_logs"
  ON daily_logs FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- RLS Policies for weekly_logs
-- =====================================================

CREATE POLICY "Users can view their own weekly_logs"
  ON weekly_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weekly_logs"
  ON weekly_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weekly_logs"
  ON weekly_logs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weekly_logs"
  ON weekly_logs FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- INDEXES for better performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_daily_logs_user_date 
  ON daily_logs(user_id, date DESC);

CREATE INDEX IF NOT EXISTS idx_weekly_logs_user_week 
  ON weekly_logs(user_id, week_start DESC);

-- =====================================================
-- Supabase Auth Configuration
-- =====================================================

-- Configure email auth (magic link) settings in Supabase Dashboard:
-- Authentication > Providers > Email > Enable Email Signups
-- 
-- Recommended settings:
-- - Enable Secure email link (passwordless sign-in via email)
-- - Disable "Allow new registrations" if you want invite-only
-- - Set Site URL to your deployed URL
-- - Add redirect URLs for production domains

-- =====================================================
-- FINISH
-- =====================================================
