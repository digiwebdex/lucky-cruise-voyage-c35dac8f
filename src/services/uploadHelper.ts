// ============================================
// Upload Helper — Uses VPS API in production, Base64 fallback in preview
// ============================================

import { apiUploadFile, isApiMode } from "./apiSync";

/**
 * Upload a single file. In production, uploads to VPS /uploads/ directory.
 * In preview, falls back to Base64 data URL.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImage(file: File): Promise<string> {
  if (isApiMode()) {
    const result = await apiUploadFile(file);
    return result.url;
  }
  // Preview fallback: Base64
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

/**
 * Upload multiple files. Returns array of public URLs.
 */
export async function uploadImages(files: File[]): Promise<string[]> {
  return Promise.all(files.map(uploadImage));
}
