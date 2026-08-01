import { FadeIn, StaggerChildren, FadeInStaggerItem } from "../motion/FadeIn";
import Container from "../ui/Container";

interface VisionItem {
  number: string;
  title: string;
  description: string;
}

interface MissionVisionProps {
  content: {
    mission: {
      headline: string;
      paragraph: string;
    };
    vision: VisionItem[];
  };
}

export default function MissionVision({ content }: MissionVisionProps) {
  return (
    <section className="bg-[var(--color-bg-light-dim)]">
      <Container className="section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Mission */}
          <FadeIn>
            <div className="bg-[var(--color-bg-light)] p-8 md:p-12 rounded-2xl shadow-sm border border-[var(--color-border-light)] h-full flex flex-col justify-center">
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[var(--color-text-dark)] mb-6">
                {content.mission.headline}
              </h2>
              <div className="w-12 h-1 bg-[var(--color-accent)] mb-8" />
              <p className="text-[var(--color-text-dark-soft)] text-lg md:text-xl leading-relaxed">
                {content.mission.paragraph}
              </p>
            </div>
          </FadeIn>

          {/* Vision */}
          <div className="flex flex-col justify-center">
            <StaggerChildren className="space-y-6">
              {content.vision.map((item, idx) => (
                <FadeInStaggerItem
                  key={idx}
                  className="flex items-start gap-6 bg-[var(--color-bg-light)] p-6 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-accent)] transition-colors"
                >
                  <span className="text-3xl font-bold text-[var(--color-bg-light-dim)]">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-text-dark-soft)] text-base">
                      {item.description}
                    </p>
                  </div>
                </FadeInStaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </Container>
    </section>
  );
}
