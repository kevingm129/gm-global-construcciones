import { StatusBadge } from "@/components/ui/Badge";
import { findingClassificationDisclaimer, findingLevels } from "@/lib/data";

export function FindingClassification() {
  return (
    <div data-animate className="rounded-[var(--radius-lg)] border border-border-default bg-white p-6">
      <h3 className="text-lg text-text-heading">Sistema de clasificación de hallazgos</h3>
      <ul className="mt-4 space-y-3">
        {findingLevels.map((level) => (
          <li key={level.key} className="flex items-start gap-3">
            <StatusBadge level={level} />
            <span className="text-sm text-text-muted">{level.description}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-text-muted">{findingClassificationDisclaimer}</p>
    </div>
  );
}
