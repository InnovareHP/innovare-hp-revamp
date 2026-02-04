import type { Metadata } from "next";
import FieldNotes from "@/components/LandingPage/FieldNotes/FieldNotes";

const SITE_URL = "https://www.innovarehp.com";

export const metadata: Metadata = {
  title: "Healthcare Marketing Insights & Field Notes",
  description:
    "Expert insights on healthcare marketing, behavioral health strategies, senior care trends, and clinical marketing best practices from Innovare HP's field notes.",
  keywords: [
    "healthcare marketing insights",
    "medical marketing blog",
    "senior care marketing tips",
    "behavioral health strategies",
    "healthcare industry trends",
  ],
  openGraph: {
    title: "Healthcare Marketing Insights & Field Notes | Innovare HP",
    description:
      "Expert insights and field notes on healthcare marketing strategies, trends, and best practices.",
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
    title: "Healthcare Marketing Insights | Innovare HP",
    description:
      "Expert insights on healthcare marketing strategies and trends.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/field-notes`,
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Innovare HP Field Notes",
  description: "Healthcare marketing insights and industry analysis",
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
