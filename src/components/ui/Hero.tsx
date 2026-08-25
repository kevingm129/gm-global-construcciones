import type { ReactNode } from "react";

/** Hero de Home — full-bleed, con stats, ver docs/DESIGN-TOKENS.md §6 */
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
    <section className="relative overflow-hidden bg-surface-dark px-6 py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-transparent" aria-hidden />
      <div data-animate className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-white/20 px-4 py-1.5 text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" aria-hidden />
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-5xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-on-dark-muted">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {primaryCta}
          {secondaryCta}
        </div>
      </div>
      <div data-animate className="relative mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <span className="block font-heading text-3xl">{stat.value}</span>
            <span className="text-sm text-text-on-dark-muted">{stat.label}</span>
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
    <section className="relative overflow-hidden bg-surface-dark px-6 py-16 text-white md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/15 via-transparent to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-4xl text-center">
        {eyebrow && <p className="mb-3 text-sm uppercase tracking-wide text-brand-secondary">{eyebrow}</p>}
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-text-on-dark-muted">{subtitle}</p>}
      </div>
    </section>
  );
}
