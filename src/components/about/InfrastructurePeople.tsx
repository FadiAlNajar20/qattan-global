import { FadeIn } from "../motion/FadeIn";
import Container from "../ui/Container";
import Image from "next/image";

interface InfrastructurePeopleProps {
  content: {
    title: string;
    description: string;
  };
}

export default function InfrastructurePeople({
  content,
}: InfrastructurePeopleProps) {
  return (
    <section className="bg-[var(--color-bg-light-dim)]">
      <Container className="section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn className="order-2 lg:order-1">
            <Image
              className="rounded-2xl h-[400px]"
              src="/images/employee.webp"
              alt=""
              width={2000}
              height={400}
            />
          </FadeIn>
          <FadeIn className="order-1 lg:order-2">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[var(--color-text-dark)] mb-6">
              {content.title}
            </h2>
            <div className="w-12 h-1 bg-[var(--color-accent)] mb-8" />
            <p className="text-[var(--color-text-dark-soft)] text-lg leading-relaxed">
              {content.description}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
