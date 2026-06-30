import type { Metadata } from "next";
import Link from "next/link";

import LegalLayout from "@/components/legal/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies and similar storage Alchemy Branding Studio uses on this site, and how to manage them.",
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Cookie Policy"
      lastUpdated="30 June 2026"
    >
      <p>
        This page explains what cookies and similar storage we use on{" "}
        <Link href="/">alchemybranding.studio</Link>, why, and how you can
        control them. It sits alongside our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>What cookies are</h2>
      <p>
        Cookies are small text files a website asks your browser to store. They
        do things like remember preferences, keep you signed in, or measure how
        a site is used. &ldquo;Similar storage&rdquo; (like localStorage) does
        the same job in a slightly different shape.
      </p>

      <h2>What we use</h2>
      <p>
        We split everything we use into two buckets: <strong>strictly
        necessary</strong> (the site can&apos;t work without it) and{" "}
        <strong>analytics &amp; performance</strong> (only loads after you
        accept).
      </p>

      <h3>Strictly necessary</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Storage</th>
            <th>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>alchemy-cookie-consent</td>
            <td>Remembers whether you&apos;ve accepted or declined cookies so
              we don&apos;t ask again.</td>
            <td>localStorage</td>
            <td>Until you clear it</td>
          </tr>
        </tbody>
      </table>

      <h3>Analytics &amp; performance</h3>
      <p>
        Google Tag Manager loads on every page to manage your consent choice,
        but it sets no cookies of its own. The analytics and advertising cookies
        below are only set <em>after</em> you press &ldquo;Accept&rdquo;. Before
        that, Google Consent Mode keeps measurement cookieless. If you decline
        &mdash; or if your browser sends a{" "}
        <strong>Global Privacy Control (GPC)</strong> signal, which we honour as
        an opt-out &mdash; none of these cookies are set.
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Set by</th>
            <th>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_ga / _ga_*</td>
            <td>Distinguishes visitors so analytics can report unique vs.
              returning users.</td>
            <td>Google Analytics (via Google Tag Manager)</td>
            <td>Up to 2 years</td>
          </tr>
          <tr>
            <td>_gid</td>
            <td>Distinguishes visitors over a 24-hour window.</td>
            <td>Google Analytics</td>
            <td>24 hours</td>
          </tr>
          <tr>
            <td>_gat / _gat_*</td>
            <td>Throttles request rate to Google Analytics.</td>
            <td>Google Analytics</td>
            <td>1 minute</td>
          </tr>
          <tr>
            <td>_gcl_au</td>
            <td>Measures ad conversions (Google Ads conversion linker).</td>
            <td>Google Ads (via Google Tag Manager)</td>
            <td>Up to 90 days</td>
          </tr>
        </tbody>
      </table>
      <p>
        The Google Tag Manager container we use is{" "}
        <code>GTM-KLKH973</code>. If we add or remove tags inside it, we&apos;ll
        update this page.
      </p>

      <h2>How to manage cookies</h2>
      <ul>
        <li>
          <strong>On this site.</strong> Use the cookie banner the first time
          you visit. To change your mind later, clear the{" "}
          <code>alchemy-cookie-consent</code> entry from this site&apos;s
          localStorage and the banner will appear again.
        </li>
        <li>
          <strong>In your browser.</strong> Every modern browser lets you view
          and delete cookies, and block them per site. Search your browser&apos;s
          settings for &ldquo;cookies&rdquo;.
        </li>
        <li>
          <strong>Opt out of Google Analytics globally.</strong> Google offer a
          browser add-on at{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            tools.google.com/dlpage/gaoptout
          </a>{" "}
          that opts you out across every site that uses GA.
        </li>
      </ul>

      <h2>Get in touch</h2>
      <p>
        Questions about cookies? Email{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalLayout>
  );
}
