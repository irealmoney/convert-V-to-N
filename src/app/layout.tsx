import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LahzeeFont , LahzeeBoldFont} from "../app/fonts";
import LayoutShell from "@/components/layout/LayoutShell";
import { AuthProvider } from "@/context/AuthContext";
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoader from "@/components/ui/GlobalLoader";
import Providers from "./providers"
export const metadata: Metadata = {
  title: "NIK Petshop",
  description: "Petshop ecommerce platform",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa">
      <body  className={`${LahzeeFont.variable} antialiased bg-white`}>
        <Providers>
        <LoadingProvider>
          <AuthProvider>  
            <GlobalLoader />
            <LayoutShell>{children}</LayoutShell>
          </AuthProvider>
        </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
