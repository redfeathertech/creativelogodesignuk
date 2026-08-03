import Script from "next/script";

/**
 * GA4, loaded only when NEXT_PUBLIC_GA_ID is set.
 *
 * The live site ships no analytics at all — no GA, no GTM, no Search Console
 * tag — so there is currently zero measurement of any of this traffic.
 *
 * `afterInteractive` keeps it off the critical path.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
