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

function ADABanner() {
  return (
    <div className="bg-blue-900 text-white pt-3 pb-4 sm:py-3 md:py-2.5 px-3 sm:px-4 md:px-6 min-h-[52px] sm:min-h-[52px] md:min-h-[52px] flex items-center">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-normal text-center flex-wrap">
        {/* NEW EVENTS NOTICE */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] sm:text-xs font-semibold tracking-wide">
            NEW
          </span>
          <a
            href="#events"
            className="underline hover:text-gray-200 font-medium whitespace-nowrap"
          >
            Check out our new Events feature →
          </a>
        </div>

        {/* Divider (hidden on mobile) */}
        <span className="hidden sm:inline-block mx-3 text-white/40">|</span>

        {/* ADA NOTICE */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 sm:w-4 sm:h-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>

          <span>
            We are committed to ADA compliance and aim to make our website
            accessible to all users. Email us at{" "}
            <a
              href="mailto:hello@innovarehp.com"
              className="underline hover:text-gray-200 whitespace-nowrap"
            >
              hello@innovarehp.com
            </a>{" "}
            if you encounter any issues.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${signika.variable} antialiased`}>
        <Provider>
          {" "}
          <ADABanner />
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
