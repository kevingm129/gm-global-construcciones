import type { Testimonial } from "@/lib/data";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div data-animate className="border border-border-default bg-white p-8 transition-colors duration-[250ms] hover:border-brand-primary">
      <div aria-hidden className="mb-2 font-heading text-[4rem] leading-[0.5] text-brand-primary/50">
        &ldquo;
      </div>
      <p className="text-sm italic leading-[1.72] text-text-muted">{testimonial.quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <div
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
          style={{ backgroundImage: "var(--gradient-brand)" }}
        >
          {testimonial.initials}
        </div>
        <div>
          <strong className="block text-[13.5px] font-semibold text-text-heading">{testimonial.author}</strong>
          <span className="text-[11.5px] text-text-muted">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
