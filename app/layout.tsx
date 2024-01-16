"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/lib/providers/TanstackProvider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
import { Suspense, lazy } from "react";
import NavSkel from "@/components/skeletons/navSkel";
import HomeSkel from "@/components/skeletons/homeSkel";

const Nav = lazy(() => import("@/components/nav"));

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <Suspense fallback={<HomeSkel />}>
            <div className="flex ">
              <Nav />
              <main>{children}</main>
            </div>
          </Suspense>
        </TanstackProvider>
      </body>
    </html>
  );
}
