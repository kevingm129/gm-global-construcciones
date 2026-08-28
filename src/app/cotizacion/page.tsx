import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { CotizacionTabs } from "./CotizacionTabs";

export const metadata: Metadata = {
  title: "Solicitar cotización",
  description: "Solicite una cotización de construcción, remodelación o inspección de inmuebles con GM Global Construcciones S.A.S.",
  alternates: { canonical: "/cotizacion" },
};

export default function CotizacionPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Cotización" }]} />
      <PageHero eyebrow="Hablemos de su proyecto" title="Solicitar cotización" />

      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <Suspense fallback={null}>
          <CotizacionTabs />
        </Suspense>
      </section>
    </>
  );
}
