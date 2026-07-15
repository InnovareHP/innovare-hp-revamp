export type PortfolioCategory =
  | "Senior Care"
  | "Behavioral Health"
  | "Clinical"
  | "Service Provider";

export type PortfolioProject = {
  id: string;
  name: string;
  category: PortfolioCategory;
  summary: string;
  image: string | null;
  url: string;
  year: number;
  tags: string[];
  accent: string;
  results: { label: string; value: string }[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "centerline-billing",
    name: "Centerline Billing & Consulting",
    category: "Service Provider",
    summary:
      "Conversion-focused redesign with strategic SEO and lead-capture flows that doubled qualified inbound traffic.",
    image: null,
    url: "https://centerlinebilling.com",
    year: 2025,
    tags: ["Next.js", "SEO", "Lead Gen", "CMS"],
    accent: "from-cyan-500/30 via-sky-500/10 to-transparent",
    results: [
      { label: "Organic traffic", value: "+248%" },
      { label: "Lead conversion", value: "5.8x" },
    ],
  },
  {
    id: "helping-with-moms",
    name: "Helping With Mom's Home",
    category: "Senior Care",
    summary:
      "Warm, accessible site for a senior care provider — referral pipelines, multilingual content, and ADA-compliant UX.",
    image: null,
    url: "#",
    year: 2025,
    tags: ["WCAG 2.2", "Local SEO", "Referrals"],
    accent: "from-emerald-500/30 via-teal-500/10 to-transparent",
    results: [
      { label: "Referrals / mo", value: "+62%" },
      { label: "Page speed", value: "98/100" },
    ],
  },
  {
    id: "care-provider-solutions",
    name: "Care Provider Solutions",
    category: "Service Provider",
    summary:
      "Modern web platform with integrated CRM, content authority hub, and automated provider onboarding.",
    image: null,
    url: "#",
    year: 2024,
    tags: ["Next.js", "CRM", "Automation"],
    accent: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
    results: [
      { label: "Onboarding time", value: "-71%" },
      { label: "MQLs / qtr", value: "3.2x" },
    ],
  },
  {
    id: "behavioral-health-center",
    name: "Heartland Behavioral Health",
    category: "Behavioral Health",
    summary:
      "Stigma-aware brand site with secure intake forms, telehealth scheduling, and clinician-vetted resource library.",
    image: null,
    url: "#",
    year: 2024,
    tags: ["HIPAA-aware", "Intake Forms", "Telehealth"],
    accent: "from-blue-500/30 via-indigo-500/10 to-transparent",
    results: [
      { label: "Intake completion", value: "+184%" },
      { label: "Bounce rate", value: "-43%" },
    ],
  },
  {
    id: "clinic-network",
    name: "Lakeshore Clinical Network",
    category: "Clinical",
    summary:
      "Multi-location clinic platform — provider directory, dynamic locations map, and conversion-optimized landing pages.",
    image: null,
    url: "#",
    year: 2025,
    tags: ["Multi-site", "Maps", "Directory"],
    accent: "from-rose-500/30 via-orange-500/10 to-transparent",
    results: [
      { label: "Booked appts", value: "+312%" },
      { label: "CTR", value: "8.9%" },
    ],
  },
  {
    id: "senior-living-community",
    name: "Riverside Senior Living",
    category: "Senior Care",
    summary:
      "Premium senior living brand experience — virtual tours, family resource center, and tour-request automation.",
    image: null,
    url: "#",
    year: 2024,
    tags: ["Virtual Tours", "Family Portal", "CRM"],
    accent: "from-amber-500/30 via-yellow-500/10 to-transparent",
    results: [
      { label: "Tour requests", value: "+96%" },
      { label: "Occupancy", value: "+18%" },
    ],
  },
];

export const portfolioCategories: ("All" | PortfolioCategory)[] = [
  "All",
  "Senior Care",
  "Behavioral Health",
  "Clinical",
  "Service Provider",
];
