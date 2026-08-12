import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const title = "Digitize — Digital support by computer science graduates";
const description =
  "Digitize connects small businesses with computer science graduates for websites, maintenance, payments, inventory, ecommerce and automation.";

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

const solutions = [
  { id: "website", glyph: "◇", name: "Website creation" },
  { id: "maintenance", glyph: "↻", name: "Website maintenance" },
  { id: "payments", glyph: "£", name: "Digital payments" },
  { id: "inventory", glyph: "▣", name: "Inventory systems" },
  { id: "ecommerce", glyph: "▤", name: "Ecommerce setup" },
  { id: "ai", glyph: "✦", name: "AI and automation" },
];

const industries = [
  "Retail & ecommerce",
  "Food & hospitality",
  "Professional services",
  "Health & wellbeing",
  "Construction & trades",
  "Other",
];

const sizes = ["1", "2 to 5", "6 to 20", "21 to 50", "51 plus"];

const tiers = [
  { id: "starter", name: "Starter", price: "£39", max: 1, points: ["1 digital service", "Email support", "Monthly check-in"] },
  { id: "growth", name: "Growth", price: "£79", max: 3, points: ["Up to 3 services", "Priority support", "Fortnightly check-in"] },
  { id: "pro", name: "Pro", price: "£129", max: 6, points: ["All 6 services", "Dedicated support", "Weekly check-in"] },
];

type Step = "path" | "explore" | "solutions" | "details" | "plans" | "checkout" | "done";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <img src="/digitize-logo.png" alt="Digitize logo" className="h-10 w-10 rounded-xl" />
          <span className="text-lg font-bold tracking-tight">Digitize</span>
        </Link>
        <span className="text-xs font-semibold tracking-wide">Choose your path</span>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-8">{children}</main>
      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-xs font-semibold text-white/80">
        <span>© 2026 Digitize</span>
        <span>Digital support · Graduate opportunity</span>
      </footer>
    </div>
  );
}

function Panel({ eyebrow, heading, sub, children }: { eyebrow: string; heading: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="surface-panel glow-teal w-full max-w-4xl rounded-3xl p-6 sm:p-10">
      <img
        src="/digitize-logo.png"
        alt="Digitize logo"
        className="mx-auto mb-5 h-20 w-20 rounded-2xl shadow-lg"
      />
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">{eyebrow}</p>
      <h1 className="mt-3 text-center text-3xl font-bold sm:text-5xl">{heading}</h1>
      {sub ? <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/85">{sub}</p> : null}
      <div className="mt-8">{children}</div>
    </div>
  );
}

const cardBtn =
  "w-full rounded-full bg-[var(--teal-deep)] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90";

function Index() {
  const [step, setStep] = useState<Step>("path");
  const [picked, setPicked] = useState<string[]>(["website", "maintenance", "payments"]);
  const [industry, setIndustry] = useState<string>(industries[0]!);
  const [size, setSize] = useState<string>(sizes[2]!);
  const [tier, setTier] = useState("growth");

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const recommended = tiers.find((t) => picked.length <= t.max) ?? tiers[2]!;
  const chosenTier = tiers.find((t) => t.id === tier) ?? recommended;


  if (step === "path") {
    return (
      <Shell>
        <Panel eyebrow="One platform. Three ways in." heading="How can Digitize help you?">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="flex flex-col rounded-2xl bg-white p-6 text-[var(--ink)] shadow-xl">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--accent)] text-[var(--teal-deep)]">▣</span>
              <h2 className="mt-5 text-2xl font-bold">I own a business</h2>
              <p className="mt-2 flex-1 text-sm text-[var(--ink-muted)]">
                Get affordable digital support for your business.
              </p>
              <button className={`${cardBtn} mt-6`} onClick={() => setStep("solutions")}>
                Get Digital Support →
              </button>
            </div>
            <div className="flex flex-col rounded-2xl bg-white p-6 text-[var(--ink)] shadow-xl">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--accent)] text-[var(--teal-deep)]">◇</span>
              <h2 className="mt-5 text-2xl font-bold">I'm starting out in tech</h2>
              <p className="mt-2 flex-1 text-sm text-[var(--ink-muted)]">
                Computer science graduate? Build real experience, earn money and grow your portfolio.
              </p>
              <Link to="/join" className={`${cardBtn} mt-6 block text-center`}>
                Become a Digital Associate →
              </Link>
            </div>
            <div className="flex flex-col rounded-2xl bg-white p-6 text-[var(--ink)] shadow-xl">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--accent)] text-[var(--teal-deep)]">↗</span>
              <h2 className="mt-5 text-2xl font-bold">Explore Digitize</h2>
              <p className="mt-2 flex-1 text-sm text-[var(--ink-muted)]">
                Browse services, pricing, associates and the work review board.
              </p>
              <button className={`${cardBtn} mt-6`} onClick={() => setStep("explore")}>
                Explore →
              </button>
            </div>
          </div>
        </Panel>
      </Shell>
    );
  }

  if (step === "explore") {
    return (
      <Shell>
        <Panel eyebrow="Explore the platform" heading="Where to next?" sub="Jump straight to any section of the site.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ExploreLink to="/" label="Home" />
            <ExploreLink to="/services" label="Services" />
            <ExploreLink to="/pricing" label="Pricing" />
            <ExploreLink to="/associates" label="Associates" />
            <ExploreLink to="/reviews" label="Work review" />
            <ExploreLink to="/request" label="Request a service" />
            <ExploreLink to="/join" label="Become an associate" />
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => setStep("path")} className="text-sm font-semibold underline">
              Back to start
            </button>
          </div>
        </Panel>
      </Shell>
    );
  }

  if (step === "solutions") {
    return (
      <Shell>
        <Panel
          eyebrow="Select your solutions"
          heading="What can we help with?"
          sub="Choose one or more. Three popular solutions are selected to get you started."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => {
              const on = picked.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
                    on
                      ? "border-white bg-white text-[var(--ink)]"
                      : "border-white/40 bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <span className="text-lg">{s.glyph}</span>
                  <span className="flex-1 text-sm font-semibold">{s.name}</span>
                  {on ? <span className="text-[var(--teal-deep)]">✓</span> : null}
                </button>
              );
            })}
          </div>
          <Nav
            back={() => setStep("path")}
            next={() => setStep("details")}
            nextLabel={`Continue · ${picked.length} selected →`}
            disabled={picked.length === 0}
          />
        </Panel>
      </Shell>
    );
  }

  if (step === "details") {
    return (
      <Shell>
        <Panel
          eyebrow="Business details"
          heading="Tell us about your business"
          sub="Two quick details help us recommend the right level of support."
        >
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold">What industry is your business in?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {industries.map((i) => (
                  <Chip key={i} on={i === industry} onClick={() => setIndustry(i)} label={i} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">How many employees do you have?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <Chip key={s} on={s === size} onClick={() => setSize(s)} label={s} />
                ))}
              </div>
            </div>
          </div>
          <Nav
            back={() => setStep("solutions")}
            next={() => {
              setTier(recommended.id);
              setStep("plans");
            }}
            nextLabel="See my recommendation →"
          />
        </Panel>
      </Shell>
    );
  }

  if (step === "plans") {
    return (
      <Shell>
        <Panel
          eyebrow="Choose your subscription"
          heading="Simple plans. Clear support."
          sub={`Based on ${industry.toLowerCase()} · ${size} employees · ${picked.length} selected services.`}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((t) => {
              const selected = t.id === tier;
              return (
                <div
                  key={t.id}
                  className={`rounded-2xl p-5 ${
                    selected ? "bg-white text-[var(--ink)] shadow-xl" : "bg-white/10 text-white"
                  }`}
                >
                  {recommended.id === t.id ? (
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--teal-deep)]">
                      Recommended for you
                    </p>
                  ) : (
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Plan</p>
                  )}
                  <p className="mt-2 text-xl font-bold">{t.name}</p>
                  <p className="mt-1 text-3xl font-bold">
                    {t.price}
                    <span className="text-sm font-medium opacity-70"> /month</span>
                  </p>
                  <ul className="mt-4 space-y-1 text-sm opacity-90">
                    {t.points.map((p) => (
                      <li key={p}>· {p}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setTier(t.id)}
                    className={`mt-5 w-full rounded-full px-4 py-2 text-sm font-bold ${
                      selected
                        ? "bg-[var(--teal-deep)] text-white"
                        : "border border-white/50 text-white hover:bg-white/15"
                    }`}
                  >
                    {selected ? "Selected" : `Select ${t.name}`}
                  </button>
                </div>
              );
            })}
          </div>
          <Nav
            back={() => setStep("details")}
            next={() => setStep("checkout")}
            nextLabel={`Continue with ${chosenTier.name} →`}
          />
        </Panel>
      </Shell>
    );
  }

  if (step === "checkout") {
    return (
      <Shell>
        <Panel
          eyebrow="Secure checkout"
          heading="Almost there"
          sub="This is a demonstration checkout. No payment will be taken."
        >
          <form
            className="mx-auto max-w-md space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("done");
            }}
          >
            <Field label="Cardholder name" placeholder="Jane Smith" />
            <Field label="Card number" placeholder="4242 4242 4242 4242" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" placeholder="MM/YY" />
              <Field label="CVC" placeholder="123" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <button type="button" onClick={() => setStep("plans")} className="text-sm font-semibold underline">
                Back
              </button>
              <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--teal-deep)]">
                Confirm Subscription →
              </button>
            </div>
          </form>
        </Panel>
      </Shell>
    );
  }

  return (
    <Shell>
      <Panel eyebrow="Subscription active" heading="Welcome to Digitize" sub="Your subscription is active. We are assigning your Digital Associate.">
        <div className="mx-auto max-w-md space-y-3 rounded-2xl bg-white p-6 text-[var(--ink)]">
          <Row label="Chosen services" value={picked.map((p) => solutions.find((s) => s.id === p)?.name).join(", ")} />
          <Row label="Subscription" value={`${chosenTier.name} · ${chosenTier.price}/month`} />
          <Row label="Expected contact" value="Within 1 business day" />
        </div>
        <div className="mt-6 text-center">
          <button onClick={() => setStep("path")} className="text-sm font-semibold underline">
            Return to Digitize homepage
          </button>
        </div>
      </Panel>
    </Shell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-2 last:border-0">
      <span className="text-xs font-bold uppercase tracking-wide text-[var(--ink-muted)]">{label}</span>
      <span className="text-right text-sm font-semibold">{value}</span>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-white/85">{label}</span>
      <input
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-white/40 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </label>
  );
}

function ExploreLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to as never}
      className="flex items-center justify-between rounded-2xl bg-white p-4 text-sm font-bold text-[var(--ink)] shadow-sm transition-transform hover:scale-[1.02]"
    >
      {label}
      <span className="text-[var(--teal-deep)]">→</span>
    </Link>
  );
}

function Chip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
        on ? "border-white bg-white text-[var(--ink)]" : "border-white/40 text-white hover:bg-white/15"
      }`}
    >
      {label}
    </button>
  );
}

function Nav({
  back,
  next,
  nextLabel,
  disabled,
}: {
  back: () => void;
  next: () => void;
  nextLabel: string;
  disabled?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <button onClick={back} className="text-sm font-semibold underline">
        Back
      </button>
      <button
        onClick={next}
        disabled={disabled}
        className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--teal-deep)] disabled:opacity-50"
      >
        {nextLabel}
      </button>
    </div>
  );
}
