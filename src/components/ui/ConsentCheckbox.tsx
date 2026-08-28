import { company } from "@/lib/data";

/**
 * Aviso de tratamiento de datos personales + checkbox de consentimiento
 * obligatorio, conforme a la Ley 1581 de 2012 (Colombia). Obligatorio en
 * todo formulario que capture nombre/teléfono/email.
 */
export function ConsentCheckbox({ error }: { error?: string }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm text-text-body">
        <input
          type="checkbox"
          id="consentimiento"
          name="consentimiento"
          required
          aria-invalid={Boolean(error)}
          className="mt-1 h-4 w-4 shrink-0 rounded-sm border-border-strong text-brand-primary focus:ring-brand-primary"
        />
        <span>
          Autorizo a {company.legalName} (NIT {company.nit}) para el tratamiento de mis datos
          personales conforme a la Ley 1581 de 2012 y sus decretos reglamentarios, con la
          finalidad de gestionar esta solicitud y contactarme. Puedo conocer, actualizar,
          rectificar o suprimir mis datos escribiendo a {company.emails[0]}.
          <span aria-hidden className="text-status-critico-fg"> *</span>
        </span>
      </label>
      {error && (
        <p className="mt-1 text-xs text-status-critico-fg" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
