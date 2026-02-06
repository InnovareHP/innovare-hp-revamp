import { SITE_URL } from "./constants";

export const baseOrganizationSchema = {
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

export const baseWebsiteSchema = {
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

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: baseOrganizationSchema,
    image: article.image ? [article.image] : [],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

export function generateEventSchema(event: {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  status: string;
  image?: string;
  maxGuests: number;
  currentAttendees: number;
  registrationDeadline?: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate?.toISOString(),
    eventStatus:
      event.status === "PUBLISHED"
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventCancelled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location,
        addressCountry: "US",
      },
    },
    image: event.image ? [event.image] : [],
    organizer: baseOrganizationSchema,
    offers:
      event.maxGuests > 0
        ? {
            "@type": "Offer",
            url: `${SITE_URL}/events/${event.id}`,
            price: "0",
            priceCurrency: "USD",
            availability:
              event.currentAttendees < event.maxGuests
                ? "https://schema.org/InStock"
                : "https://schema.org/SoldOut",
            validFrom: new Date().toISOString(),
            validThrough: event.registrationDeadline?.toISOString(),
          }
        : undefined,
  };
}

// Helper component for rendering schemas
export function SchemaScript({ schema }: { schema: object }) {
  return (
    <script
      id="schema-jsonld"
      type="application/ld+json"
      content={JSON.stringify(schema)}
    />
  );
}
