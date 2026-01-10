"use client";

import React from "react";
import { Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { PURPOSE_OPTIONS } from "@/constants/roadmap";

interface PurposeStepProps {
    value: string;
    onChange: (value: string) => void;
}

export const PurposeStep = ({ value, onChange }: PurposeStepProps) => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Apa tujuan belajarmu?</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Tujuan yang jelas membantu AI menyusun roadmap yang lebih relevan dan targeted.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {PURPOSE_OPTIONS.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => onChange(option.id)}
                        className={cn(
                            "relative overflow-hidden cursor-pointer p-5 rounded-xl border-2 transition-all duration-300",
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
                                <Target className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-lg font-bold text-slate-900">{option.label}</p>
                                <p className="text-sm text-slate-500 font-medium">{option.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
