import 'dotenv/config';

export const env = {
    port: Number(process.env.PORT),
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
};
