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
    <section className="bg-[var(--color-bg-primary)] relative overflow-hidden">
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
            <h2 className="font-bold text-white text-[clamp(1.75rem, 3.5vw, 2.75rem)] text-balance leading-tight">
              {title}
            </h2>
            <p className="text-white/90 text-base leading-relaxed">{body}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-text-primary)] text-[var(--color-text-dark)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            >
              {button}
              <ArrowRight size={16} aria-hidden="true" className="icon-dir" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
