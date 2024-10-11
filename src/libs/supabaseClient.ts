import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ditaopquklgwonjedbds.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdGFvcHF1a2xnd29uamVkYmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1ODQwMjksImV4cCI6MjA0NDE2MDAyOX0.GcbqtFyJDqw1-PrZwEH5aJV7weSHnoLDhEtrbZpxfT8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);