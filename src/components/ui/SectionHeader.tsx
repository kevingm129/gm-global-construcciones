export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div data-animate className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-brand-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl text-text-heading">{title}</h2>
      <div className="mx-auto mt-4 h-0.5 w-12 bg-brand-secondary" aria-hidden />
      {subtitle && <p className="mt-4 text-text-muted">{subtitle}</p>}
    </div>
  );
}
