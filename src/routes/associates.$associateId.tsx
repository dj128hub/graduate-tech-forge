import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, ReliabilityBar } from "@/components/site-layout";
import { associates, type Associate } from "@/data/platform";

export const Route = createFileRoute("/associates/$associateId")({
  loader: ({ params }) => {
    const associate = associates.find((a) => a.id === params.associateId);
    if (!associate) throw notFound();
    return { associate };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Associate not found — Digitize" }, { name: "robots", content: "noindex" }],
      };
    }
    const a = loaderData.associate;
    const title = `${a.name} — ${a.title} | Digitize`;
    const description = `${a.bio} Reliability score ${a.reliability}% across ${a.projects} delivered projects.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-5 py-24">
        <h1 className="text-3xl font-semibold">Associate not found</h1>
        <Link to="/associates" className="mt-4 inline-block text-primary hover:underline">
          Back to associates
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-5 py-24">
        <h1 className="text-3xl font-semibold">This profile didn't load</h1>
      </div>
    </SiteLayout>
  ),
  component: AssociateProfile,
});

function AssociateProfile() {
  const { associate } = Route.useLoaderData();
  const a = associate as Associate;

  return (
    <SiteLayout>
      <div className="grid-backdrop border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <Link to="/associates" className="text-sm text-muted-foreground hover:text-foreground">
            ← All associates
          </Link>
          <div className="mt-6 flex flex-wrap items-start gap-5">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
              {a.initials}
            </span>
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">{a.name}</h1>
              <p className="mt-2 text-muted-foreground">
                {a.title} · {a.location} · {a.rate}
              </p>
            </div>
            <Link
              to="/request"
              search={{ associate: a.id }}
              className="ml-auto rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Request this associate
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section className="surface-panel rounded-2xl p-6">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="mt-3 text-sm text-muted-foreground">{a.bio}</p>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
              Advertised skills
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {a.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Portfolio</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {a.portfolio.map((p) => (
                <article key={p.name} className="surface-panel rounded-xl p-5">
                  <p className="text-xs uppercase tracking-wider text-primary">{p.type}</p>
                  <h3 className="mt-2 font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.outcome}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="surface-panel h-fit rounded-2xl p-6">
          <ReliabilityBar score={a.reliability} />
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Projects delivered</dt>
              <dd className="font-semibold">{a.projects}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">On-time rate</dt>
              <dd className="font-semibold">{a.onTime}%</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Availability</dt>
              <dd className="font-semibold">{a.available ? "Open to work" : "On a job"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Typical rate</dt>
              <dd className="font-semibold">{a.rate}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">
            Reliability is calculated from review outcomes, on-time delivery and client sign-off on
            completed Digitize projects.
          </p>
        </aside>
      </div>
    </SiteLayout>
  );
}