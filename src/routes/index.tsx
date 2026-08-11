import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section, ReliabilityBar } from "@/components/site-layout";
import { associates, services, plans } from "@/data/platform";

const title = "Digitize — Tech services by vetted CS graduates";
const description =
  "Digitize connects computer science graduates with small businesses for websites, ads, inventory systems and tech support — with reviewed work and maintenance plans.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const steps = [
  {
    step: "01",
    title: "Tell us what you need",
    body: "Submit a service request with your budget, deadline and the outcome you're after.",
  },
  {
    step: "02",
    title: "We match an associate",
    body: "Digitize pairs your job with a technical associate whose listed skills and reliability fit.",
  },
  {
    step: "03",
    title: "Work is reviewed first",
    body: "Every deliverable passes our internal review checklist before it ever reaches you.",
  },
  {
    step: "04",
    title: "Keep it running",
    body: "Move onto a maintenance subscription, or pay once-off and take it from there.",
  },
];

function Index() {
  return (
    <SiteLayout>
      <section className="grid-backdrop border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
              Graduates · Small business · Real work
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Serious tech help,{" "}
              <span className="text-gradient-teal">built by graduates</span> who are proving
              themselves.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Digitize matches computer science graduates — our technical associates — with small
              businesses that need websites, advertising, inventory systems and everyday tech
              support. Graduates upskill on live work. You get reviewed, dependable delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/request"
                className="glow-teal rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Request a service
              </Link>
              <Link
                to="/associates"
                className="rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary"
              >
                Browse associates
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["55+", "Projects delivered"],
                ["94%", "Average reliability"],
                ["100%", "Work reviewed pre-delivery"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-semibold text-primary">{value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="surface-panel glow-teal rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Matching queue
            </p>
            <div className="mt-5 space-y-4">
              {associates.slice(0, 3).map((a) => (
                <div key={a.id} className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-sm font-semibold text-primary">
                      {a.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{a.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{a.title}</p>
                    </div>
                    <span
                      className={`ml-auto rounded-full px-2 py-1 text-[11px] ${a.available ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`}
                    >
                      {a.available ? "Available" : "On a job"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <ReliabilityBar score={a.reliability} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="How it works"
        title="One platform, both sides of the deal"
        description="Business owners get vetted delivery. Graduates get paid experience, a portfolio and a reliability score that follows them."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.step} className="surface-panel rounded-xl p-5">
              <p className="text-sm font-semibold text-primary">{s.step}</p>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Services"
        title="Pay once-off for the build"
        description="Websites and advertisements are priced as one-off projects, delivered by a matched technical associate."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.name} className="surface-panel rounded-xl p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <span className="text-sm text-primary">{s.price}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/services" className="text-sm font-semibold text-primary hover:underline">
            See what's included →
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Subscriptions"
        title="Then subscribe to keep it maintained"
        description="Ongoing hosting, updates, monitoring and associate hours — cancel any month."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`surface-panel rounded-xl p-6 ${p.featured ? "glow-teal border-primary/60" : ""}`}
            >
              <p className="text-sm font-semibold text-primary">{p.name}</p>
              <p className="mt-3 text-3xl font-semibold">
                {p.price}
                <span className="text-sm font-normal text-muted-foreground">{p.cadence}</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{p.for}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/pricing" className="text-sm font-semibold text-primary hover:underline">
            Compare plans →
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
