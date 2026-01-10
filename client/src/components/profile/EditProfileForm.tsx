"use client"

import { useState } from "react"
import { User as UserIcon, School, ShieldCheck, Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import type { User } from "@/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AVATAR_OPTIONS } from "@/constants/profile"

interface EditProfileFormProps {
    user: User
    onUpdateSuccess: (updatedUser: User) => void
    onClose: () => void
}

export const EditProfileForm = ({ user, onUpdateSuccess, onClose }: EditProfileFormProps) => {
    const [formData, setFormData] = useState({
        name: user.name,
        institution: user.institution || "",
        avatar: user.avatar || AVATAR_OPTIONS[0],
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const response = await api<{ success: boolean; message: string; data: { user: User } }>("/api/auth/update", {
                method: "PUT",
                body: formData,
            })

            if (response.success) {
                onUpdateSuccess(response.data.user)
                toast({
                    title: "Berhasil!",
                    description: "Profil Anda telah diperbarui.",
                })
                onClose()
            } else {
                toast({
                    variant: "destructive",
                    title: "Gagal",
                    description: response.message || "Gagal memperbarui profil.",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Kesalahan",
                description: "Terjadi kesalahan sistem.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pt-4">
            {/* Avatar Selection */}
            <div className="space-y-4">
                <Label className="text-sm font-black uppercase tracking-widest text-slate-400">Pilih Avatar</Label>
                <div className="grid grid-cols-4 gap-4">
                    {AVATAR_OPTIONS.map((avatarUrl, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData({ ...formData, avatar: avatarUrl })}
                            className={cn(
                                "relative aspect-square rounded-2xl overflow-hidden border-4 transition-all hover:scale-105",
                                formData.avatar === avatarUrl
                                    ? "border-[#2443B0] bg-blue-50 shadow-lg shadow-[#2443B0]/10"
                                    : "border-transparent bg-slate-50 hover:border-slate-200"
                            )}
                        >
                            <img
                                src={avatarUrl}
                                alt={`Avatar ${idx}`}
                                className="w-full h-full object-cover p-1"
                            />
                            {formData.avatar === avatarUrl && (
                                <div className="absolute inset-0 bg-[#2443B0]/10 flex items-center justify-center">
                                    <div className="bg-[#2443B0] text-white rounded-full p-1">
                                        <ShieldCheck className="w-3 h-3" />
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-black uppercase tracking-widest text-slate-400">Nama Lengkap</Label>
                    <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-12 h-14 rounded-2xl border-2 border-slate-100 focus:border-[#2443B0] focus:ring-0 transition-all font-bold"
                            placeholder="Masukkan nama Anda"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="institution" className="text-sm font-black uppercase tracking-widest text-slate-400">Institusi / Universitas</Label>
                    <div className="relative">
                        <School className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            id="institution"
                            value={formData.institution}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            className="pl-12 h-14 rounded-2xl border-2 border-slate-100 focus:border-[#2443B0] focus:ring-0 transition-all font-bold"
                            placeholder="Nama Sekolah atau Universitas"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl bg-[#2443B0] hover:bg-[#1a36a9] text-white font-black shadow-xl shadow-[#2443B0]/20 transition-all gap-3"
                >
                    {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                    Simpan Perubahan
                </Button>
            </div>
        </form>
    )
}
