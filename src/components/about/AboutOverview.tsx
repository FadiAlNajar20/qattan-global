"use client";

import Container from "../ui/Container";
import { FadeIn } from "../motion/FadeIn";

interface AboutOverviewProps {
  content: {
    introduction: string;
    facts: string[];
  };
}

export default function AboutOverview({ content }: AboutOverviewProps) {
  return (
    <section className="bg-[var(--color-bg-light)] relative overflow-hidden py-24 md:py-32">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Introduction */}
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="w-12 md:w-16 h-[2px] bg-[var(--color-accent)] mb-8 opacity-80" />
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif text-[var(--color-text-dark)] leading-[1.4] text-balance">
                {content.introduction}
              </h2>
            </FadeIn>
          </div>

          {/* Right Side: Fact Cards */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {content.facts.map((fact, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-[var(--color-bg-light-dim)] p-8 rounded-2xl border border-[var(--color-border-light)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-[var(--color-accent)]/30 overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/0 to-[var(--color-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-bg-light)] border border-[var(--color-border-light)] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:border-[var(--color-accent)]/40">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <p className="text-lg font-medium text-[var(--color-text-muted)] leading-relaxed group-hover:text-[var(--color-text-dark)] transition-colors duration-300">
                        {fact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  );
}
