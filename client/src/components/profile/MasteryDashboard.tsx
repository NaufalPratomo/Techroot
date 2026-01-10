"use client"

import { Star, BookOpen, Zap, ShieldCheck, Flame } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { User, Badge, Progress as UserProgress } from "@/types"

interface MasteryDashboardProps {
    level: number
    xp: number
    progress: UserProgress | null
    badges?: Badge[]
    streak: number
}

export const MasteryDashboard = ({ level, xp, progress, badges, streak }: MasteryDashboardProps) => {
    return (
        <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-2xl p-8 sm:p-12 md:p-16 relative overflow-hidden group/mastery h-full">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2443B0]/5 rounded-full blur-[120px] -mr-32 -mt-32 group-hover/mastery:bg-[#2443B0]/10 transition-all duration-1000" />

            <div className="relative z-10 space-y-12 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row lg:items-center justify-between gap-10">
                    <div className="space-y-5">
                        <div className="inline-flex items-center px-5 py-2 rounded-full bg-blue-50 text-[#2443B0] text-xs font-black uppercase tracking-[0.3em] border border-blue-100">
                            Mastery Progress
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase italic">
                            Level {level} <br /> <span className="text-[#2443B0] not-italic">Dashboard</span>
                        </h3>
                        <p className="text-lg text-slate-500 font-bold max-w-sm leading-relaxed">
                            Terus belajar untuk menguasai teknologi terbaru di Techroot!
                        </p>
                    </div>
                    <div className="h-32 w-32 md:h-40 md:w-40 rounded-[2rem] bg-[#D7FE44] flex flex-col items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border-8 border-white flex-shrink-0">
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-[#1a1a1a]/40 mb-1">LV.</span>
                        <span className="text-5xl md:text-7xl font-black text-[#1a1a1a] leading-none tracking-tight">{level}</span>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6">
                        <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-2xl bg-slate-900 text-[#D7FE44] flex items-center justify-center font-black text-lg shadow-2xl shadow-slate-900/30 ring-4 ring-white">
                                #{level}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Target Level {level + 1}</span>
                                <span className="text-lg font-black text-slate-800 tracking-tight">
                                    <span className="text-[#2443B0] italic">{(xp || 0) % 200}</span> / 200 <span className="text-slate-400 text-sm">TOTAL XP</span>
                                </span>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-xs font-black text-[#2443B0] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                            <Star className="w-3 h-3 fill-current" /> SEDANG BERPROGRES
                        </div>
                    </div>

                    <div className="relative h-1 w-full">
                        <Progress
                            value={((xp || 0) % 200) / 2}
                            className="h-10 bg-transparent overflow-hidden"
                            indicatorClassName="bg-gradient-to-r from-[#2443B0] via-blue-500 to-[#D7FE44] rounded-full shadow-[0_0_30px_rgba(36,67,176,0.4)] transition-all duration-1000 ease-out"
                        />
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6 mt-auto">
                    {[
                        { icon: BookOpen, label: "Courses", val: progress?.completedModules?.length || 0, color: "text-blue-500" },
                        { icon: Zap, label: "Lessons", val: progress?.completedLessons?.length || 0, color: "text-yellow-500" },
                        { icon: ShieldCheck, label: "Certs", val: badges?.length || 0, color: "text-green-500" },
                        { icon: Flame, label: "Daily", val: streak > 5 ? "High" : "Mid", color: "text-orange-500" }
                    ].map((s, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-100 group/stat hover:bg-white hover:border-[#2443B0]/10 transition-all duration-500">
                            <s.icon className={`h-6 w-6 ${s.color} mb-4 transition-transform group-hover/stat:scale-110`} />
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">{s.val}</p>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
