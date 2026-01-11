"use client"

import { Activity, Target, Award, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Badge } from "@/types"

interface StatusCardProps {
    badges?: Badge[]
    onEditClick: () => void
    onLogout: () => void
}

export const StatusCard = ({ badges, onEditClick, onLogout }: StatusCardProps) => {
    return (
        <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl overflow-hidden group flex-grow flex flex-col">
            <div className="p-8 flex flex-col h-full space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black tracking-tight">Status Belajar</h3>
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                        <Activity className="w-5 h-5" />
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white transition-all cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="h-11 w-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                <Target className="h-6 w-6 text-[#2443B0]" />
                            </div>
                            <span className="font-black text-slate-600">Leaderboard</span>
                        </div>
                        <span className="font-black text-[#2443B0] text-xl">Top 5%</span>
                    </div>
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white transition-all cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="h-11 w-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                <Award className="h-6 w-6 text-green-500" />
                            </div>
                            <span className="font-black text-slate-600">Sertifikat</span>
                        </div>
                        <span className="font-black text-slate-900 text-xl">{badges?.length || 0}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 flex flex-col gap-4">
                    <Button
                        onClick={onLogout}
                        variant="ghost"
                        className="w-full rounded-2xl h-14 font-black cursor-pointer text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 transition-all gap-3"
                    >
                        <LogOut className="h-5 w-5" /> Keluar Akun
                    </Button>
                </div>
            </div>
        </div>
    )
}
