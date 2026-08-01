import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  label: string;
  title?: string;
  suggestedSubject?: string;
  recommendedRatio?: string;
  altText?: string;
  className?: string;
}

export default function ImagePlaceholder({
  label,
  title,
  suggestedSubject,
  recommendedRatio,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[300px] bg-[var(--color-bg-light-dim)] border border-dashed border-[var(--color-border-dark)] rounded-xl flex flex-col items-center justify-center p-6 text-center overflow-hidden ${className}`}
      style={{
        aspectRatio: recommendedRatio ? recommendedRatio.replace(":", "/") : "auto",
      }}
    >
      <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-[var(--color-border-light)] max-w-sm w-full">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-bg-light)] mx-auto mb-4 text-[var(--color-text-muted)]">
            <ImageIcon size={24} />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-2">
            {label}
          </p>
          {title && (
            <h3 className="text-sm font-semibold text-[var(--color-text-dark)] mb-1">
              {title}
            </h3>
          )}
          {suggestedSubject && (
            <p className="text-xs text-[var(--color-text-dark-soft)] mb-3">
              {suggestedSubject}
            </p>
          )}
          {recommendedRatio && (
            <div className="inline-flex items-center justify-center px-2 py-1 rounded bg-[var(--color-bg-light)] text-[10px] font-medium text-[var(--color-text-muted)]">
              Ratio: {recommendedRatio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
