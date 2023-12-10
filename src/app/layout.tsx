import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Providers } from "./components/providers";
import { Toaster } from "react-hot-toast";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "TokenKrafters - Krafting Your Crypto Portfolios",
  description:
    "Unlocking Infinite Possibilities: Your Gateway to Seamless Token Swaps and Diversified Portfolios",
  openGraph: {
    title: "TokenKrafters - Krafting Your Crypto Portfolios",
    url: process.env.URL,
    description:
      "Unlocking Infinite Possibilities: Your Gateway to Seamless Token Swaps and Diversified Portfolios",
    images: [
      {
        url: "https://tokencrafter-interface.vercel.app/og/og-home.png",
        secureUrl: "https://tokencrafter-interface.vercel.app/og/og-home.png",
        alt: "TokenKrafters - Krafting Your Crypto Portfolios",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  alternates: {
    canonical: process.env.URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "TokenKrafters - Krafting Your Crypto Portfolios",
    description:
      "Unlocking Infinite Possibilities: Your Gateway to Seamless Token Swaps and Diversified Portfolios",
    creator: "@KryptoKoders",
    images: ["https://tokencrafter-interface.vercel.app/og/og-home.png"],
  },
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className + " hero-background"}>
        <Providers>
          <Toaster position="bottom-center" reverseOrder={false} /> <Navbar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
