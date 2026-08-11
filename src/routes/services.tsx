import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section } from "@/components/site-layout";
import { services } from "@/data/platform";

const title = "Services — Digitize";
const description =
  "Website creation, advertisement packages, inventory and internal tools, and general tech support delivered by Digitize technical associates.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="Services"
        title="What our technical associates build"
        description="Every project is scoped by Digitize, delivered by a matched associate and reviewed internally before it reaches you."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.name} className="surface-panel rounded-2xl p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <span className="whitespace-nowrap text-sm font-semibold text-primary">
                  {s.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">▪</span>
                    <span className="text-muted-foreground">{i}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/request"
                search={{ service: s.name }}
                className="mt-6 inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Request this
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Custom work"
        title="Need something not listed?"
        description="Describe the outcome you want. If an associate has the skill on their profile, we can scope it — otherwise we'll tell you straight."
      >
        <Link
          to="/request"
          className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Submit a custom request
        </Link>
      </Section>
    </SiteLayout>
  );
}