import type { Testimonial } from "@/lib/data";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      data-animate
      className="rounded-[var(--radius-lg)] border border-border-default bg-white p-8 shadow-[var(--shadow-sm)]"
    >
      <div aria-hidden className="font-heading text-4xl text-brand-primary/40">
        &ldquo;
      </div>
      <p className="mt-2 text-text-body">{testimonial.quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <div
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-dark text-sm font-medium text-white"
        >
          {testimonial.initials}
        </div>
        <div>
          <strong className="block text-sm text-text-heading">{testimonial.author}</strong>
          <span className="text-xs text-text-muted">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
