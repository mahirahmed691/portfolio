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
  title: "Mahir Ahmed | Frontend Developer",
  description:
    "Portfolio of Mahir Ahmed, a frontend developer creating polished websites and product interfaces for businesses, founders, and growing brands.",
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
