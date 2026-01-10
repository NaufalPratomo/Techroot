"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DAILY_TIME_OPTIONS, DURATION_OPTIONS } from "@/constants/roadmap";

interface TimeStepProps {
    dailyTime: string;
    duration: string;
    onDailyTimeChange: (value: string) => void;
    onDurationChange: (value: string) => void;
}

export const TimeStep = ({ dailyTime, duration, onDailyTimeChange, onDurationChange }: TimeStepProps) => {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Komitmen waktu belajar</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Pilih jadwal yang realistis agar kamu bisa konsisten sampai garis finish.
                </p>
            </div>

            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#2443B0]">
                        Waktu belajar per hari
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {DAILY_TIME_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => onDailyTimeChange(option.id)}
                                className={cn(
                                    "h-14 rounded-xl font-bold text-sm transition-all border-2 cursor-pointer",
                                    dailyTime === option.id
                                        ? "bg-[#2443B0] text-white border-[#2443B0] shadow-lg shadow-[#2443B0]/20"
                                        : "bg-white text-slate-600 border-slate-100 hover:border-slate-300"
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#2443B0]">
                        Target durasi selesai
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {DURATION_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => onDurationChange(option.id)}
                                className={cn(
                                    "h-14 rounded-xl font-bold text-sm transition-all border-2 cursor-pointer",
                                    duration === option.id
                                        ? "bg-[#2443B0] text-white border-[#2443B0] shadow-lg shadow-[#2443B0]/20"
                                        : "bg-white text-slate-600 border-slate-100 hover:border-slate-300"
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
