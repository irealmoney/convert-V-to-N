import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LahzeeFont , LahzeeBoldFont} from "../app/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "NIK Petshop",
  description: "Petshop ecommerce platform",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa">
      <body
        className={`${LahzeeFont.variable} antialiased bg-white text-gray-900`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
