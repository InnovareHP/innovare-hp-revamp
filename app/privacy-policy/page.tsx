import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";

const SITE_URL = "https://www.innovarehp.com";

export const metadata: Metadata = {
  title: "Privacy Policy - HIPAA Compliant Marketing",
  description:
    "Innovare HP's privacy policy outlines how we protect your data and maintain HIPAA compliance in all healthcare marketing activities.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Innovare HP",
    description:
      "Our commitment to data privacy and HIPAA compliance in healthcare marketing.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

const page = () => {
  return <PrivacyPolicy />;
};

export default page;
