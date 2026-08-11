import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { associates, services } from "@/data/platform";

const title = "Request a service — Digitize";
const description =
  "Tell Digitize what your business needs and we'll match you with the technical associate whose skills fit the job.";

const searchSchema = z.object({
  service: z.string().optional(),
  associate: z.string().optional(),
});

export const Route = createFileRoute("/request")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: RequestPage,
});

const requestSchema = z.object({
  business: z.string().trim().min(2, "Tell us your business name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  service: z.string().trim().min(1, "Choose a service"),
  budget: z.string().trim().max(60).optional(),
  deadline: z.string().trim().max(60).optional(),
  associate: z.string().optional(),
  details: z.string().trim().min(20, "Give us at least a sentence or two").max(1500),
});

const field =
  "mt-2 w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

function RequestPage() {
  const search = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = requestSchema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields");
      return;
    }
    setErrors({});
    setSent(true);
    toast.success("Request received — we'll match an associate within one working day");
  }

  if (sent) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="text-3xl font-semibold">Request received</h1>
          <p className="mt-4 text-muted-foreground">
            Digitize will review the brief, match a technical associate to your requirements and
            come back with a scope and once-off quote.
          </p>
          <Link
            to="/associates"
            className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Meet the associates
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Service request
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Tell us what you need</h1>
        <p className="mt-3 text-muted-foreground">
          Request a listed service or describe something custom. We match the brief to an
          associate's advertised skills and review all work before delivery.
        </p>

        <form onSubmit={onSubmit} className="surface-panel mt-10 space-y-6 rounded-2xl p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              Business name
              <input name="business" className={field} placeholder="Rowan & Fern Florist" />
              {errors["business"] ? (
                <span className="mt-1 block text-xs text-destructive">{errors["business"]}</span>
              ) : null}
            </label>
            <label className="block text-sm">
              Contact email
              <input name="email" className={field} placeholder="you@business.co.uk" />
              {errors["email"] ? (
                <span className="mt-1 block text-xs text-destructive">{errors["email"]}</span>
              ) : null}
            </label>
          </div>

          <label className="block text-sm">
            Service required
            <select name="service" defaultValue={search.service ?? ""} className={field}>
              <option value="">Select a service…</option>
              {services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Maintenance subscription">Maintenance subscription</option>
              <option value="Something else">Something else (custom)</option>
              {search.service && !services.some((s) => s.name === search.service) ? (
                <option value={search.service}>{search.service}</option>
              ) : null}
            </select>
            {errors["service"] ? (
              <span className="mt-1 block text-xs text-destructive">{errors["service"]}</span>
            ) : null}
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              Budget (optional)
              <input name="budget" className={field} placeholder="£500 – £1,000" />
            </label>
            <label className="block text-sm">
              Deadline (optional)
              <input name="deadline" className={field} placeholder="Before end of next month" />
            </label>
          </div>

          <label className="block text-sm">
            Preferred associate (optional)
            <select name="associate" defaultValue={search.associate ?? ""} className={field}>
              <option value="">No preference — match me</option>
              {associates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — {a.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            What do you need done?
            <textarea
              name="details"
              rows={6}
              className={field}
              placeholder="Describe the outcome you want, any existing systems, and who will use it."
            />
            {errors["details"] ? (
              <span className="mt-1 block text-xs text-destructive">{errors["details"]}</span>
            ) : null}
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Send request
          </button>
        </form>
      </div>
    </SiteLayout>
  );
}