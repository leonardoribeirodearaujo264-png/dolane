import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Single shared Supabase client. Uses the publishable (anon) key, which is safe
 * to expose — every write is still governed by the table's Row Level Security
 * policies. Returns null when the env vars are missing so the app degrades
 * gracefully instead of crashing at import time.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

export const isSupabaseConfigured = Boolean(url && key);
