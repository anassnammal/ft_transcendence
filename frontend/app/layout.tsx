"use client";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],

  weight: "800",
});
import { Suspense, useEffect } from "react";
import HomeSkel from "@/components/skeletons/homeSkel";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import getCookie from "@/lib/functions/getCookie";
import { useRouter } from "next/navigation";
import Providers from "@/lib/providers/Providers";
import ThemeButton from "@/components/ui/themeButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const logged_in = getCookie("logged_in");
  const is_public_route = ["/", "/login", "/register"].includes(usePathname());
  useEffect(() => {
    if (logged_in === "yes" && is_public_route) {
      router.push("/game");
    }
  }, [is_public_route, logged_in, router]);
  console.log("not logged")
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <h1></h1>
          <Suspense fallback={<HomeSkel />}>
            <div className="relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/10 to-background/20">
              <main>
                { !logged_in &&  <ThemeButton />}
                {children}
              </main>
              <Toaster duration={3000} />
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
