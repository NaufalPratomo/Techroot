"use client";

import React from "react";
import { Sparkles, Clock, Cpu, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WelcomeStepProps {
    onNext: () => void;
}

export const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative w-full max-w-4xl text-center space-y-8">
                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#2443B0]/5 rounded-full blur-[100px] -z-10" />

                <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#2443B0] text-sm font-black border border-slate-200 shadow-sm mb-4">
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI-Powered Learning Path
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
                        Bangun Roadmap Belajar <br />
                        <span className="text-[#2443B0]">Yang Personal & Goat 🚀</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        Jawab beberapa pertanyaan singkat, lalu biarkan AI kami menyusun jalur belajar terstruktur yang dirancang khusus untuk mempercepat karirmu.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-4">
                    {[
                        { icon: Clock, label: "± 2-3 Menit Selesai", color: "text-blue-500" },
                        { icon: Cpu, label: "Powered by Gemma 3", color: "text-purple-500" },
                        { icon: Target, label: "Fokus ke Industri", color: "text-green-500" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100">
                            <item.icon className={cn("h-6 w-6", item.color)} />
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-8">
                    <Button
                        size="lg"
                        onClick={onNext}
                        className="h-14 px-10 rounded-full bg-[#D7FE44] text-[#1a1a1a] font-black text-lg hover:bg-[#c4ea3d] shadow-xl hover:scale-105 transition-all group cursor-pointer"
                    >
                        Mulai Sekarang
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
