import Script from "next/script";

/**
 * Carga condicional de GA4 — solo se renderiza si NEXT_PUBLIC_GA_MEASUREMENT_ID
 * está configurada (ver README). Sin esa variable, no se inyecta ningún script.
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
