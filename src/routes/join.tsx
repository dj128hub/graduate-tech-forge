import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { services } from "@/data/platform";

const title = "Become a Digital Associate — Digitize";
const description =
  "Apply to join Digitize as a Digital Associate: build real projects for small businesses, grow your portfolio and earn while you learn.";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: JoinPage,
});

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Tell us your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  location: z.string().trim().min(2, "Where are you based?").max(100),
  study: z.string().trim().min(2, "Add your degree or course").max(120),
  graduation: z.string().trim().min(4, "Add your graduation year").max(20),
  availability: z.string().trim().min(1, "Choose your availability"),
  skills: z.string().trim().min(3, "List at least a few skills").max(300),
  portfolio: z.string().trim().max(255).optional(),
  about: z.string().trim().min(20, "Give us a sentence or two about you").max(1500),
});

const field =
  "mt-2 w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

const availabilities = ["Up to 5 hrs / week", "5 to 15 hrs / week", "15 to 30 hrs / week", "Full time"];

function JoinPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = applicationSchema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields");
      return;
    }
    setErrors({});
    setSent(true);
    toast.success("Application received — we'll be in touch within two working days");
  }

  if (sent) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="text-3xl font-semibold">Application received</h1>
          <p className="mt-4 text-muted-foreground">
            Thanks for applying. We review every application by hand, then invite you to a short intro call
            before matching you with your first small-business project.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/associates"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              See current associates
            </Link>
            <Link to="/" className="rounded-md border border-border px-4 py-2 text-sm font-semibold">
              Back home
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Join Digitize</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Become a Digital Associate</h1>
        <p className="mt-3 text-muted-foreground">
          Tell us about your skills and availability. We match associates to real paid work with small
          businesses, review every submission, and build your reliability score as you deliver.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Row label="Full name" name="name" error={errors['name']} placeholder="Jane Smith" />
            <Row label="Email" name="email" type="email" error={errors['email']} placeholder="jane@email.com" />
            <Row label="Location" name="location" error={errors['location']} placeholder="Leeds, UK" />
            <Row label="Degree / course" name="study" error={errors['study']} placeholder="BSc Computer Science" />
            <Row label="Graduation year" name="graduation" error={errors['graduation']} placeholder="2026" />
            <label className="block">
              <span className="text-sm font-medium">Availability</span>
              <select name="availability" className={field} defaultValue={availabilities[1]}>
                {availabilities.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              {errors['availability'] ? (
                <span className="mt-1 block text-xs text-destructive">{errors['availability']}</span>
              ) : null}
            </label>
          </div>

          <Row
            label="Your skills"
            name="skills"
            error={errors['skills']}
            placeholder="React, Tailwind, Shopify, Python automation"
          />
          <p className="-mt-4 text-xs text-muted-foreground">
            Services we most often need: {services.map((s) => s.name).join(", ")}.
          </p>

          <Row
            label="Portfolio or GitHub (optional)"
            name="portfolio"
            error={errors['portfolio']}
            placeholder="https://github.com/yourname"
          />

          <label className="block">
            <span className="text-sm font-medium">About you</span>
            <textarea
              name="about"
              rows={5}
              placeholder="What you've built, what you want to learn, and the kind of businesses you'd like to help."
              className={field}
            />
            {errors['about'] ? (
              <span className="mt-1 block text-xs text-destructive">{errors['about']}</span>
            ) : null}
          </label>

          <button
            type="submit"
            className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Submit application
          </button>
        </form>
      </div>
    </SiteLayout>
  );
}

function Row({
  label,
  name,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  error?: string | undefined;
  placeholder?: string | undefined;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input name={name} type={type} placeholder={placeholder} className={field} />
      {error ? <span className="mt-1 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
