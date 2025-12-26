import { Provider } from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";
import { KeyWords } from "@/lib/const";
import type { Metadata } from "next";
import { Signika, Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const signika = Signika({
  variable: "--font-signika",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.innovarehp.com"), // 🔁 CHANGE
  title: {
    default: "Innovare HP | Healthcare Marketing & Growth Strategy",
    template: "%s | Innovare HP",
  },
  description:
    "Innovare HP delivers intelligent healthcare marketing, community outreach, referral development, and brand strategy for senior care, behavioral health, and clinical organizations.",
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
    canonical: "https://www.innovarehp.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.innovarehp.com",
    siteName: "Innovare HP",
    title: "Innovare HP | Healthcare Marketing & Growth Strategy",
    description:
      "Strategic healthcare marketing rooted in trust, community, and measurable growth. Serving senior care, behavioral health, and clinical organizations.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${signika.variable} antialiased`}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
