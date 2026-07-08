import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { CookieConsent } from "@/components/ui/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Mytosis AI";
const description =
  "Hotel AI infrastructure by Blackcrest Scaling — AI voice and chat agents that turn missed calls into direct bookings.";
const siteUrl = "https://www.mytosis.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mytosis AI — Hotel AI Infrastructure | Voice & Chat Agents for Hotel Groups",
    template: "%s | Mytosis",
  },
  description,
  keywords: [
    "hotel AI voice agent",
    "AI hotel receptionist",
    "reduce OTA commission",
    "hotel direct booking AI",
    "hotel missed call solution",
    "hotel PMS AI integration",
    "Mews AI",
    "Cloudbeds AI",
    "OPERA Cloud AI",
    "hotel chat agent WhatsApp",
    "hotel revenue infrastructure",
  ],
  authors: [{ name: "Blackcrest Scaling", url: "https://www.blackcrestscaling.com" }],
  creator: "Blackcrest Scaling",
  publisher: "Blackcrest Scaling",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: "Mytosis",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background font-sans`}>
        <OrganizationSchema />
        <FAQSchema />
        <main>
          {children}
        </main>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
