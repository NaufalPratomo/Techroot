"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SKILL_LEVELS } from "@/constants/roadmap";

interface LevelStepProps {
    value: string;
    onChange: (value: string) => void;
}

export const LevelStep = ({ value, onChange }: LevelStepProps) => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Level kemampuan saat ini</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Kami sesuaikan kedalaman materi sesuai dengan pengalamanmu sekarang.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILL_LEVELS.map((level) => {
                    const Icon = level.icon;
                    const isActive = value === level.id;
                    return (
                        <div
                            key={level.id}
                            onClick={() => onChange(level.id)}
                            className={cn(
                                "group relative overflow-hidden cursor-pointer p-6 rounded-xl border-2 transition-all duration-300",
                                isActive
                                    ? "border-[#2443B0] bg-[#2443B0]/5 shadow-md"
                                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                            )}
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className={cn(
                                    "flex h-16 w-16 items-center justify-center rounded-[1.5rem] transition-colors",
                                    isActive ? "bg-[#2443B0] text-white shadow-lg shadow-[#2443B0]/20" : "bg-slate-100 text-slate-400 group-hover:bg-[#2443B0]/10 group-hover:text-[#2443B0]"
                                )}>
                                    <Icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-slate-900">{level.label}</p>
                                    <p className="text-sm text-slate-500 font-medium mt-1">{level.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
