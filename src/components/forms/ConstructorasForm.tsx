"use client";

import { useState, type FormEvent } from "react";
import { InputField, SelectField, TextareaField } from "@/components/ui/FormField";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";

const interestOptions = [
  { value: "alianza-constructiva", label: "Alianza para ejecución de obra" },
  { value: "inspeccion-para-constructora", label: "Inspección / punch list para mi constructora" },
  { value: "otro", label: "Otro" },
];

type Status = "idle" | "submitting" | "success" | "error";

export function ConstructorasForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/constructoras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request-failed");
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
        Solicitud enviada. Nos comunicaremos con usted en menos de 24 horas hábiles.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField label="Nombre completo" htmlFor="nombre" required inputProps={{ placeholder: "Ej: Juan Pérez" }} />
        <InputField label="Empresa / constructora" htmlFor="empresa" required inputProps={{ placeholder: "Nombre de la empresa" }} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField label="Correo electrónico" htmlFor="email" required inputProps={{ type: "email", placeholder: "correo@empresa.com" }} />
        <InputField label="Teléfono" htmlFor="telefono" inputProps={{ type: "tel", placeholder: "+57 300 000 0000" }} />
      </div>
      <SelectField label="Tipo de interés" htmlFor="interes" required options={interestOptions} />
      <TextareaField
        label="Cuéntenos sobre su empresa y lo que necesita"
        htmlFor="mensaje"
        required
        textareaProps={{ placeholder: "Describa el tipo de relación o apoyo que busca..." }}
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
        {status === "submitting" ? "Enviando..." : "Hablar con GM Global"}
      </button>
    </form>
  );
}
