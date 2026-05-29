import FieldNotes from "@/components/LandingPage/FieldNotes/FieldNotes";
import type { Metadata } from "next";

const SITE_URL = "https://www.innovarehp.com";

export const metadata: Metadata = {
  title: "Field Notes | Healthcare Articles & Insights",
  description:
    "A curated collection of healthcare industry articles covering strategy, marketing, behavioral health, senior care, and more from trusted sources.",
  keywords: [
    "healthcare articles",
    "healthcare marketing insights",
    "senior care industry news",
    "behavioral health resources",
    "healthcare industry trends",
  ],
  openGraph: {
    title: "Field Notes| Innovare HP",
    description:
      "Curated healthcare industry articles and insights from trusted sources.",
    url: `${SITE_URL}/field-notes`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Innovare HP Field Notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes | Innovare HP",
    description:
      "Curated healthcare industry articles and insights from trusted sources.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/field-notes`,
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Innovare HP Field Notes",
  description:
    "Curated healthcare industry articles and insights from trusted sources",
  url: `${SITE_URL}/field-notes`,
  publisher: {
    "@type": "Organization",
    name: "Innovare HP",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
    },
  },
  inLanguage: "en-US",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Field Notes",
      item: `${SITE_URL}/field-notes`,
    },
  ],
};

const page = () => {
  return (
    <>
      {/* Blog Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <FieldNotes />
    </>
  );
};

export default page;
