"use client";

import React from "react";
import { Trophy, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { GOAL_OPTIONS } from "@/constants/roadmap";

interface GoalStepProps {
    value: string;
    additionalInfo: string;
    onChange: (value: string) => void;
    onAdditionalInfoChange: (value: string) => void;
}

export const GoalStep = ({ value, additionalInfo, onChange, onAdditionalInfoChange }: GoalStepProps) => {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Target akhir yang ingin dicapai</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Jelaskan apa hasil konkret yang kamu harapkan setelah menyelesaikan roadmap ini.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {GOAL_OPTIONS.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => onChange(option.id)}
                        className={cn(
                            "relative overflow-hidden cursor-pointer p-5 rounded-[2rem] border-2 transition-all duration-300",
                            value === option.id
                                ? "border-[#2443B0] bg-[#2443B0]/5 shadow-md"
                                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                        )}
                    >
                        <div className="flex items-center gap-5">
                            <div className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                value === option.id ? "bg-[#2443B0] text-white" : "bg-slate-100 text-slate-400"
                            )}>
                                <Trophy className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-lg font-bold text-slate-900">{option.label}</p>
                                <p className="text-sm text-slate-500 font-medium">{option.description}</p>
                            </div>
                            {value === option.id && (
                                <div className="h-6 w-6 rounded-full bg-[#2443B0] flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 px-1">
                    Info tambahan (opsional)
                </p>
                <div className="relative group">
                    <Textarea
                        value={additionalInfo}
                        onChange={(e) => onAdditionalInfoChange(e.target.value)}
                        placeholder="Contoh: Sudah pernah belajar Python, ingin fokus ke Machine Learning..."
                        className="min-h-[120px] rounded-[1.5rem] border-slate-200 focus:border-[#2443B0] focus:ring-[#2443B0]/10 text-base p-5 transition-all"
                    />
                </div>
            </div>
        </div>
    );
};
