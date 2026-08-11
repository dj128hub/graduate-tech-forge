import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, Section, ReliabilityBar } from "@/components/site-layout";
import { associates } from "@/data/platform";

const title = "Technical associates — Digitize";
const description =
  "Browse Digitize technical associates: CS graduates with listed skills, portfolios and reliability scores earned on completed client work.";

export const Route = createFileRoute("/associates/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AssociatesPage,
});

function AssociatesPage() {
  const [skill, setSkill] = useState<string | null>(null);
  const allSkills = useMemo(
    () => Array.from(new Set(associates.flatMap((a) => a.skills))).sort(),
    [],
  );
  const filtered = skill ? associates.filter((a) => a.skills.includes(skill)) : associates;

  return (
    <SiteLayout>
      <Section
        eyebrow="Portfolio scheme"
        title="Technical associates"
        description="Each associate advertises their own skills, keeps a portfolio of delivered work and carries a reliability score that rises with every successful, on-time delivery."
      >
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSkill(null)}
            className={`rounded-full border px-3 py-1.5 text-xs ${skill === null ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}
          >
            All skills
          </button>
          {allSkills.map((s) => (
            <button
              key={s}
              onClick={() => setSkill(s === skill ? null : s)}
              className={`rounded-full border px-3 py-1.5 text-xs ${skill === s ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((a) => (
            <article key={a.id} className="surface-panel rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary font-semibold text-primary">
                  {a.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{a.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {a.title} · {a.location}
                  </p>
                </div>
                <span
                  className={`ml-auto rounded-full px-2.5 py-1 text-[11px] ${a.available ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`}
                >
                  {a.available ? "Available" : "On a job"}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{a.bio}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <ReliabilityBar score={a.reliability} />
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {a.projects} projects · {a.onTime}% on time
                </span>
                <Link
                  to="/associates/$associateId"
                  params={{ associateId: a.id }}
                  className="font-semibold text-primary hover:underline"
                >
                  View profile →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}