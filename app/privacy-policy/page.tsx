import type { Metadata } from "next";
import Link from "next/link";

import LegalLayout from "@/components/legal/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Alchemy Branding Studio collects, uses and protects your personal data.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="11 May 2026"
    >
      <p>
        This policy explains how Alchemy Branding Studio (&ldquo;Alchemy&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and protects your
        personal data when you use{" "}
        <Link href="/">alchemybranding.studio</Link> (this &ldquo;site&rdquo;).
        We&apos;re the data controller for the personal data we hold about you.
      </p>
      <p>
        If you have questions, the fastest way to reach us is{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>What data we collect</h2>
      <p>We collect personal data in three ways:</p>
      <ul>
        <li>
          <strong>When you fill in a form.</strong> Our contact form, free brand
          audit form, and any other intake forms ask for things like your name,
          email, company, website and the details of your enquiry. You decide
          what to give us.
        </li>
        <li>
          <strong>When you email or message us.</strong> If you email us, message
          us on WhatsApp, or book a call, we keep that conversation so we can
          help you and follow up later.
        </li>
        <li>
          <strong>When you browse the site.</strong> If you accept our cookies,
          we use Google Tag Manager and associated analytics tools to understand
          how the site is used. If you decline, none of that runs. See our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link> for the detail.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your enquiry and discuss whether we&apos;re a fit for
          your project.</li>
        <li>To deliver work you&apos;ve engaged us for.</li>
        <li>To understand how the site is used (only with your consent).</li>
        <li>To meet our legal and accounting obligations.</li>
      </ul>
      <p>
        We rely on your <strong>consent</strong> for cookies/analytics, on{" "}
        <strong>legitimate interest</strong> for responding to enquiries and
        running our business, and on <strong>contract</strong> for delivering
        engaged work.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We use a small set of trusted third parties to run the site and the
        business. Each of them processes only what they need to:
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>What we use them for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vercel</td>
            <td>Hosts this site. Sees standard server logs (IP, user agent,
              requested URL) for operational reasons.</td>
          </tr>
          <tr>
            <td>Sanity</td>
            <td>Hosts the content (case studies, posts, team info). No personal
              data from forms is stored in Sanity.</td>
          </tr>
          <tr>
            <td>Resend</td>
            <td>Delivers the emails our forms generate to our inbox.</td>
          </tr>
          <tr>
            <td>Google (Tag Manager + Analytics)</td>
            <td>Only loads after you accept cookies. Tells us aggregated usage
              patterns. See <Link href="/cookie-policy">Cookie Policy</Link>.</td>
          </tr>
          <tr>
            <td>Motion / WhatsApp / our email host</td>
            <td>The booking, messaging and email channels we operate on.</td>
          </tr>
        </tbody>
      </table>
      <p>
        We don&apos;t sell your data, and we don&apos;t share it for anyone
        else&apos;s marketing.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Enquiries and audit form submissions: up to 24 months from the last
          contact, unless we&apos;re working together (in which case we keep them
          for the lifetime of the engagement + 6 years for tax/accounting).</li>
        <li>Email correspondence: as long as it&apos;s useful, then archived
          per our retention schedule.</li>
        <li>Analytics: retention is controlled by the provider&apos;s default
          (Google Analytics 4 default is 14 months).</li>
      </ul>

      <h2>International transfers</h2>
      <p>
        Some of our providers process data outside the UK. Where that happens,
        we rely on the standard contractual clauses, UK adequacy decisions or
        equivalent safeguards offered by each provider.
      </p>

      <h2>Your rights</h2>
      <p>Under UK GDPR you have the right to:</p>
      <ul>
        <li>Ask us what personal data we hold about you.</li>
        <li>Ask us to correct it if it&apos;s wrong.</li>
        <li>Ask us to delete it, where we&apos;re not required to keep it.</li>
        <li>Object to or restrict how we use it.</li>
        <li>Withdraw consent (for cookies/analytics) at any time.</li>
      </ul>
      <p>
        Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and
        we&apos;ll respond within one month. If you&apos;re not happy with how
        we handle your data, you can complain to the Information
        Commissioner&apos;s Office (ICO) at{" "}
        <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer">
          ico.org.uk
        </a>
        .
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We&apos;ll update the &ldquo;last updated&rdquo; date at the top of this
        page when anything material changes. For significant changes, we&apos;ll
        try to give you reasonable notice in our next communication with you.
      </p>
    </LegalLayout>
  );
}
