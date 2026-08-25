import type { Metadata } from "next";
import { Playfair_Display, Barlow } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { company } from "@/lib/data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gmglobalconstrucciones.co"),
  title: {
    default: `${company.legalName} | ${company.tagline} | Cartagena`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "GM Global Construcciones S.A.S. — Creamos futuro. Empresa de construcción, remodelación e inspección de inmuebles en Cartagena de Indias, Colombia.",
  openGraph: {
    title: `${company.legalName} | ${company.tagline}`,
    description:
      "Construcción, remodelación e inspección de inmuebles en Cartagena de Indias, Colombia.",
    url: "https://www.gmglobalconstrucciones.co",
    siteName: company.shortName,
    images: ["/images/og-image.jpg"],
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${barlow.variable}`}>
      <body className="flex min-h-screen flex-col font-body text-text-body antialiased">
        <ScrollReveal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
