import type { Metadata } from "next";

import ContactForm from "@/components/contact/ContactForm";
import ContactSidebar from "@/components/contact/ContactSidebar";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    pageKey: "contact",
    path: "/contact",
    defaults: {
      title: "Contact",
      description:
        "Tell us about your project. Brand strategy, design and animation for ambitious businesses — we reply within one business day.",
    },
  });
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Contact
          </p>
          <h1 className="font-display text-display mt-4 max-w-4xl leading-[1.05]">
            <span className="text-white">Let&apos;s start a</span>{" "}
            <span className="text-dusk italic">conversation.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.125rem] leading-[1.7] text-white/65">
            Tell us about the project, the timeline, what you&apos;re chasing.
            We&apos;ll get back to you within one business day — or
            faster on WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-dawn pb-[120px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
          <div>
            <h2 className="sr-only">Send us a message</h2>
            <ContactForm />
          </div>
          <ContactSidebar />
        </div>
      </section>
    </>
  );
}
