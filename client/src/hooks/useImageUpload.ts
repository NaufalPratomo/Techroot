import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { validateImageFile, convertImageToBase64 } from "@/lib/imageUpload"

export const useImageUpload = () => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file
        const validation = validateImageFile(file)
        if (!validation.isValid) {
            toast({
                variant: "destructive",
                title: "File Tidak Valid",
                description: validation.error,
            })
            return
        }

        setIsUploading(true)

        try {
            const base64String = await convertImageToBase64(file)
            setUploadedImage(base64String)
            setIsUploading(false)
            return base64String
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Gagal Upload",
                description: error instanceof Error ? error.message : "Terjadi kesalahan",
            })
            setIsUploading(false)
            return null
        }
    }

    const removeUploadedImage = () => {
        setUploadedImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return {
        uploadedImage,
        isUploading,
        fileInputRef,
        handleImageUpload,
        removeUploadedImage,
        triggerFileInput,
    }
}
