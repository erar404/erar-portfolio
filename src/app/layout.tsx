import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
  display: "swap",
  weight: ["400", "500"],
});

/** Public origin for absolute Open Graph URLs. Blank or malformed env values fall through to the next option. */
function resolveSiteUrl(): URL {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  ];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    try {
      return new URL(value.startsWith("http") ? value : `https://${value}`);
    } catch {
      // ignore and try the next candidate
    }
  }
  return new URL("http://localhost:3000");
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Erwin Roy Arellano",
    "software engineer",
    "full-stack developer",
    "Python",
    "FastAPI",
    "Business Central",
    "Angular",
    "Vue",
    "Philippines",
  ],
  authors: [{ name: profile.name, url: profile.links.github }],
  openGraph: {
    type: "profile",
    title: `${profile.name} | ${profile.role}`,
    description: profile.summary,
    url: siteUrl.href,
    siteName: profile.name,
    images: [{ url: "/images/arellano-portrait.jpg", width: 1200, height: 1200, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.summary,
    images: ["/images/arellano-portrait.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#25231f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${sourceCode.variable}`}>
      <body className="min-h-dvh bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
