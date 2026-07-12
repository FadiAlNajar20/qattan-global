import Container from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface Props {
  missionEyebrow: string;
  missionTitle: string;
  missionBody: string;
  visionEyebrow: string;
  visionTitle: string;
  visionPoints: string[];
}

export default function MissionVision({
  missionEyebrow,
  missionTitle,
  missionBody,
  visionEyebrow,
  visionTitle,
  visionPoints,
}: Props) {
  return (
    <section className="bg-[var(--color-bg-primary)] relative overflow-hidden">
      {/* Subtle gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(200,191,176,0.06), transparent 70%)",
        }}
      />

      <Container className="section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border)]">
          {/* Mission */}
          <FadeIn className="lg:pe-16 pb-12 lg:pb-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              {missionEyebrow}
            </span>
            <h2 className="font-bold text-white text-[clamp(1.5rem,3vw,2.25rem)]  mt-4 mb-6 leading-tight text-balance">
              {missionTitle}
            </h2>
            <p className="text-white/90 leading-relaxed text-base">
              {missionBody}
            </p>
            {/* Decorative line */}
            <div className="mt-10 h-px w-16 bg-[var(--color-accent)] opacity-60" />
          </FadeIn>

          {/* Vision */}
          <FadeIn delay={0.15} className="lg:ps-16 pt-12 lg:pt-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              {visionEyebrow}
            </span>
            <h2 className="font-bold text-white text-[clamp(1.5rem,3vw,2.25rem)] mt-4 mb-8 leading-tight text-balance">
              {visionTitle}
            </h2>
            <ul className="space-y-4" role="list">
              {visionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
                  />
                  <p className="text-white/90 text-base leading-relaxed">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
