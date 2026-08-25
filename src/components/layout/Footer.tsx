import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/data";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/inspeccion-inmuebles", label: "Inspección de inmuebles" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/constructoras", label: "Constructoras" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-surface-dark px-6 py-12 text-text-on-dark-muted md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo3.png" alt={company.shortName} width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-heading text-white">
              {company.legalName}
              <span className="block text-xs font-normal italic text-brand-secondary">{company.tagline}</span>
            </span>
          </div>
          <p className="mt-4 text-sm">
            {company.address.city}
            <br />
            NIT: {company.nit} · Todos los derechos reservados.
          </p>
        </div>

        <nav aria-label="Enlaces del pie de página" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm">
          <p>{company.phones.join(" · ")}</p>
          <p>{company.emails.join(" · ")}</p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs">
        © {new Date().getFullYear()} {company.legalName} · {company.address.city} · {company.address.country}
      </p>
    </footer>
  );
}
