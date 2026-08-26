import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Datos de contacto de GM Global Construcciones S.A.S. en Cartagena de Indias, Colombia.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
      <PageHero eyebrow="Hablemos" title="¿Tiene un proyecto en mente?" subtitle="Contáctenos y convirtamos sus ideas en espacios funcionales y estéticamente atractivos." />

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-3">
          <div data-animate className="border border-border-default bg-white p-6 text-center">
            <h3 className="text-sm font-medium text-text-heading">Sede principal</h3>
            <p className="mt-2 text-sm text-text-muted">
              {company.address.street}
              <br />
              {company.address.city}, {company.address.region}
            </p>
          </div>
          <div data-animate className="border border-border-default bg-white p-6 text-center">
            <h3 className="text-sm font-medium text-text-heading">Teléfono</h3>
            {company.phones.map((phone) => (
              <p key={phone} className="mt-2 text-sm text-text-muted">
                <TrackedLink href={`tel:${phone.replace(/\s+/g, "")}`} trackAs="click_phone" className="hover:text-brand-primary">
                  {phone}
                </TrackedLink>
              </p>
            ))}
            <p className="mt-2 text-sm">
              <TrackedLink
                href={company.whatsapp}
                trackAs="click_whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-primary hover:text-brand-primary-hover"
              >
                Escribir por WhatsApp
              </TrackedLink>
            </p>
          </div>
          <div data-animate className="border border-border-default bg-white p-6 text-center">
            <h3 className="text-sm font-medium text-text-heading">Correo electrónico</h3>
            {company.emails.map((email) => (
              <p key={email} className="mt-2 text-sm text-text-muted">
                {email}
              </p>
            ))}
          </div>
        </div>

        <div data-animate className="mt-12 bg-surface-alt p-8 text-center">
          <h2 className="text-2xl text-text-heading">Solicite su cotización</h2>
          <p className="mx-auto mt-2 max-w-md text-text-muted">{company.responseTime}</p>
          <div className="mt-6">
            <Button href="/cotizacion" trackEvent="click_cotizacion">Solicitar cotización</Button>
          </div>
        </div>
      </section>
    </>
  );
}
