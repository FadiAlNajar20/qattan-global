import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center text-center px-6">
      <Image
        src="/images/logo.webp"
        alt="Qattan Global"
        width={160}
        height={48}
        className="mb-12 brightness-0 invert opacity-60"
        style={{ width: "auto", height: "auto" }}
      />
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
        404
      </p>
      <h1 className="font-bold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-tight mb-6">
        Page not found.
      </h1>
      <p className="text-white/90 text-lg max-w-md mb-10">
        The page you&#39;re looking for doesn&#39;t exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/en"
          className="px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-text-dark)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Return home (EN)
        </Link>
        <Link
          href="/ar"
          className="px-6 py-3 border border-white/20 text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
        >
          العودة للرئيسية (AR)
        </Link>
      </div>
    </div>
  );
}
