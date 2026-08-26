"use client";

import { useState, type FormEvent } from "react";
import { InputField, SelectField, TextareaField } from "@/components/ui/FormField";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { services } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "integral", label: "Proyecto integral" },
];

export function QuoteForm({ defaultServicio }: { defaultServicio?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("request-failed");
      trackEvent("submit_cotizacion");
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
        ¡Solicitud enviada! Nos comunicaremos con usted en menos de 24 horas hábiles.
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
        <InputField label="Teléfono" htmlFor="telefono" inputProps={{ type: "tel", placeholder: "+57 300 000 0000" }} />
        <SelectField
          label="Tipo de servicio"
          htmlFor="servicio"
          options={serviceOptions}
          selectProps={{ defaultValue: defaultServicio ?? "" }}
        />
      </div>
      <TextareaField
        label="Cuéntenos sobre su proyecto"
        htmlFor="mensaje"
        required
        textareaProps={{ placeholder: "Describa su proyecto, ubicación y necesidades..." }}
      />
      <InputField
        label="Adjuntar planos o referencias (opcional)"
        htmlFor="archivo"
        inputProps={{ type: "file", accept: "image/*,.pdf", className: "text-sm" }}
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
        className="w-full rounded-[var(--radius-sm)] bg-brand-primary px-6 py-3 text-sm font-medium text-white transition-colors duration-[250ms] hover:bg-brand-primary-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Solicitar cotización"}
      </button>
      <p className="text-center text-xs text-text-muted">Nos comunicaremos con usted en menos de 24 horas hábiles.</p>
    </form>
  );
}
