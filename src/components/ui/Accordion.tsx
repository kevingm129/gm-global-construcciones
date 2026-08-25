"use client";

import { useId, useState } from "react";

export type AccordionItem = {
  title: string;
  content: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-border-default border-y border-border-default">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.title}>
            <h3>
              <button
                id={`${baseId}-header-${idx}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${idx}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-heading text-lg text-text-heading">{item.title}</span>
                <span aria-hidden className="shrink-0 text-xl text-brand-primary">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`${baseId}-panel-${idx}`}
              role="region"
              aria-labelledby={`${baseId}-header-${idx}`}
              className={`grid overflow-hidden transition-[grid-template-rows] duration-[250ms] ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-text-body">{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
