export type Associate = {
  id: string;
  name: string;
  title: string;
  location: string;
  initials: string;
  reliability: number;
  projects: number;
  onTime: number;
  skills: string[];
  bio: string;
  available: boolean;
  rate: string;
  portfolio: { name: string; type: string; outcome: string }[];
};

export const associates: Associate[] = [
  {
    id: "amara-okafor",
    name: "Amara Okafor",
    title: "Front-end & Brand Sites",
    location: "Manchester, UK",
    initials: "AO",
    reliability: 98,
    projects: 14,
    onTime: 100,
    rate: "£320 / site build",
    available: true,
    skills: ["React", "Tailwind CSS", "Webflow", "SEO", "Copy layout"],
    bio: "CS graduate specialising in fast, accessible marketing sites for independent retailers and clinics.",
    portfolio: [
      { name: "Rowan & Fern Florist", type: "Website build", outcome: "3x online orders in 8 weeks" },
      { name: "Bexley Dental", type: "Booking page", outcome: "Cut phone bookings admin by 40%" },
    ],
  },
  {
    id: "tom-lindqvist",
    name: "Tom Lindqvist",
    title: "Inventory & Ops Systems",
    location: "Leeds, UK",
    initials: "TL",
    reliability: 95,
    projects: 11,
    onTime: 94,
    rate: "£45 / hr support",
    available: true,
    skills: ["Python", "PostgreSQL", "Inventory systems", "Automation", "Excel migration"],
    bio: "Builds stock tracking and reporting tools for warehouses, cafés and small manufacturers.",
    portfolio: [
      { name: "Northgate Coffee Roasters", type: "Inventory system", outcome: "Stock loss down 22%" },
      { name: "Pike Hardware", type: "Supplier automation", outcome: "6 hours/week saved" },
    ],
  },
  {
    id: "priya-raman",
    name: "Priya Raman",
    title: "Digital Ads & Analytics",
    location: "Birmingham, UK",
    initials: "PR",
    reliability: 92,
    projects: 9,
    onTime: 91,
    rate: "£240 / campaign",
    available: false,
    skills: ["Meta Ads", "Google Analytics", "Motion graphics", "Figma", "A/B testing"],
    bio: "Designs and ships advertisement packages, then reports on what actually converted.",
    portfolio: [
      { name: "Sable Barbers", type: "Ad campaign", outcome: "£4.10 cost per booking" },
      { name: "Loop Cycles", type: "Launch creative", outcome: "18k local reach" },
    ],
  },
  {
    id: "daniel-mensah",
    name: "Daniel Mensah",
    title: "General Tech Support",
    location: "Glasgow, UK",
    initials: "DM",
    reliability: 89,
    projects: 21,
    onTime: 88,
    rate: "£35 / hr support",
    available: true,
    skills: ["Device setup", "Microsoft 365", "Networking", "Cyber hygiene", "Staff training"],
    bio: "First line of defence for small teams: hardware, accounts, backups and the awkward printer.",
    portfolio: [
      { name: "Harbourside Legal", type: "IT onboarding", outcome: "12 staff migrated, zero downtime" },
      { name: "Clay Studio", type: "Backup rollout", outcome: "Recovery time under 1 hour" },
    ],
  },
];

export const services = [
  {
    name: "Website creation",
    price: "from £450 once-off",
    blurb: "A fast, mobile-first site with copy layout, contact capture and analytics wired in.",
    includes: ["Up to 6 pages", "Domain & hosting setup", "Basic SEO", "Two revision rounds"],
  },
  {
    name: "Advertisement packages",
    price: "from £240 once-off",
    blurb: "Creative, targeting and launch for local paid campaigns, with a plain-English results report.",
    includes: ["Ad creative set", "Audience setup", "Landing section", "14-day report"],
  },
  {
    name: "Inventory & internal tools",
    price: "from £600 once-off",
    blurb: "Stock, bookings or job tracking built around how your team already works.",
    includes: ["Data migration", "Custom dashboard", "Staff walkthrough", "30-day tuning"],
  },
  {
    name: "General tech support",
    price: "from £35 / hr",
    blurb: "Devices, accounts, email, backups and security basics handled by a vetted associate.",
    includes: ["Remote or on-site", "Same-week response", "Written fix notes", "Escalation to leads"],
  },
];

export const plans = [
  {
    name: "Essential",
    price: "£49",
    cadence: "/ month",
    for: "Sites that just need to stay online and current.",
    features: ["Hosting & uptime monitoring", "Monthly content updates", "Security patching", "48h response"],
    featured: false,
  },
  {
    name: "Growth",
    price: "£129",
    cadence: "/ month",
    for: "Businesses running a site plus active campaigns.",
    features: [
      "Everything in Essential",
      "4 hours associate time monthly",
      "Ad performance review",
      "Priority matching",
      "24h response",
    ],
    featured: true,
  },
  {
    name: "Operations",
    price: "£299",
    cadence: "/ month",
    for: "Teams relying on inventory or internal tools.",
    features: [
      "Everything in Growth",
      "12 hours associate time monthly",
      "Inventory/tool maintenance",
      "Dedicated associate pair",
      "Same-day response",
    ],
    featured: false,
  },
];

export type Submission = {
  id: string;
  project: string;
  client: string;
  associate: string;
  service: string;
  submitted: string;
  status: "Awaiting review" | "Changes requested" | "Approved" | "Delivered";
  notes: string;
  checklist: { label: string; done: boolean }[];
};

export const submissions: Submission[] = [
  {
    id: "SUB-1041",
    project: "Rowan & Fern — site rebuild",
    client: "Rowan & Fern Florist",
    associate: "Amara Okafor",
    service: "Website creation",
    submitted: "2 hours ago",
    status: "Awaiting review",
    notes: "Final build with checkout links. Mobile menu reworked after internal feedback.",
    checklist: [
      { label: "Mobile responsive", done: true },
      { label: "Accessibility pass", done: true },
      { label: "Analytics installed", done: true },
      { label: "Client copy approved", done: false },
    ],
  },
  {
    id: "SUB-1039",
    project: "Northgate — stock dashboard v2",
    client: "Northgate Coffee Roasters",
    associate: "Tom Lindqvist",
    service: "Inventory system",
    submitted: "Yesterday",
    status: "Changes requested",
    notes: "Low-stock alerts fire twice on bulk imports — needs a debounce before delivery.",
    checklist: [
      { label: "Data migrated", done: true },
      { label: "Alert logic verified", done: false },
      { label: "Staff guide written", done: true },
      { label: "Backup tested", done: true },
    ],
  },
  {
    id: "SUB-1036",
    project: "Sable Barbers — spring campaign",
    client: "Sable Barbers",
    associate: "Priya Raman",
    service: "Advertisement package",
    submitted: "3 days ago",
    status: "Approved",
    notes: "Creative set and targeting signed off. Scheduled for release Monday.",
    checklist: [
      { label: "Creative variants", done: true },
      { label: "Targeting reviewed", done: true },
      { label: "Budget confirmed", done: true },
      { label: "Report template ready", done: true },
    ],
  },
  {
    id: "SUB-1031",
    project: "Harbourside — device onboarding",
    client: "Harbourside Legal",
    associate: "Daniel Mensah",
    service: "Tech support",
    submitted: "Last week",
    status: "Delivered",
    notes: "12 devices provisioned, handover notes sent to office manager.",
    checklist: [
      { label: "Devices provisioned", done: true },
      { label: "Accounts secured", done: true },
      { label: "Handover notes", done: true },
      { label: "Client sign-off", done: true },
    ],
  },
];