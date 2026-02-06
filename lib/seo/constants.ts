export const SITE_URL = "https://www.innovarehp.com";
export const SITE_NAME = "Innovare HP";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/innovarehp",
  twitter: "https://twitter.com/innovarehp",
};

export const CONTACT_EMAIL = "hello@innovarehp.com";

export const DEFAULT_METADATA = {
  siteName: SITE_NAME,
  locale: "en_US" as const,
  type: "website" as const,
};

export const ROBOTS_ALLOW_ALL = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const ROBOTS_NOINDEX = {
  index: false,
  follow: false,
};
