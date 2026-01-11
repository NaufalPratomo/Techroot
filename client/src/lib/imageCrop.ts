/**
 * Image Crop Utilities
 * Helper functions for cropping images
 */

export interface Area {
    x: number
    y: number
    width: number
    height: number
}

/**
 * Create cropped image from canvas
 */
export const createCroppedImage = async (
    imageSrc: string,
    pixelCrop: Area
): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        throw new Error('Failed to get canvas context')
    }

    // Set canvas size to match the cropped area
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // Draw the cropped image
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    // Convert canvas to base64
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                resolve('')
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                resolve(reader.result as string)
            }
            reader.readAsDataURL(blob)
        }, 'image/jpeg', 0.95)
    })
}

/**
 * Create image element from source
 */
const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.src = url
    })
}
