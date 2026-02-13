import type { Metadata } from "next";
import Script from "next/script";
import LandingPage from "../components/LandingPage/LandingPage";
import { LinkInPost } from "./action/landing-page";

const SITE_URL = "https://www.innovarehp.com";

export const metadata: Metadata = {
  title: "Innovare HP | Healthcare Marketing & Growth Strategy",
  description:
    "Innovare HP delivers intelligent healthcare marketing, community outreach, referral development, and brand strategy for senior care, behavioral health, and clinical organizations.",
  openGraph: {
    title: "Innovare HP | Healthcare Marketing & Growth Strategy",
    description:
      "Full-service healthcare marketing for senior care, behavioral health, and clinical organizations.",
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
  name: "Innovare HP | Healthcare Marketing & Growth Strategy",
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
  name: "Innovare HP | Healthcare Marketing & Growth Strategy",
  url: SITE_URL,
  description:
    "Healthcare marketing and growth strategy for senior care, behavioral health, and clinical organizations.",
  publisher: {
    "@type": "Organization",
    name: "Innovare HP | Healthcare Marketing & Growth Strategy",
    logo: `${SITE_URL}/images/logo.png`,
  },
  inLanguage: "en-US",
};

export default async function Home() {
  const postsWithRelativeTime = LinkInPost();

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        content={JSON.stringify(organizationJsonLd)}
      />

      {/* Website Schema */}
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        content={JSON.stringify(websiteJsonLd)}
      />

      <LandingPage posts={postsWithRelativeTime} />
    </>
  );
}
