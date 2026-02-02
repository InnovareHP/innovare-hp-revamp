import type { Metadata } from "next";
import LandingPage from "../components/LandingPage/LandingPage";
import { LinkInPost } from "./action/landing-page";

const SITE_URL = "https://www.innovarehp.com";

export const metadata: Metadata = {
  title: "Healthcare Marketing & Growth Strategy",
  description:
    "Innovare HP delivers intelligent healthcare marketing, community outreach, referral development, and brand strategy for senior care, behavioral health, and clinical organizations. Full-service healthcare marketing that empowers brands to lead.",
  openGraph: {
    title: "Healthcare Marketing & Growth Strategy",
    description:
      "Full-service healthcare marketing for senior care, behavioral health, and clinical organizations. Trusted strategy, referrals, and growth.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    title: "Healthcare Marketing & Growth Strategy",
    description:
      "Full-service healthcare marketing for organizations that want to lead—not follow.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Innovare HP",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    "Innovare HP delivers intelligent healthcare marketing, community outreach, referral development, and brand strategy for senior care, behavioral health, and clinical organizations.",
  foundingDate: "2020",
  sameAs: [
    "https://www.linkedin.com/company/innovarehp",
    "https://twitter.com/innovarehp",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@innovarehp.com",
    contactType: "customer service",
    areaServed: "US",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Innovare HP",
  url: SITE_URL,
  description:
    "Healthcare marketing and growth strategy for senior care, behavioral health, and clinical organizations.",
  publisher: {
    "@type": "Organization",
    name: "Innovare HP",
    logo: `${SITE_URL}/images/logo.png`,
  },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/events?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function Home() {
  const postsWithRelativeTime = LinkInPost();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <LandingPage posts={postsWithRelativeTime} />
    </>
  );
}
