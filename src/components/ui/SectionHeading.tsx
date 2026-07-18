import { clsx } from "clsx";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  light = false,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "space-y-4",
        align === "center" && "text-center mx-auto max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            "text-xs font-semibold uppercase tracking-widest",
            light
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-text-muted)]",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "font-bold leading-tight text-balance",
          "text-[clamp(1.5rem,3.5vw,2.25rem)]",
          light ? "text-white" : "text-[var(--color-text-dark-deep)]",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "text-base leading-relaxed",
            light ? "text-white/90" : "text-[var(--color-text-dark-soft)]",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
