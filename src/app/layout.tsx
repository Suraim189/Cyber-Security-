import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | NTU Cyber Security Society",
    default: "NTU Cyber Security Society — National Textile University",
  },
  description:
    "Official website of the Cyber Security Society at National Textile University, Faisalabad, Pakistan. Fostering research, ethical hacking, CTF training, and defensive security.",
  keywords: [
    "NTU Cyber Security",
    "National Textile University",
    "Cyber Security Society NTU",
    "Faisalabad Cybersecurity",
    "CTF Pakistan",
    "Ethical Hacking NTU",
    "Computer Science NTU",
  ],
  authors: [{ name: "NTU Cyber Security Society" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-brand-100 selection:text-brand-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
