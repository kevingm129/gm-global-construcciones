import { inspectionDisclaimer } from "@/lib/data";

export function InspectionDisclaimer() {
  return (
    <div
      role="note"
      className="rounded-[var(--radius-md)] border border-status-alta-border bg-status-alta-bg px-5 py-4 text-sm text-status-alta-fg"
    >
      <strong>Importante:</strong> {inspectionDisclaimer}
    </div>
  );
}
