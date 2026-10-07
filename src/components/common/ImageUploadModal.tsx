import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, ZoomIn, ZoomOut, RotateCw, Trash2, Check, AlertCircle } from 'lucide-react';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  currentImage?: string | null;
  shape?: 'circle' | 'square';
  onSave: (imageDataUrl: string) => Promise<void> | void;
  onRemove?: () => Promise<void> | void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle = 'Accepts JPG, PNG, and WEBP (Max 8MB)',
  currentImage,
  shape = 'circle',
  onSave,
  onRemove,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setImageSrc(null);
      setZoom(1);
      setRotation(0);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    setError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image file size must be less than 8MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setZoom(1);
      setRotation(0);
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyCrop = async () => {
    if (!imageSrc) return;
    setLoading(true);
    try {
      // Offscreen canvas processing
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image preview for processing'));
      });

      const outputSize = 256;
      const canvas = document.createElement('canvas');
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas 2D context not supported');
      }

      ctx.clearRect(0, 0, outputSize, outputSize);
      ctx.save();
      // Move to center of canvas
      ctx.translate(outputSize / 2, outputSize / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Draw image centered
      const aspect = img.width / img.height;
      let drawW = outputSize;
      let drawH = outputSize;
      if (aspect > 1) {
        drawW = outputSize * aspect;
      } else {
        drawH = outputSize / aspect;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      // Export as compact WebP or JPEG
      const finalDataUrl = canvas.toDataURL('image/jpeg', 0.88);
      await onSave(finalDataUrl);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to process and save image.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (onRemove) {
      setLoading(true);
      try {
        await onRemove();
        onClose();
      } catch (err: any) {
        setError(err.message || 'Failed to remove image.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden text-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">{title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {!imageSrc ? (
            /* Upload Drop Area */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${
                dragOver
                  ? 'border-indigo-500 bg-indigo-50/40'
                  : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/60'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-2xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Click to browse or drag and drop
                </p>
                <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, or WEBP up to 8MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            /* Preview & Crop Controls */
            <div className="space-y-4">
              <div className="flex items-center justify-center bg-slate-100/80 rounded-xl p-4 border border-slate-200 overflow-hidden relative">
                <div
                  className={`w-48 h-48 overflow-hidden relative border-2 border-indigo-500 shadow-md ${
                    shape === 'circle' ? 'rounded-full' : 'rounded-xl'
                  }`}
                >
                  <img
                    ref={imageElementRef}
                    src={imageSrc}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transformOrigin: 'center center',
                    }}
                  />
                </div>
              </div>

              {/* Sliders and adjustment controls */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5 text-slate-400" /> Zoom & Scale
                  </span>
                  <span className="font-mono text-[11px]">{Math.round(zoom * 100)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <ZoomOut className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <ZoomIn className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setRotation((prev) => (prev + 90) % 360)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
                  >
                    <RotateCw className="w-3.5 h-3.5" /> Rotate 90°
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageSrc(null);
                      setZoom(1);
                      setRotation(0);
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Choose different file
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div>
            {currentImage && onRemove && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 transition disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Photo
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
            >
              Cancel
            </button>
            {imageSrc && (
              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
                {loading ? 'Processing...' : 'Apply & Save'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
