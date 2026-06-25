import { createClient } from '@supabase/supabase-js';

// Supabase configuration - These will be replaced with actual values
// For demo purposes, we use a public anon key which is safe to expose
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://your-project.supabase.co' && supabaseAnonKey !== 'your-anon-key';
};

// Database types
export interface DbUser {
  id: string;
  name: string;
  role: 'admin' | 'teacher';
  subject?: string;
  password: string;
  created_at?: string;
}

export interface DbExam {
  id: string;
  exam_data: string; // JSON stringified ExamPaper
  marking_scheme: string; // JSON stringified MarkingSchemeItem[]
  class_level: string;
  subject: string;
  exam_type: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface DbAssessment {
  id: string;
  assessment_data: string; // JSON stringified
  class_level: string;
  child_name: string;
  assessed_by: string;
  created_at: string;
}

// SQL to create tables (for reference - run this in Supabase SQL editor):
/*
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'teacher')),
  subject TEXT,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default users
INSERT INTO users (name, role, password, subject) VALUES 
  ('Admin', 'admin', 'admin123', NULL),
  ('Mr. Mensah', 'teacher', 'teacher123', 'Mathematics'),
  ('Mrs. Addo', 'teacher', 'teacher123', 'English Language')
ON CONFLICT (name) DO NOTHING;

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_data JSONB NOT NULL,
  marking_scheme JSONB NOT NULL,
  class_level TEXT NOT NULL,
  subject TEXT NOT NULL,
  exam_type TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_data JSONB NOT NULL,
  class_level TEXT NOT NULL,
  child_name TEXT NOT NULL,
  assessed_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (in production, use proper auth)
CREATE POLICY "Allow all for users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all for exams" ON exams FOR ALL USING (true);
CREATE POLICY "Allow all for assessments" ON assessments FOR ALL USING (true);
*/
