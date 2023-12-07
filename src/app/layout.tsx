import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TokenKrafters",
  description:
    "Unlocking Infinite Possibilities: Your Gateway to Seamless Token Swaps and Diversified Portfolios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className + " hero-background"}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
