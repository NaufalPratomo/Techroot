import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/database';

// Create Supabase client only if credentials are available
let supabase: SupabaseClient;

if (env.supabaseUrl && env.supabaseServiceKey) {
    supabase = createClient(
        env.supabaseUrl,
        env.supabaseServiceKey,
        {
            auth: {
                persistSession: false,
            },
        }
    );
} else {
    console.error('⚠️ Supabase client not initialized - missing credentials');
    // Create a dummy client that will fail gracefully
    supabase = createClient('https://placeholder.supabase.co', 'placeholder-key', {
        auth: { persistSession: false }
    });
}

export { supabase };
