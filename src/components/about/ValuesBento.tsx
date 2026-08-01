import { FadeIn, StaggerChildren, FadeInStaggerItem } from "../motion/FadeIn";
import Container from "../ui/Container";

interface ValueItem {
  title: string;
  description: string;
}

interface ValuesBentoProps {
  content: ValueItem[];
}

export default function ValuesBento({ content }: ValuesBentoProps) {
  // Creating a distinct layout pattern for the 5 values
  return (
    <section className="bg-[var(--color-bg-light)]">
      <Container className="section-spacing">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-text-dark)] mb-4">
              Our Values
            </h2>
            <div className="w-16 h-1 bg-[var(--color-accent)] mx-auto rounded-full" />
          </FadeIn>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Large */}
          <FadeInStaggerItem className="md:col-span-2 bg-[var(--color-bg-primary)] p-8 md:p-10 rounded-2xl text-[var(--color-text-primary)]">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-accent)]">
              {content[0].title}
            </h3>
            <p className="text-lg text-[var(--color-text-primary)]/90 leading-relaxed max-w-xl">
              {content[0].description}
            </p>
          </FadeInStaggerItem>

          {/* Card 2 */}
          <FadeInStaggerItem className="md:col-span-1 bg-[var(--color-bg-light-dim)] p-8 md:p-10 rounded-2xl border border-[var(--color-border-light)] hover:border-[var(--color-accent)] transition-colors">
            <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-3">
              {content[1].title}
            </h3>
            <p className="text-[var(--color-text-dark-soft)] leading-relaxed">
              {content[1].description}
            </p>
          </FadeInStaggerItem>

          {/* Card 3 */}
          <FadeInStaggerItem className="md:col-span-1 bg-[var(--color-bg-light-dim)] p-8 md:p-10 rounded-2xl border border-[var(--color-border-light)] hover:border-[var(--color-accent)] transition-colors">
            <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-3">
              {content[2].title}
            </h3>
            <p className="text-[var(--color-text-dark-soft)] leading-relaxed">
              {content[2].description}
            </p>
          </FadeInStaggerItem>

          {/* Card 4 - Large */}
          <FadeInStaggerItem className="md:col-span-2 bg-[var(--color-bg-light)] p-8 md:p-10 rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">
              {content[3].title}
            </h3>
            <p className="text-lg text-[var(--color-text-dark-soft)] leading-relaxed">
              {content[3].description}
            </p>
          </FadeInStaggerItem>

          {/* Card 5 - Full Width */}
          <FadeInStaggerItem className="md:col-span-3 bg-[var(--color-accent)]/10 p-8 md:p-10 rounded-2xl border border-[var(--color-accent)]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">
                {content[4].title}
              </h3>
              <p className="text-lg text-[var(--color-text-dark-soft)] leading-relaxed">
                {content[4].description}
              </p>
            </div>
          </FadeInStaggerItem>
        </StaggerChildren>
      </Container>
    </section>
  );
}
