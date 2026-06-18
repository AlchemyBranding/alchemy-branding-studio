import Script from "next/script";

const STORAGE_KEY = "alchemy-cookie-consent";

type Props = { gtmId: string };

/**
 * Loads GTM on every page with Google Consent Mode v2.
 *
 * Before the GTM container loads we default all consent types to "denied",
 * then re-apply a returning visitor's stored choice. The cookie banner flips
 * consent to "granted" on Accept (see CookieBanner). Google's GA4 / Ads tags
 * respect this automatically — cookieless, modelled pings while denied and
 * full tracking once granted — so analytics stay compliant without blocking
 * GTM for visitors who haven't chosen yet.
 */
export default function GoogleTagManager({ gtmId }: Props) {
  if (!gtmId) return null;

  return (
    <>
      <Script id="gtm-consent-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});
try{if(window.localStorage.getItem('${STORAGE_KEY}')==='accepted'){gtag('consent','update',{'ad_storage':'granted','analytics_storage':'granted','ad_user_data':'granted','ad_personalization':'granted'});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');
`}
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
