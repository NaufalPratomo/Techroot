"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../lib/supabase");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const isConfigured = !!(database_1.env.supabaseUrl && database_1.env.supabaseServiceKey);
        if (!isConfigured) {
            return res.status(500).json({
                status: 'error',
                message: 'Konfigurasi .env belum lengkap (URL atau Key kosong)'
            });
        }
        const { error: connectionError } = await supabase_1.supabase.from('_').select('*').limit(0);
        const successCodes = ['42P01', 'PGRST205', 'PGRST116'];
        const isConnected = !connectionError || successCodes.includes(connectionError.code);
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            config: {
                env_loaded: true,
                supabase_url: database_1.env.supabaseUrl.substring(0, 15) + '...',
            },
            supabase: {
                connected: isConnected,
                message: isConnected
                    ? 'Tersambung ke Supabase (API reachable)'
                    : 'Gagal menyambung ke Supabase',
                error: connectionError ? {
                    code: connectionError.code,
                    message: connectionError.message
                } : null
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            detail: err.message
        });
    }
});
exports.default = router;
