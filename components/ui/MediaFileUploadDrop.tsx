"use client";

import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type MediaUploadDropperProps = {
  value?: File | { url: string; type: string }; // uploaded image URL
  onUpload: (file: File) => Promise<string>; // must return URL
  onChange: (file: File | null) => void;
  accept?: string[];
  maxSizeMB?: number;
  className?: string;
};

export default function MediaUploadDropper({
  value,
  onUpload,
  onChange,
  accept = ["image/png", "image/jpeg", "image/webp"],
  maxSizeMB = 5,
  className,
}: MediaUploadDropperProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateFile = (file: File) => {
    if (!accept.includes(file.type)) {
      toast.error("Invalid file type");
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File must be under ${maxSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleUpload = async (file: File) => {
    if (!validateFile(file)) return;

    try {
      setLoading(true);
      onChange(file);
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) await handleUpload(file);
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
          <img
            src={value instanceof File ? URL.createObjectURL(value) : value.url}
            alt="Uploaded media"
            className="object-cover"
          />

          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/30",
            loading && "opacity-60 pointer-events-none"
          )}
        >
          <UploadCloud className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-muted-foreground">
            {accept.join(", ")} · max {maxSizeMB}MB
          </p>

          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept={accept.join(",")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
        </div>
      )}
    </div>
  );
}
