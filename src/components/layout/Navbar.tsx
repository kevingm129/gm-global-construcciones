"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/lib/data";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/inspeccion-inmuebles", label: "Inspección de inmuebles" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/constructoras", label: "Constructoras" },
  { href: "/empresa", label: "Empresa" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 flex h-16 items-center justify-between bg-white px-6 transition-shadow duration-[250ms] md:px-10 ${
        scrolled ? "shadow-[var(--shadow-md)]" : ""
      }`}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image src="/images/logo3.png" alt={company.shortName} width={36} height={36} className="h-9 w-9 object-contain" />
        <span className="font-heading text-base leading-tight text-text-heading">
          {company.shortName}
          <span className="block text-xs font-normal italic text-brand-primary">{company.tagline}</span>
        </span>
      </Link>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span className={`h-0.5 w-6 bg-text-heading transition-transform duration-[250ms] ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-text-heading transition-opacity duration-[250ms] ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-text-heading transition-transform duration-[250ms] ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      <nav
        aria-label="Principal"
        className={`${
          open ? "flex" : "hidden"
        } absolute left-0 top-16 w-full flex-col gap-4 bg-white px-6 pb-6 shadow-[var(--shadow-md)] md:static md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:pb-0 md:shadow-none`}
      >
        <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-medium text-text-body hover:text-brand-primary">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-brand-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-primary-hover"
        >
          Hablar con GM Global
        </Link>
      </nav>
    </header>
  );
}
