"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TRENDING_FIELDS } from "@/constants/roadmap";

interface FieldStepProps {
    value: string;
    onChange: (value: string) => void;
}

export const FieldStep = ({ value, onChange }: FieldStepProps) => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Pilih bidang yang kamu minati</h2>
                <p className="mt-2 text-slate-500 font-medium">
                    Kami mendukung berbagai jalur karir tech paling populer saat ini.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TRENDING_FIELDS.map((field) => {
                    const Icon = field.icon;
                    const isActive = value === field.id;
                    return (
                        <div
                            key={field.id}
                            onClick={() => onChange(field.id)}
                            className={cn(
                                "group relative overflow-hidden cursor-pointer p-6 rounded-xl border-2 transition-all duration-300",
                                isActive
                                    ? "border-[#2443B0] bg-[#2443B0]/5 shadow-md"
                                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                            )}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className={cn(
                                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                        isActive ? "bg-[#2443B0] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-[#2443B0]/10 group-hover:text-[#2443B0]"
                                    )}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    {field.trending && (
                                        <Badge className="bg-[#D7FE44] text-[#1a1a1a] border-none font-bold hover:bg-[#D7FE44]">
                                            Trending
                                        </Badge>
                                    )}
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">{field.name}</p>
                                    <p className="text-sm text-slate-500 font-medium line-clamp-2">{field.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
