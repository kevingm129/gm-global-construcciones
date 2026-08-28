import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { company } from "@/lib/data";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/inspeccion-inmuebles", label: "Inspección de inmuebles" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/constructoras", label: "Aliados" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[#080F0F] px-6 py-8 text-white/60 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/images/logo3.png" alt={company.shortName} width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="font-heading text-sm font-bold text-white">
            {company.legalName}
            <span className="block text-[10px] font-normal not-italic uppercase tracking-[2px] text-white/60">
              {company.tagline}
            </span>
          </span>
        </div>

        <nav aria-label="Enlaces del pie de página" className="flex flex-wrap justify-center gap-x-7 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-wide text-white/60 transition-colors duration-[250ms] hover:text-brand-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-center text-xs text-white/60 md:text-right">
          <p>
            {company.phones.map((phone, idx) => (
              <span key={phone}>
                {idx > 0 && " · "}
                <TrackedLink href={`tel:${phone.replace(/\s+/g, "")}`} trackAs="click_phone" className="hover:text-brand-primary">
                  {phone}
                </TrackedLink>
              </span>
            ))}
            {" · "}
            <TrackedLink
              href={company.whatsapp}
              trackAs="click_whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary"
            >
              WhatsApp
            </TrackedLink>
          </p>
          <p className="mt-1">{company.emails.join(" · ")}</p>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-center text-[11.5px] leading-relaxed text-white/60 md:text-left">
        © {new Date().getFullYear()} {company.legalName} · NIT: {company.nit} · {company.address.city},{" "}
        {company.address.country} · Todos los derechos reservados.
      </p>
    </footer>
  );
}
