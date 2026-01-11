import { User as UserIcon, School } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileFormData } from "@/types"

interface ProfileInputFieldsProps {
    formData: ProfileFormData
    onChange: (field: keyof ProfileFormData, value: string) => void
}

export const ProfileInputFields = ({ formData, onChange }: ProfileInputFieldsProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-black uppercase tracking-widest text-slate-400">
                    Nama Lengkap
                </Label>
                <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => onChange('name', e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-slate-100 focus:border-[#2443B0] focus:ring-0 transition-all font-bold"
                        placeholder="Masukkan nama Anda"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="institution" className="text-sm font-black uppercase tracking-widest text-slate-400">
                    Institusi / Universitas
                </Label>
                <div className="relative">
                    <School className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        id="institution"
                        value={formData.institution}
                        onChange={(e) => onChange('institution', e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-slate-100 focus:border-[#2443B0] focus:ring-0 transition-all font-bold"
                        placeholder="Nama Sekolah atau Universitas"
                    />
                </div>
            </div>
        </div>
    )
}
