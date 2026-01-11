import { ShieldCheck } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AvatarSelectionGridProps {
    avatarOptions: string[]
    selectedAvatar: string
    onSelectAvatar: (avatar: string) => void
    isVisible: boolean
}

export const AvatarSelectionGrid = ({
    avatarOptions,
    selectedAvatar,
    onSelectAvatar,
    isVisible,
}: AvatarSelectionGridProps) => {
    if (!isVisible) return null

    return (
        <div className="space-y-4">
            <Label className="text-sm font-black uppercase tracking-widest text-slate-400">
                Atau Pilih Avatar
            </Label>
            <div className="grid grid-cols-4 gap-3">
                {avatarOptions.map((avatarUrl, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => onSelectAvatar(avatarUrl)}
                        className={cn(
                            "relative aspect-square rounded-xl overflow-hidden border-3 transition-all hover:scale-105",
                            selectedAvatar === avatarUrl
                                ? "border-[#2443B0] bg-blue-50 shadow-lg shadow-[#2443B0]/10"
                                : "border-transparent bg-slate-50 hover:border-slate-200"
                        )}
                    >
                        <img
                            src={avatarUrl}
                            alt={`Avatar ${idx + 1}`}
                            className="w-full h-full object-cover p-0.5"
                        />
                        {selectedAvatar === avatarUrl && (
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
    )
}
