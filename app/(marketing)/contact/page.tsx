import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow, PageHero, Section } from "@/components/ui";
import { partners, regions } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Schedule a consultation, request a demo, or request a proposal from the Mawkish Technologies team.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's design your path to a measurable outcome."
        description="Tell us about the challenge you're facing. A member of our team will follow up to schedule a consultation."
      />

      <Section className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-mw-line p-8">
          <ContactForm defaultIntent={intent} />
        </div>

        <div className="space-y-8">
          <div>
            <Eyebrow>Headquarters</Eyebrow>
            <a
              href="https://maps.app.goo.gl/1tY6TsvdXmYuFvXs8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-mw-ink/70 underline decoration-mw-line underline-offset-2 transition hover:text-mw-secondary"
            >
              2nd Floor, Oceanica Tower, 490 Galle Rd, Colombo 00300, Sri Lanka
            </a>
            <p className="mt-1 text-sm text-mw-ink/50">
              Serving clients across Sri Lanka, India, the UAE, and expanding into KSA, Oman, Switzerland &amp;
              the USA.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-mw-line">
            <iframe
              title="Mawkish Technologies — Oceanica Tower, Colombo, Sri Lanka"
              src="https://www.openstreetmap.org/export/embed.html?bbox=79.8419%2C6.8938%2C79.8619%2C6.9138&layer=mapnik&marker=6.9037886%2C79.8519282"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>

          <div>
            <Eyebrow>Strategic Partners</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-3">
              {partners.map((p) => (
                <span key={p.name} className="rounded-full border border-mw-line px-4 py-1.5 text-sm text-mw-ink/70">
                  {p.name} &middot; {p.relationship}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow>Active Markets</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-2">
              {regions
                .filter((r) => r.activeMarket)
                .map((r) => (
                  <span key={r.region} className="rounded-full bg-mw-paper px-3 py-1 text-xs font-medium text-mw-ink/70">
                    {r.region}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
