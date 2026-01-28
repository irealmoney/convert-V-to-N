"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <>
      {!isAuthRoute && <Header />}
      <main className="min-h-screen">{children}</main>
      {!isAuthRoute && <Footer />}
    </>
  );
}
