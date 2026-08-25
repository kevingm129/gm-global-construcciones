import Image from "next/image";
import type { findingLevels } from "@/lib/data";
import { StatusBadge } from "@/components/ui/Badge";

export type Finding = {
  title: string;
  level: (typeof findingLevels)[number];
  description: string;
  thumbnail?: string;
};

/** Card de hallazgo del informe de inspección — ver docs/DESIGN-TOKENS.md §6 */
export function FindingCard({ finding }: { finding: Finding }) {
  return (
    <div className="flex gap-4 rounded-[var(--radius-md)] border border-border-default bg-white p-4">
      {finding.thumbnail && (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
          <Image src={finding.thumbnail} alt="" fill sizes="64px" className="object-cover" />
        </div>
      )}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-medium text-text-heading">{finding.title}</h4>
          <StatusBadge level={finding.level} />
        </div>
        <p className="mt-1 text-sm text-text-muted">{finding.description}</p>
      </div>
    </div>
  );
}
