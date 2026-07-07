-- Run this in your Supabase SQL Editor to create the required tables and policies

-- Create Posts table for News Articles
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  type TEXT NOT NULL, -- e.g., 'GTA V', 'GTA VI', 'AI Video', 'Trailer', 'Gameplay'
  description TEXT,
  ai_tool TEXT,
  ai_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Media table for Gallery
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image' or 'video'
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tables
CREATE POLICY "Public Read Access" ON posts FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON videos FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON media FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete (Admin operations)
CREATE POLICY "Admin All Access" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON media FOR ALL USING (auth.role() = 'authenticated');
