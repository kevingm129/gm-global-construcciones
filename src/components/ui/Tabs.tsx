"use client";

import { useId, useState, type ReactNode } from "react";

export type TabItem = {
  key: string;
  label: string;
  content: ReactNode;
};

export function Tabs({ items, defaultKey }: { items: TabItem[]; defaultKey?: string }) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key);
  const baseId = useId();

  return (
    <div>
      <div role="tablist" aria-label="Selector" className="flex gap-6 border-b border-border-default">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              role="tab"
              id={`${baseId}-tab-${item.key}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.key}`}
              onClick={() => setActive(item.key)}
              className={`-mb-px border-b-2 px-1 pb-3 text-sm font-medium transition-colors duration-[250ms] ${
                isActive
                  ? "border-brand-primary text-text-heading"
                  : "border-transparent text-text-muted hover:text-text-heading"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.key}
          role="tabpanel"
          id={`${baseId}-panel-${item.key}`}
          aria-labelledby={`${baseId}-tab-${item.key}`}
          hidden={item.key !== active}
          className="pt-8"
        >
          {item.key === active && item.content}
        </div>
      ))}
    </div>
  );
}
