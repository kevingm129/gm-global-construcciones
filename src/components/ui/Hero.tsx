import type { ReactNode } from "react";

/** Hero de Home — layout de dos columnas + stats flotantes, ver css/style.css original (.hero) */
export function HomeHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  primaryCta: ReactNode;
  secondaryCta: ReactNode;
  stats: { value: string; label: string }[];
}) {
  return (
    <section
      className="relative flex min-h-[540px] items-center overflow-hidden px-6 py-20 md:flex-row md:gap-8 md:px-10 md:py-24"
      style={{
        background:
          "linear-gradient(135deg, var(--dark) 0%, var(--dark-mid) 55%, #0D2828 100%)",
      }}
    >
      <div className="hero-bg-pattern" aria-hidden />
      <div data-animate className="relative z-[2] max-w-xl">
        <div className="mb-6 inline-flex items-center gap-2 border border-brand-primary/40 bg-brand-primary/15 px-4 py-1.5">
          <span className="hero-badge-dot h-1.5 w-1.5 shrink-0 rounded-full bg-teal-light" aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[2px] text-teal-light">{eyebrow}</span>
        </div>
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] text-white">{title}</h1>
        <p className="mt-5 max-w-[520px] text-base font-light leading-[1.7] text-white/65">{subtitle}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {primaryCta}
          {secondaryCta}
        </div>
      </div>

      <div
        data-animate
        className="relative z-[2] mt-10 flex flex-row flex-wrap justify-center gap-5 md:absolute md:right-12 md:top-1/2 md:mt-0 md:w-auto md:-translate-y-1/2 md:flex-col md:justify-start"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="min-w-[130px] border border-brand-primary/25 bg-white/[0.06] px-6 py-5 text-center"
          >
            <span className="block font-heading text-2xl font-bold text-teal-light">{stat.value}</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[1.5px] text-white/50">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Hero interior — banner más corto, sin stats, para páginas secundarias */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, var(--dark) 0%, var(--dark-mid) 55%, #0D2828 100%)",
      }}
    >
      <div className="hero-bg-pattern" aria-hidden />
      <div className="relative z-[2] mx-auto max-w-4xl text-center">
        {eyebrow && (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[2px] text-teal-light">{eyebrow}</p>
        )}
        <h1 className="text-3xl text-white md:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl font-light text-white/65">{subtitle}</p>}
      </div>
    </section>
  );
}
