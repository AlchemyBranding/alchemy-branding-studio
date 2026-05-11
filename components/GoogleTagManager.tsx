"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "alchemy-cookie-consent";
const CONSENT_EVENT = "alchemy:consent-accepted";

type Props = { gtmId: string };

/**
 * Injects GTM only after the user accepts cookies.
 * Reads the consent flag from localStorage on mount, and listens for the
 * `alchemy:consent-accepted` event dispatched by CookieBanner.
 */
export default function GoogleTagManager({ gtmId }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!gtmId) return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "accepted") {
        setEnabled(true);
      }
    } catch {
      // no-op
    }
    const onAccept = () => setEnabled(true);
    window.addEventListener(CONSENT_EVENT, onAccept);
    return () => window.removeEventListener(CONSENT_EVENT, onAccept);
  }, [gtmId]);

  if (!gtmId || !enabled) return null;

  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
