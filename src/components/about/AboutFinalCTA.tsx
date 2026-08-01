import { FadeIn } from "../motion/FadeIn";
import Container from "../ui/Container";
import { ButtonLight } from "../ui/Button";

interface AboutFinalCTAProps {
  content: {
    headline: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
  };
  locale: string;
}

export default function AboutFinalCTA({ content, locale }: AboutFinalCTAProps) {
  return (
    <section className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(200,191,176,0.1), transparent 60%)",
        }}
      />
      <Container>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 leading-tight">
              {content.headline}
            </h2>
            <p className="text-xl text-[var(--color-text-primary)]/80 mb-10 max-w-2xl mx-auto">
              {content.supportingText}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ButtonLight href={`/${locale}/contact`} size="lg">
                {content.primaryCta}
              </ButtonLight>
              <ButtonLight
                href={`/${locale}/global-partnerships`}
                variant="outline"
                size="lg"
              >
                {content.secondaryCta}
              </ButtonLight>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
