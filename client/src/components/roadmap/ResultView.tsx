"use client";

import React from "react";
import { Rocket, BookOpen, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RoadmapData, RoadmapNode } from "@/types/roadmap";

interface ResultViewProps {
    roadmapData: RoadmapData | null;
    onReset: () => void;
    onViewTopicDetail: (node: RoadmapNode, tab: "resources" | "tutor") => void;
}

export const ResultView = ({ roadmapData, onReset, onViewTopicDetail }: ResultViewProps) => {
    return (
        <div className="w-full py-8 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2443B0]/10 text-[#2443B0] text-sm font-bold">
                    <Rocket className="h-4 w-4 mr-2" />
                    Roadmap Berhasil Dibuat
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">Jalur Belajar Personal Kamu</h2>
                <p className="text-lg text-slate-500 max-w-3xl font-medium leading-relaxed">
                    {roadmapData?.overview || "Berikut adalah struktur pembelajaran yang kami rekomendasikan berdasarkan profilmu."}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {roadmapData?.nodes.map((node, idx) => {
                    const isCheckpoint = node.type === "checkpoint";
                    return (
                        <div
                            key={node.id}
                            className={cn(
                                "group relative overflow-hidden bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-xl",
                                isCheckpoint ? "border-[#D7FE44] bg-[#D7FE44]/5" : "border-slate-100"
                            )}
                        >
                            <div className="p-8 space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-xl font-black text-sm",
                                            isCheckpoint ? "bg-[#D7FE44] text-[#1a1a1a]" : "bg-[#2443B0] text-white"
                                        )}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <Badge variant="outline" className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest",
                                                isCheckpoint ? "border-[#D7FE44] text-[#1a1a1a]" : "border-slate-200 text-slate-400"
                                            )}>
                                                {isCheckpoint ? "Checkpoint: Project" : `Fase ${idx + 1}`}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-full h-9 px-4 text-xs font-bold border border-slate-100 bg-white hover:bg-slate-50 cursor-pointer"
                                            onClick={() => onViewTopicDetail(node, "resources")}
                                        >
                                            <BookOpen className="h-3.5 w-3.5 mr-2" />
                                            Detail Materi
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="rounded-full h-9 px-4 text-xs font-bold bg-[#2443B0] text-white hover:bg-[#1a36a9] cursor-pointer"
                                            onClick={() => onViewTopicDetail(node, "tutor")}
                                        >
                                            <Sparkles className="h-3.5 w-3.5 mr-2" />
                                            AI Tutor
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#2443B0] transition-colors">
                                        {node.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed max-w-4xl">
                                        {node.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 flex items-center justify-center border-t border-slate-100 pt-10">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={onReset}
                    className="h-14 px-8 rounded-full border-slate-200 text-slate-600 font-bold hover:bg-slate-50 gap-2 cursor-pointer"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Mulai Ulang Builder
                </Button>
            </div>
        </div>
    );
};
