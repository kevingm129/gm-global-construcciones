"use client";

import { useState, type FormEvent } from "react";
import { InputField, SelectField, TextareaField } from "@/components/ui/FormField";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { trackEvent } from "@/lib/analytics";

const inspectionTypeOptions = [
  { value: "antes-de-entrega", label: "Inmueble nuevo, antes de entrega" },
  { value: "reinspeccion", label: "Reinspección" },
  { value: "punch-list-constructora", label: "Punch list para constructora" },
  { value: "otro", label: "Otro" },
];

type Status = "idle" | "submitting" | "success" | "error";

export function InspectionForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/inspeccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request-failed");
      trackEvent("submit_inspeccion");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMsg("No pudimos enviar su solicitud. Intente de nuevo o escríbanos directamente por correo.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="rounded-[var(--radius-md)] border border-status-conforme-border bg-status-conforme-bg p-6 text-status-conforme-fg">
        ¡Solicitud enviada! Nos comunicaremos con usted en menos de 24 horas hábiles para coordinar la visita.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField label="Nombre completo" htmlFor="nombre" required inputProps={{ placeholder: "Ej: Juan Pérez" }} />
        <InputField label="Correo electrónico" htmlFor="email" required inputProps={{ type: "email", placeholder: "correo@ejemplo.com" }} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField label="Teléfono" htmlFor="telefono" required inputProps={{ type: "tel", placeholder: "+57 300 000 0000" }} />
        <SelectField label="Tipo de inspección" htmlFor="tipoInspeccion" required options={inspectionTypeOptions} />
      </div>
      <InputField
        label="Dirección o ubicación del inmueble"
        htmlFor="direccionInmueble"
        required
        inputProps={{ placeholder: "Barrio, conjunto, dirección aproximada" }}
      />
      <TextareaField
        label="Cuéntenos sobre el inmueble y lo que necesita revisar"
        htmlFor="mensaje"
        required
        textareaProps={{ placeholder: "Tipo de inmueble, fecha estimada de entrega, alcance deseado..." }}
      />
      <ConsentCheckbox />
      {errorMsg && (
        <p role="alert" className="text-sm text-status-critico-fg">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-[var(--radius-sm)] bg-[image:var(--gradient-brand)] px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-white transition-opacity duration-[250ms] hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Agendar inspección"}
      </button>
      <p className="text-center text-xs text-text-muted">Nos comunicaremos con usted en menos de 24 horas hábiles.</p>
    </form>
  );
}
