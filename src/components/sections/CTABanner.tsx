import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Locale } from "@/types";

interface Props {
  locale: Locale;
  title: string;
  body: string;
  button: string;
}

export default function CTABanner({ locale, title, body, button }: Props) {
  return (
    <section className="bg-[var(--color-bg-light)] relative overflow-hidden">
      {/* Decorative element */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200,191,176,0.08), transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />

      <Container className="section-spacing text-center">
        <FadeIn>
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-bold text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-tight">
              {title}
            </h2>
            <p className="text-base leading-relaxed">{body}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[var(--color-accent)] transition-colors duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              <span>{button}</span>
              <ArrowRight size={16} aria-hidden="true" className="icon-dir" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
