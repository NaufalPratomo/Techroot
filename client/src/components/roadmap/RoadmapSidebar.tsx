"use client";

import React from "react";
import { CheckCircle2, Target, Rocket, BookOpen, Clock, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { WizardStep } from "@/types/roadmap";

interface RoadmapSidebarProps {
    currentStep: WizardStep;
    getStepNumber: () => number;
}

export const RoadmapSidebar = ({ currentStep, getStepNumber }: RoadmapSidebarProps) => {
    const STEPS = [
        { id: "purpose", label: "Tujuan", icon: Target },
        { id: "field", label: "Bidang", icon: Rocket },
        { id: "level", label: "Level", icon: BookOpen },
        { id: "time", label: "Waktu", icon: Clock },
        { id: "goal", label: "Target", icon: Trophy },
        { id: "confirm", label: "Review", icon: Zap },
    ];

    const stepNum = getStepNumber();

    return (
        <aside className="lg:w-80 w-full lg:sticky lg:top-24 z-20">
            <div className="bg-white rounded-xl p-5 lg:p-8 text-white space-y-4 lg:space-y-8 border-2 border-border overflow-hidden relative shadow-sm lg:shadow-none">
                <div className="relative z-10 space-y-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                            Builder Progress
                        </p>
                        <h3 className="text-xl lg:text-2xl font-black text-[#2443B0]">Roadmap Wizard</h3>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] lg:text-xs font-bold text-black/40 uppercase tracking-widest">Step {stepNum} of 6</span>
                            <span className="text-xs lg:text-sm font-black text-black">{Math.round((stepNum / 6) * 100)}%</span>
                        </div>
                        <div className="h-1.5 lg:h-2 w-full rounded-full bg-[#2443B0]/10 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[#2443B0] transition-all duration-700 ease-out"
                                style={{ width: `${(stepNum / 6) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative z-10 space-y-2">
                    {STEPS.map((s, i) => {
                        const isActive = currentStep === s.id;
                        const isCompleted = stepNum > i + 1;
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.id}
                                className={cn(
                                    "items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                                    isActive
                                        ? "bg-[#2443B0]/5 text-[#2443B0] border border-[#2443B0]/20 flex"
                                        : isCompleted
                                            ? "text-[#2443B0]/40 hover:bg-white/5 hidden lg:flex"
                                            : "text-[#2443B0]/40 hidden lg:flex"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-md border-2 transition-all flex-shrink-0",
                                        isActive
                                            ? "border-[#D7FE44] bg-[#D7FE44] text-[#1a1a1a]"
                                            : isCompleted
                                                ? "border-[#2443B0] bg-[#2443B0]/20 text-[#2443B0]"
                                                : "border-[#2443B0]/10 text-[#2443B0]/10"
                                    )}
                                >
                                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon className={cn("h-4 w-4", !isActive && !isCompleted && "opacity-20")} />
                                    <span className="truncate">{s.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};
