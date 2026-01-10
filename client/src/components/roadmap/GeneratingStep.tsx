"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export const GeneratingStep = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 py-20 text-center animate-in fade-in duration-500">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-slate-100 border-t-[#2443B0] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-[#2443B0] animate-pulse" />
                </div>
            </div>
            <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Sedang menyusun roadmap</h2>
                <p className="text-slate-500 font-medium max-w-md">
                    AI sedang menggabungkan profilmu dengan kurikulum industri terbaru untuk menghasilkan jalur belajar terstruktur.
                </p>
            </div>
            <div className="w-full max-w-md space-y-4 bg-slate-50 p-6 rounded-[2rem]">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2443B0] animate-[progress_3s_ease-in-out_infinite]" style={{ width: '60%' }} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Memproses kurikulum logis…</p>
            </div>
        </div>
    );
};
