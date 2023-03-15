import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ouuhkqznascbbimwhjtn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dWhrcXpuYXNjYmJpbXdoanRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwOTI2MDIsImV4cCI6MTk5MzY2ODYwMn0.kVP3eZJ8XsA9GGESl3uTOjTkDK-NBqXuekktMq7u2UY'

export const supabase = createClient(supabaseUrl, supabaseKey)