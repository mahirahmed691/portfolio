import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const displaySans = Space_Grotesk({
  variable: "--font-display-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahir Ahmed | Platform Engineer & Frontend Developer",
  description:
    "Mahir Ahmed — platform engineer and frontend developer. 7+ years building cloud infrastructure and polished product interfaces for HSBC, Zurich, Deutsche Bank and growing brands.",
  metadataBase: new URL("https://mahirahmed.co.uk"),
  alternates: {
    canonical: "https://mahirahmed.co.uk",
  },
  openGraph: {
    type: "website",
    url: "https://mahirahmed.co.uk",
    title: "Mahir Ahmed | Platform Engineer & Frontend Developer",
    description:
      "Platform engineer and frontend developer. 7+ years building cloud infrastructure and polished product interfaces for HSBC, Zurich, Deutsche Bank and growing brands.",
    siteName: "Mahir Ahmed",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mahir Ahmed — Platform Engineer & Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahir Ahmed | Platform Engineer & Frontend Developer",
    description:
      "Platform engineer and frontend developer. 7+ years building cloud infrastructure and polished product interfaces.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${displaySans.className} ${displaySans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />

        <Script
          id="calendly-css"
          strategy="afterInteractive"
        >{`var l=document.createElement('link');l.rel='stylesheet';l.href='https://assets.calendly.com/assets/external/widget.css';document.head.appendChild(l);`}</Script>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
