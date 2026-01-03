"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const database_1 = require("../config/database");
exports.supabase = (0, supabase_js_1.createClient)(database_1.env.supabaseUrl, database_1.env.supabaseServiceKey, {
    auth: {
        persistSession: false,
    },
});
