"use client";

import { useSearchParams } from "next/navigation";
import { Tabs } from "@/components/ui/Tabs";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { InspectionForm } from "@/components/forms/InspectionForm";

export function CotizacionTabs() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo");
  const servicio = searchParams.get("servicio") ?? undefined;
  const defaultKey = tipo === "inspeccion" ? "inspeccion" : "construccion";

  return (
    <Tabs
      defaultKey={defaultKey}
      items={[
        {
          key: "construccion",
          label: "Construcción y remodelación",
          content: <QuoteForm defaultServicio={servicio} />,
        },
        {
          key: "inspeccion",
          label: "Inspección de inmueble",
          content: <InspectionForm />,
        },
      ]}
    />
  );
}
