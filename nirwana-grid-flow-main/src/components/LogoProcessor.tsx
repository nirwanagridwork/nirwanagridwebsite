import React, { useState, useEffect } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to download models
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting background removal process...');
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });
    
    // Convert HTMLImageElement to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize image if needed and draw it to canvas
    const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
    
    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    console.log('Image converted to base64');
    
    // Process the image with the segmentation model
    console.log('Processing with segmentation model...');
    const result = await segmenter(imageData);
    
    console.log('Segmentation result:', result);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Create a new canvas for the masked image
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(canvas, 0, 0);
    
    // Apply the mask
    const outputImageData = outputCtx.getImageData(
      0, 0,
      outputCanvas.width,
      outputCanvas.height
    );
    const data = outputImageData.data;
    
    // Apply inverted mask to alpha channel
    for (let i = 0; i < result[0].mask.data.length; i++) {
      // Invert the mask value (1 - value) to keep the subject instead of the background
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('Mask applied successfully');
    
    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) {
            console.log('Successfully created final blob');
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

interface LogoProcessorProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LogoProcessor: React.FC<LogoProcessorProps> = ({ className = '', size = 'md' }) => {
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-16 w-auto'
  };

  useEffect(() => {
    const processLogo = async () => {
      try {
        setIsProcessing(true);
        setError(null);

        // Load the original logo
        const response = await fetch('/src/assets/logo-original-bg.png');
        const blob = await response.blob();
        const imageElement = await loadImage(blob);

        // Remove background
        const processedBlob = await removeBackground(imageElement);
        const processedUrl = URL.createObjectURL(processedBlob);
        
        setProcessedLogo(processedUrl);
        
        // Store in localStorage for other components to use
        localStorage.setItem('processedLogoUrl', processedUrl);

      } catch (err) {
        console.error('Error processing logo:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        // Use fallback logo
        setProcessedLogo('/src/assets/logo-original-bg.png');
      } finally {
        setIsProcessing(false);
      }
    };

    // Check if we already have a processed logo
    const existingLogo = localStorage.getItem('processedLogoUrl');
    if (existingLogo) {
      setProcessedLogo(existingLogo);
    } else {
      processLogo();
    }
  }, []);

  if (isProcessing) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="text-sm">Processing...</span>
      </div>
    );
  }

  return (
    <div className={`logo-container ${className}`}>
      <img 
        src={processedLogo || '/src/assets/logo-original-bg.png'} 
        alt="NirwanaGrid Logo" 
        className={`${sizeClasses[size]} object-contain transition-all duration-300 hover:scale-105`}
      />
    </div>
  );
};

export default LogoProcessor;
