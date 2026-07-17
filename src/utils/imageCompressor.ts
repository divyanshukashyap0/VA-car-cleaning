/**
 * Image Compressor Utility using HTML5 Canvas.
 * Resizes large user uploaded photos to a specified max dimension and compresses
 * the file size (e.g. from 10MB down to ~200KB) before uploading to Cloudinary / DB.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: string;
}

export interface CompressionResult {
  compressedFile: File;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.75,
    mimeType = "image/jpeg"
  } = options;

  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        resolve({
          compressedFile: file,
          dataUrl,
          originalSize: file.size,
          compressedSize: file.size,
          reductionPercentage: 0
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      // Maintain aspect ratio while bounding dimensions
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get 2D canvas context"));
        return;
      }

      // Smooth rendering setup
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL(mimeType, quality);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob failed"));
            return;
          }

          const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
            type: mimeType,
            lastModified: Date.now()
          });

          const reductionPercentage = Math.max(0, Math.round((1 - blob.size / file.size) * 100));

          console.log(
            `🚀 Canvas Image Compressor: ${(file.size / 1024).toFixed(1)} KB → ${(blob.size / 1024).toFixed(1)} KB (${reductionPercentage}% reduced)`
          );

          resolve({
            compressedFile,
            dataUrl,
            originalSize: file.size,
            compressedSize: blob.size,
            reductionPercentage
          });
        },
        mimeType,
        quality
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}
