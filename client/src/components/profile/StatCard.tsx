"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
    icon: LucideIcon
    value: string | number
    label: string
    variant?: "blue" | "orange"
}

export const StatCard = ({ icon: Icon, value, label, variant = "blue" }: StatCardProps) => {
    const variants = {
        blue: "hover:border-[#2443B0]/20 bg-blue-50 text-[#2443B0] group-hover:bg-[#2443B0]",
        orange: "hover:border-orange-200 bg-orange-50 text-orange-600 group-hover:bg-orange-500"
    }

    return (
        <div className={cn(
            "bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4 group transition-all duration-500 hover:shadow-2xl",
            variant === "blue" ? "hover:border-[#2443B0]/20" : "hover:border-orange-200"
        )}>
            <div className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center transition-all shadow-inner",
                variant === "blue" ? "bg-blue-50 text-[#2443B0] group-hover:bg-[#2443B0] group-hover:text-white" : "bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
            )}>
                <Icon className="h-8 w-8" />
            </div>
            <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 leading-none">
                    {value}
                </p>
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    {label}
                </p>
            </div>
        </div>
    )
}
