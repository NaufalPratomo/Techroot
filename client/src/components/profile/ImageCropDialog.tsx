"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ZoomIn, ZoomOut, Check, X } from "lucide-react"
import { createCroppedImage, type Area } from "@/lib/imageCrop"

interface ImageCropDialogProps {
    open: boolean
    imageSrc: string
    onCropComplete: (croppedImage: string) => void
    onClose: () => void
}

export const ImageCropDialog = ({ open, imageSrc, onCropComplete, onClose }: ImageCropDialogProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [isCropping, setIsCropping] = useState(false)

    const onCropChange = (location: { x: number; y: number }) => {
        setCrop(location)
    }

    const onZoomChange = (zoom: number) => {
        setZoom(zoom)
    }

    const onCropCompleteCallback = useCallback(
        (_croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels)
        },
        []
    )

    const handleCropConfirm = async () => {
        if (!croppedAreaPixels) return

        setIsCropping(true)
        try {
            const croppedImage = await createCroppedImage(imageSrc, croppedAreaPixels)
            onCropComplete(croppedImage)
            onClose()
        } catch (error) {
            console.error('Crop error:', error)
        } finally {
            setIsCropping(false)
        }
    }

    const handleClose = () => {
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-2xl font-black text-[#2443B0]">
                        Sesuaikan Foto Profil
                    </DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Geser dan zoom untuk menyesuaikan foto Anda
                    </DialogDescription>
                </DialogHeader>

                {/* Crop Area */}
                <div className="relative w-full h-[400px] bg-slate-900">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropCompleteCallback}
                    />
                </div>

                {/* Controls */}
                <div className="p-6 space-y-6">
                    {/* Zoom Slider */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                            <div className="flex items-center gap-2">
                                <ZoomOut className="h-4 w-4" />
                                <span>Zoom</span>
                            </div>
                            <ZoomIn className="h-4 w-4" />
                        </div>
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) => setZoom(value[0])}
                            className="w-full"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="flex-1 h-12 rounded-xl border-2"
                            disabled={isCropping}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Batal
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCropConfirm}
                            disabled={isCropping}
                            className="flex-1 h-12 rounded-xl bg-[#2443B0] hover:bg-[#1a36a9] text-white font-bold"
                        >
                            {isCropping ? (
                                <>Memproses...</>
                            ) : (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Terapkan
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
