"use client"

import { Camera, Crown } from "lucide-react"
import { getInitials } from "@/lib/helpers"
import type { User } from "@/types"

interface ProfileBannerProps {
    user: User
    onEditClick: () => void
}

export const ProfileBanner = ({ user, onEditClick }: ProfileBannerProps) => {
    return (
        <div className="container max-w-7xl mx-auto px-4">
            <div className="relative">
                <div className="h-64 sm:h-80 md:min-h-[400px] w-full rounded-3xl bg-[#2443B0] overflow-hidden shadow-2xl relative flex flex-col items-center justify-center text-center px-4 py-12 md:py-20">
                    {/* Patterns */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />

                    {/* Avatar */}
                    <div className="relative z-10 mb-6">
                        <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-3xl bg-white p-2 shadow-2xl ring-8 ring-white/10 transition-all duration-700 hover:scale-105 group relative">
                            <div className="h-full w-full rounded-2xl overflow-hidden relative bg-slate-50 flex items-center justify-center border border-slate-100 italic transition-transform group-hover:rotate-2">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl sm:text-6xl md:text-8xl font-black text-[#2443B0] tracking-tighter drop-shadow-sm">
                                        {getInitials(user.name)}
                                    </span>
                                )}
                            </div>
                            <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-2xl bg-[#D7FE44] border-4 border-white flex items-center justify-center text-[#1a1a1a] shadow-xl animate-bounce-slow z-20">
                                <Crown className="w-6 h-6" />
                            </div>
                            <button
                                onClick={onEditClick}
                                className="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center text-white"
                            >
                                <Camera className="w-8 h-8" />
                            </button>
                        </div>
                    </div>

                    {/* User Name & Email */}
                    <div className="relative z-10 space-y-2">
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-lg">
                            {user.name}
                        </h1>
                        <p className="text-white/60 text-lg sm:text-xl md:text-2xl font-bold italic tracking-tight bg-white/5 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
