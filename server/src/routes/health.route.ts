import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const { error: dbError } = await supabase
            .from('_connection_test')
            .select('id')
            .limit(1);

        const isConnected = !dbError || (dbError.code === '42P01' || dbError.code === 'PGRST116');

        if (!isConnected && dbError) {
            return res.status(500).json({
                status: 'error',
                message: 'Supabase connection failed',
                details: dbError.message,
                code: dbError.code
            });
        }

        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            supabase: {
                connected: true,
                message: dbError?.code === '42P01'
                    ? 'Connected to Supabase, but test table not found (this is normal)'
                    : 'Connected to Supabase successfully',
            }
        });
    } catch (err: any) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error during health check',
            details: err.message
        });
    }
});

export default router;

