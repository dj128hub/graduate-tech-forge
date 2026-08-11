import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { submissions as seedSubmissions, type Submission } from "@/data/platform";

const title = "Work review queue — Digitize";
const description =
  "Associates submit completed work to Digitize for internal review. Nothing reaches a business client until it passes the checklist.";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ReviewsPage,
});

const statusStyles: Record<Submission["status"], string> = {
  "Awaiting review": "bg-primary/15 text-primary",
  "Changes requested": "bg-destructive/15 text-destructive",
  Approved: "bg-secondary text-foreground",
  Delivered: "bg-secondary text-muted-foreground",
};

function ReviewsPage() {
  const [items, setItems] = useState<Submission[]>(seedSubmissions);
  const [filter, setFilter] = useState<"All" | Submission["status"]>("All");

  const shown = filter === "All" ? items : items.filter((i) => i.status === filter);

  function setStatus(id: string, status: Submission["status"]) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    toast.success(`${id} marked ${status.toLowerCase()}`);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Internal review
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Work submission queue</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Technical associates submit completed work here first. Digitize checks it against the
          delivery checklist, requests changes if needed, and only then releases it to the business.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {(["All", "Awaiting review", "Changes requested", "Approved", "Delivered"] as const).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3 py-1.5 text-xs ${filter === f ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}
              >
                {f}
              </button>
            ),
          )}
        </div>

        <div className="mt-8 space-y-4">
          {shown.map((s) => (
            <article key={s.id} className="surface-panel rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {s.id} · {s.service} · submitted {s.submitted}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">{s.project}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.associate} → {s.client}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[s.status]}`}
                >
                  {s.status}
                </span>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">{s.notes}</p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {s.checklist.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-sm">
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${c.done ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}
                    >
                      {c.done ? "✓" : "•"}
                    </span>
                    <span className={c.done ? "text-muted-foreground" : "text-foreground"}>
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setStatus(s.id, "Approved")}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Approve
                </button>
                <button
                  onClick={() => setStatus(s.id, "Changes requested")}
                  className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
                >
                  Request changes
                </button>
                <button
                  onClick={() => setStatus(s.id, "Delivered")}
                  className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
                >
                  Send to client
                </button>
              </div>
            </article>
          ))}
          {shown.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing in this state right now.</p>
          ) : null}
        </div>
      </div>
    </SiteLayout>
  );
}