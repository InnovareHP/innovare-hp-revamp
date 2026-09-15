import { Provider } from "@/components/Provider";
import { ToasterA11y } from "@/components/ToasterA11y";
import { Toaster } from "@/components/ui/sonner";
import { KeyWords } from "@/lib/const";
import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

// Primary typeface of the redesigned site (matches the Figma source).
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://innovarehp.com"),
  title: {
    default: "Innovare HP | Healthcare Marketing & Growth Strategy",
    template: "%s | Innovare HP",
  },
  description:
    "Innovare HP: Healthcare marketing & brand strategy for senior care, behavioral health, and clinical organizations.",
  applicationName: "Innovare HP",
  generator: "Next.js",
  keywords: KeyWords,
  authors: [{ name: "Innovare HP" }],
  creator: "Innovare HP",
  publisher: "Innovare HP",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://innovarehp.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://innovarehp.com",
    siteName: "Innovare HP | Healthcare Marketing & Growth Strategy",
    title: "Innovare HP | Healthcare Marketing & Growth Strategy",
    description:
      "Strategic healthcare marketing, serving senior care, behavioral health, and clinical organizations.",
    images: [
      {
        url: "/images/og-image.jpg", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "Innovare HP Healthcare Marketing",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Innovare HP | Healthcare Marketing & Growth Strategy",
    description:
      "Healthcare marketing built on trust, referrals, and intelligent digital strategy.",
    images: ["/images/og-image.jpg"],
    creator: "@innovarehp", // optional
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  category: "Healthcare Marketing",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} font-sans antialiased`}>
        <Provider>{children}</Provider>
        <Toaster />
        <ToasterA11y />
      </body>
    </html>
  );
}
