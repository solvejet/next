// src/components/AnalyticsProvider.tsx
"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import type { ReactNode } from "react";
import Head from "next/head";

interface AnalyticsProviderProps {
  children: ReactNode;
}

// Analytics configuration
const ANALYTICS_CONFIG = {
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || "GTM-KZRNLV47",
  GA4_ID: process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX", // Replace with your GA4 ID
  CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID || "ppm0ymsn5q",
  HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID || "3772321",
  HOTJAR_SV: process.env.NEXT_PUBLIC_HOTJAR_SV || "6",
  NORTON_VERIFICATION: process.env.NEXT_PUBLIC_NORTON_SITE_VERIFICATION,
};

function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Push page view to dataLayer
      window.dataLayer?.push({
        event: "page_view",
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
      // Send page view to GA4 directly
      window.gtag?.("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });

      // Send page view to Hotjar
      window.hj?.("stateChange", pathname);
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <>
      <Head>
        {/* Norton SafeWeb Verification */}
        {ANALYTICS_CONFIG.NORTON_VERIFICATION && (
          <meta
            name="norton-safeweb-site-verification"
            content={ANALYTICS_CONFIG.NORTON_VERIFICATION}
          />
        )}
      </Head>

      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_CONFIG.GA4_ID}', {
            page_path: window.location.pathname,
            send_page_view: false // We'll handle this manually
          });
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.GTM_ID}');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${ANALYTICS_CONFIG.CLARITY_ID}");
        `}
      </Script>

      {/* Hotjar */}
      <Script id="hotjar" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${ANALYTICS_CONFIG.HOTJAR_ID},hjsv:${ANALYTICS_CONFIG.HOTJAR_SV}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>

      {/* GTM noscript iframe */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <Suspense fallback={null}>
        <Analytics />
      </Suspense>

      {children}
    </>
  );
}
