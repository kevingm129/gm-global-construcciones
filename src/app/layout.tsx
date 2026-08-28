import type { Metadata } from "next";
import { Playfair_Display, Barlow } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { company } from "@/lib/data";
import { businessSchema } from "@/lib/schema";

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
  alternates: {
    canonical: "/",
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="es" className={`${playfair.variable} ${barlow.variable}`}>
      <body className="flex min-h-screen flex-col font-body text-text-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema()) }}
        />
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        {metaPixelId && <MetaPixel pixelId={metaPixelId} />}
        <ScrollReveal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
