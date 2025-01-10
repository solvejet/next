// src/app/layout.tsx
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { Header } from "@/components/layout/Header/Header";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { UnderConstruction } from "@/components/UnderConstruction";

// Initialize font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Get environment variables with fallbacks
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solvejet.net";

// Create verification object conditionally
const verificationObj: NonNullable<Metadata["verification"]> = {};

if (process.env.NEXT_PUBLIC_GSC_VERIFICATION) {
  verificationObj.google = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
}

if (process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION) {
  verificationObj.other = {
    ...verificationObj.other,
    "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  };
}

if (process.env.NEXT_PUBLIC_YAHOO_SITE_VERIFICATION) {
  verificationObj.yahoo = process.env.NEXT_PUBLIC_YAHOO_SITE_VERIFICATION;
}

if (process.env.NEXT_PUBLIC_NORTON_SITE_VERIFICATION) {
  verificationObj.other = {
    ...verificationObj.other,
    "norton-safeweb": process.env.NEXT_PUBLIC_NORTON_SITE_VERIFICATION,
  };
}

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: "SolveJet | Custom Software Development Company",
    template: "%s | SolveJet",
  },
  description:
    "SolveJet is an ISO certified custom Software Development Company specializing in enterprise solutions, web applications, and digital transformation.",
  applicationName: "SolveJet",
  keywords: [
    "Software development company",
    "Custom software development",
    "Enterprise solutions",
    "Web development",
    "Mobile app development",
    "Digital transformation",
    "IT consulting",
    "Cloud solutions",
    "Software engineering",
    "Technology solutions",
  ],
  authors: [{ name: "Karan Shah", url: siteUrl }],
  creator: "SolveJet",
  publisher: "SolveJet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    siteName: "SolveJet",
    title: "SolveJet | Custom Software Development Company",
    description:
      "Enterprise-grade software solutions for digital transformation",
    url: siteUrl,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SolveJet - Custom Software Development Company",
      },
    ],
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    nocache: process.env.NODE_ENV === "production" ? false : true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "SolveJet | Custom Software Development",
    description:
      "Enterprise-grade software solutions for digital transformation",
    creator: "@solvejet",
    images: ["/og-image.jpg"],
  },
  ...(Object.keys(verificationObj).length > 0 && {
    verification: verificationObj,
  }),
  category: "technology",
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#2c2e35" },
  ],
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Convert string to boolean properly
  const isUnderConstruction = process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} antialiased`}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2c2e35" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AnalyticsProvider>
            {isUnderConstruction ? (
              <UnderConstruction />
            ) : (
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 pt-[96px]">{children}</main>
              </div>
            )}
            <ThemeSwitcher />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
