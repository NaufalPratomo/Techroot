import 'dotenv/config';

// Validate required environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    console.error('❌ SUPABASE_URL environment variable is not set');
}

if (!supabaseServiceKey) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable is not set');
}

export const env = {
    port: Number(process.env.PORT) || 5000,
    supabaseUrl: supabaseUrl || '',
    supabaseServiceKey: supabaseServiceKey || '',
    openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
};
