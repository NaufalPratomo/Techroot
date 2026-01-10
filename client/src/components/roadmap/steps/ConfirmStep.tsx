"use client";

import React from "react";
import { Target, Rocket, BookOpen, Clock, Calendar, Trophy, Cpu } from "lucide-react";
import { RoadmapFormData } from "@/types/roadmap";
import { PURPOSE_OPTIONS, TRENDING_FIELDS, SKILL_LEVELS, DAILY_TIME_OPTIONS, DURATION_OPTIONS, GOAL_OPTIONS } from "@/constants/roadmap";

interface ConfirmStepProps {
    formData: RoadmapFormData;
}

const ModelIcon = ({ brand, className }: { brand: string; className?: string }) => {
    switch (brand) {
        case "google":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                </svg>
            );
        default:
            return <Cpu className={className} />;
    }
};

export const ConfirmStep = ({ formData }: ConfirmStepProps) => {
    const summaryItems = [
        { label: "Tujuan", value: PURPOSE_OPTIONS.find((p) => p.id === formData.purpose)?.label, icon: Target },
        { label: "Bidang", value: TRENDING_FIELDS.find((f) => f.id === formData.field)?.name, icon: Rocket },
        { label: "Level", value: SKILL_LEVELS.find((l) => l.id === formData.level)?.label, icon: BookOpen },
        { label: "Waktu / hari", value: DAILY_TIME_OPTIONS.find((t) => t.id === formData.dailyTime)?.label, icon: Clock },
        { label: "Durasi", value: DURATION_OPTIONS.find((d) => d.id === formData.duration)?.label, icon: Calendar },
        { label: "Goal", value: GOAL_OPTIONS.find((g) => g.id === formData.goal)?.label, icon: Trophy },
    ];

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Review profilmu</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Pastikan semua datanya sudah sesuai sebelum AI kami bekerja.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {summaryItems.map((item, idx) => {
                    if (!item.value) return null;
                    const Icon = item.icon;
                    return (
                        <div key={idx} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2443B0]/10 text-[#2443B0]">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                                <p className="text-base font-bold text-slate-900 leading-tight">{item.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="relative overflow-hidden p-6 bg-white border-border border rounded-xl text-white space-y-4">
                <div className="relative z-10 flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-lg">
                        <ModelIcon brand="google" className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                            AI Engine Ready
                        </p>
                        <p className="text-[#2443B0]/60 font-medium">
                            Powered by Gemma 3 27B model for deep technical structuring.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
