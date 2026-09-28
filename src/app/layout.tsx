import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from '@/app/components/ThemeProvider';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300", "400", "500", "600", "700", "800"], display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Origins Ltd. — Digital engineering for ambitious teams",
  description: "Origins builds dependable digital products, software systems, infrastructure and AI-enabled workflows for ambitious teams.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://origins-software.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}><body className="min-h-full"> <ThemeProvider>{children}</ThemeProvider></body></html>;
}
