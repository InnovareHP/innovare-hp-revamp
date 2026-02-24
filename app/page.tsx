import type { Metadata } from "next";
import Script from "next/script";
import LandingPage from "../components/LandingPage/LandingPage";

const SITE_URL = "https://innovarehp.com";

export const metadata: Metadata = {
  title: "Innovare HP | Healthcare Marketing & Growth Strategy",
  description:
    "Innovare HP: Healthcare marketing & brand strategy for senior care, behavioral health, and clinical organizations.",
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
  "@type": "ProfessionalService",
  name: "Innovare HP",
  alternateName: "Innovare HP | Healthcare Marketing & Growth Strategy",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  description:
    "Innovare HP: Healthcare marketing & brand strategy for senior care, behavioral health, and clinical organizations.",
  foundingDate: "2020",
  priceRange: "$$",
  telephone: "+1-269-501-4496",
  email: "hello@innovarehp.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4221 Bud Drive NE",
    addressLocality: "Comstock Park",
    addressRegion: "MI",
    postalCode: "49321",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "US",
  },
  knowsAbout: [
    "Healthcare Marketing",
    "Senior Care Marketing",
    "Behavioral Health Marketing",
    "Healthcare Brand Strategy",
    "Referral Development",
    "Community Outreach",
    "Healthcare Growth Strategy",
  ],
  sameAs: [
    "https://www.linkedin.com/company/innovarehp",
    "https://www.instagram.com/innovarehp/",
    "https://www.facebook.com/innovarehp",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-269-501-4496",
    email: "hello@innovarehp.com",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
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
  // const postsWithRelativeTime = LinkInPost();

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

      <LandingPage />
    </>
  );
}
