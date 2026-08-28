import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldBase =
  "w-full rounded-[var(--radius-sm)] border border-border-default bg-white px-4 py-3 text-sm text-text-body placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-colors duration-[250ms] disabled:bg-neutral-100 disabled:text-text-muted";

type FieldChrome = {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
};

type FieldWrapperProps = FieldChrome & { children: ReactNode };

function FieldWrapper({ label, htmlFor, required, hint, error, children, className = "" }: FieldWrapperProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-text-heading">
        {label}
        {required && <span aria-hidden className="text-status-critico-fg"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs text-status-critico-fg" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type InputFieldProps = FieldChrome & { inputProps: InputHTMLAttributes<HTMLInputElement> };

export function InputField({ label, htmlFor, required, hint, error, className, inputProps }: InputFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={htmlFor} required={required} hint={hint} error={error} className={className}>
      <input
        id={htmlFor}
        name={htmlFor}
        required={required}
        aria-invalid={Boolean(error)}
        className={fieldBase}
        {...inputProps}
      />
    </FieldWrapper>
  );
}

type TextareaFieldProps = FieldChrome & { textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement> };

export function TextareaField({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  textareaProps,
}: TextareaFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={htmlFor} required={required} hint={hint} error={error} className={className}>
      <textarea
        id={htmlFor}
        name={htmlFor}
        required={required}
        rows={4}
        aria-invalid={Boolean(error)}
        className={fieldBase}
        {...textareaProps}
      />
    </FieldWrapper>
  );
}

type SelectFieldProps = FieldChrome & {
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function SelectField({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  selectProps,
  options,
  placeholder = "Seleccione una opción",
}: SelectFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={htmlFor} required={required} hint={hint} error={error} className={className}>
      <select
        id={htmlFor}
        name={htmlFor}
        required={required}
        aria-invalid={Boolean(error)}
        className={fieldBase}
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
