// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lsvztoyooeuioorvburc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdnp0b3lvb2V1aW9vcnZidXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDcwODYsImV4cCI6MjA2NzI4MzA4Nn0.IxuMEKpRuqdnXbOQIYvRRHX1ISmleysY8YkVM4JP7PA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});