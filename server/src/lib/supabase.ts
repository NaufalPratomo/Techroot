import { createClient } from '@supabase/supabase-js';
import { env } from '../config/database';

export const supabase = createClient(
    env.supabaseUrl,
    env.supabaseServiceKey,
    {
        auth: {
            persistSession: false,
        },
    }
);
