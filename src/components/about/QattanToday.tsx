import { FadeIn, StaggerChildren, FadeInStaggerItem } from "../motion/FadeIn";
import Container from "../ui/Container";
import CountUp from "../motion/CountUp";

interface QattanTodayProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    coreOperations: string;
    workforceLabel: string;
    employees: string;
    employeesLabel: string;
    amman: string;
    ammanLabel: string;
    aqaba: string;
    aqabaLabel: string;
    operations: string[];
  };
}

// أيقونات SVG بسيطة واحترافية متضمنة مباشرة في المكون
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const PackageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export default function QattanToday({ content }: QattanTodayProps) {
  return (
    <section className="bg-[var(--color-bg-light-dim)] py-20 lg:py-32">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          {/* القسم الأيسر: العنوان والعمليات الأساسية */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <FadeIn>
              <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-black text-[var(--color-text-dark)] leading-tight mb-4 tracking-tight">
                {content.title}{" "}
                <span className="text-[var(--color-accent)]">
                  {content.subtitle}
                </span>
              </h2>
              <p className="text-lg text-[var(--color-text-dark-soft)] leading-relaxed font-medium max-w-md">
                {content.description}
              </p>
            </FadeIn>

            {/* بطاقة العمليات الأساسية - بتصميم ناعم ومريح */}
            <FadeIn>
              <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-light)] rounded-3xl p-6 mt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3.5 bg-[var(--color-accent)]/10 rounded-2xl text-[var(--color-accent)]">
                    <PackageIcon />
                  </div>
                  <h3 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-[var(--color-text-dark)]">
                    {content.coreOperations}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {content.operations.map((op, i) => (
                    <li
                      key={i}
                      className="flex items-center text-[var(--color-text-dark)] font-medium text-lg"
                    >
                      <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-4 shadow-sm" />
                      {op}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* القسم الأيمن: شبكة الإحصائيات والبطاقات */}
          <div className="lg:col-span-7">
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* بطاقة الموظفين - تأخذ عرض الشبكة بالكامل */}
              <FadeInStaggerItem className="sm:col-span-2 bg-[var(--color-bg-light)] border border-[var(--color-border-light)] hover:shadow-2xl transition-all duration-300 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between group">
                <div className="mb-6 sm:mb-0">
                  <div className="flex items-center gap-2.5 mb-4 text-[var(--color-accent)] bg-[var(--color-accent)]/10 w-fit px-4 py-2 rounded-full">
                    <UsersIcon />
                    <span className="font-bold tracking-wide uppercase text-sm">
                      {content.workforceLabel}
                    </span>
                  </div>
                  <h3 className="text-[clamp(2rem,5vw,4.5rem)] font-black text-[var(--color-text-dark)] mb-2 tracking-tighter">
                    <CountUp
                      target={
                        parseInt(
                          content.employees.replace(/[^0-9]/g, ""),
                          10,
                        ) || 0
                      }
                    />
                    <span className="text-[var(--color-accent)]">+</span>
                  </h3>
                  <p className="text-xl text-[var(--color-text-dark-soft)] font-medium">
                    {content.employeesLabel}
                  </p>
                </div>
              </FadeInStaggerItem>

              {/* بطاقة مستودعات عمان */}
              <FadeInStaggerItem className="bg-[var(--color-bg-light)] border border-[var(--color-border-light)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-3xl p-6 md:p-8 group">
                <div className="w-14 h-14 bg-[var(--color-bg-light-dim)] rounded-2xl flex items-center justify-center text-[var(--color-text-dark)] mb-8 group-hover:bg-[var(--color-accent)]/10 group-hover:text-[var(--color-accent)] transition-colors">
                  <MapPinIcon />
                </div>
                <h3 className="text-[clamp(2rem,5vw,4rem)] font-black text-[var(--color-text-dark)] mb-2 tracking-tighter">
                  <CountUp
                    target={
                      parseInt(content.amman.replace(/[^0-9]/g, ""), 10) || 0
                    }
                  />
                  <span className="text-[var(--color-accent)]"> m²</span>
                </h3>

                <p className="text-lg text-[var(--color-text-dark-soft)] font-medium leading-snug">
                  {content.ammanLabel}
                </p>
              </FadeInStaggerItem>

              {/* بطاقة مستودعات العقبة */}
              <FadeInStaggerItem className="bg-[var(--color-bg-light)] border border-[var(--color-border-light)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-3xl p-6 md:p-8 group">
                <div className="w-14 h-14 bg-[var(--color-bg-light-dim)] rounded-2xl flex items-center justify-center text-[var(--color-text-dark)] mb-8 group-hover:bg-[var(--color-accent)]/10 group-hover:text-[var(--color-accent)] transition-colors">
                  <MapPinIcon />
                </div>
                <h3 className="text-[clamp(2rem,5vw,4rem)] font-black text-[var(--color-text-dark)] mb-2 tracking-tighter">
                  <CountUp
                    target={
                      parseInt(content.aqaba.replace(/[^0-9]/g, ""), 10) || 0
                    }
                  />
                  <span className="text-[var(--color-accent)]"> m²</span>
                </h3>
                <p className="text-lg text-[var(--color-text-dark-soft)] font-medium leading-snug">
                  {content.aqabaLabel}
                </p>
              </FadeInStaggerItem>
            </StaggerChildren>
          </div>
        </div>
      </Container>
    </section>
  );
}
