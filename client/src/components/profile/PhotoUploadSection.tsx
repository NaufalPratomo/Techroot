import { Upload, Loader2, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { getInitials } from "@/lib/helpers"

interface PhotoUploadSectionProps {
    userName: string
    currentAvatar: string
    uploadedImage: string | null
    isUploading: boolean
    onUploadClick: () => void
    onRemoveClick: () => void
}

export const PhotoUploadSection = ({
    userName,
    currentAvatar,
    uploadedImage,
    isUploading,
    onUploadClick,
    onRemoveClick,
}: PhotoUploadSectionProps) => {
    return (
        <div className="space-y-4">
            <Label className="text-sm font-black uppercase tracking-widest text-slate-400">
                Foto Profil
            </Label>

            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 ring-4 ring-slate-100">
                    <AvatarImage src={uploadedImage || currentAvatar} alt={userName} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xl font-bold">
                        {getInitials(userName)}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onUploadClick}
                            disabled={isUploading}
                            className="flex-1 rounded-xl border-2 hover:border-[#2443B0] hover:text-[#2443B0] transition-all"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Foto
                                </>
                            )}
                        </Button>
                        {uploadedImage && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={onRemoveClick}
                                className="rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    <p className="text-xs text-slate-500">
                        JPG, PNG, atau GIF. Maksimal 5MB.
                    </p>
                </div>
            </div>
        </div>
    )
}
