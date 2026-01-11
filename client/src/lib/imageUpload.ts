/**
 * Image Upload Utilities
 * Helper functions for handling profile image uploads
 */

export const IMAGE_UPLOAD_CONFIG = {
    MAX_SIZE: 5 * 1024 * 1024,
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
} as const;

export interface ImageValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Validate image file type and size
 */
export const validateImageFile = (file: File): ImageValidationResult => {
    // Check file type
    if (!file.type.startsWith('image/')) {
        return {
            isValid: false,
            error: 'Harap pilih file gambar (JPG, PNG, GIF, dll.)',
        };
    }

    // Check file size
    if (file.size > IMAGE_UPLOAD_CONFIG.MAX_SIZE) {
        return {
            isValid: false,
            error: 'Ukuran file maksimal 5MB',
        };
    }

    return { isValid: true };
};

/**
 * Convert image file to base64 string
 */
export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result as string);
        };

        reader.onerror = () => {
            reject(new Error('Gagal membaca file'));
        };

        reader.readAsDataURL(file);
    });
};
