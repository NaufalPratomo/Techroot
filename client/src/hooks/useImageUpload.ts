import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { validateImageFile, convertImageToBase64 } from "@/lib/imageUpload"

export const useImageUpload = () => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [tempImageForCrop, setTempImageForCrop] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [showCropDialog, setShowCropDialog] = useState(false)
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
            // Set temp image and show crop dialog
            setTempImageForCrop(base64String)
            setShowCropDialog(true)
            setIsUploading(false)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Gagal Upload",
                description: error instanceof Error ? error.message : "Terjadi kesalahan",
            })
            setIsUploading(false)
        }
    }

    const handleCropComplete = (croppedImage: string) => {
        setUploadedImage(croppedImage)
        setTempImageForCrop(null)
        setShowCropDialog(false)
    }

    const handleCropCancel = () => {
        setTempImageForCrop(null)
        setShowCropDialog(false)
        // Clear file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
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
        tempImageForCrop,
        isUploading,
        showCropDialog,
        fileInputRef,
        handleImageUpload,
        handleCropComplete,
        handleCropCancel,
        removeUploadedImage,
        triggerFileInput,
    }
}
