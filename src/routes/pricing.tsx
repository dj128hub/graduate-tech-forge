import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section } from "@/components/site-layout";
import { plans, services } from "@/data/platform";

const title = "Pricing & subscriptions — Digitize";
const description =
  "Once-off pricing for websites and advertisements, plus monthly maintenance subscriptions with associate hours included.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="Subscriptions"
        title="Maintenance plans"
        description="Keep your site, ads and tools maintained by the same associates who built them."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`surface-panel flex flex-col rounded-2xl p-6 ${p.featured ? "glow-teal border-primary/60" : ""}`}
            >
              {p.featured ? (
                <span className="mb-3 self-start rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-3 text-4xl font-semibold">
                {p.price}
                <span className="text-sm font-normal text-muted-foreground">{p.cadence}</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{p.for}</p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/request"
                search={{ service: `${p.name} maintenance plan` }}
                className={`mt-8 rounded-md px-4 py-2.5 text-center text-sm font-semibold ${p.featured ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}
              >
                Start {p.name}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Once-off"
        title="Project pricing"
        description="Builds are quoted once-off. Subscriptions are optional and start after delivery."
      >
        <div className="surface-panel overflow-hidden rounded-2xl">
          {services.map((s) => (
            <div
              key={s.name}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-5 last:border-b-0"
            >
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.blurb}</p>
              </div>
              <span className="text-sm font-semibold text-primary">{s.price}</span>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}