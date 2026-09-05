import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CalculaFinanzas - Calculadoras Financieras Online",
  description:
    "Calculadoras financieras gratuitas: interés compuesto, hipotecas, préstamos y más.",
  other: {
    "google-adsense-account": "ca-pub-6283921227007140",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
            <body
        className={`${sourceSerif.variable} ${inter.variable} antialiased flex min-h-screen flex-col`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6283921227007140"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}