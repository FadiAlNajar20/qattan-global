import { FadeIn } from "../motion/FadeIn";
import Container from "../ui/Container";

interface SisterCompanyProps {
  content: {
    title: string;
    name: string;
    description: string;
  };
}

export default function SisterCompany({ content }: SisterCompanyProps) {
  return (
    <section className="bg-[var(--color-bg-light)]">
      <Container className="section-spacing">
        <FadeIn className="max-w-3xl mx-auto text-center bg-[var(--color-bg-light)] p-10 md:p-16 rounded-2xl shadow-sm border border-[var(--color-border-light)]">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-accent)] mb-4">
            {content.title}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text-dark)] mb-6">
            {content.name}
          </h3>
          <p className="text-lg text-[var(--color-text-dark-soft)] leading-relaxed">
            {content.description}
          </p>
          {/* TODO: Verify sister-company name, logo, founding information, and description from the approved company profile. */}
          {/* Await verified logo before displaying it here */}
        </FadeIn>
      </Container>
    </section>
  );
}
