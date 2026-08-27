import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ConvexClientProvider } from "@/lib/convex/ConvexClientProvider";
import { CartProvider } from "@/lib/cart/cart-context";
import { WishlistProvider } from "@/lib/wishlist/wishlist-context";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Footer } from "@/components/layout/Footer";
import { ServiceWorkerRegister } from "@/components/system/ServiceWorkerRegister";

// Inter Variable — salah satu dari 2 opsi yang diizinkan Karyalo Design
// System §3 (Inter Variable atau Manrope Variable). Dipilih untuk
// prototype ini; lihat PROTOTYPE_STOREFRONT_PWA_README.md untuk catatan
// keputusan. next/font/google otomatis self-host, tidak perlu request ke
// Google Fonts saat runtime.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Karyalo",
    template: "%s — Karyalo",
  },
  description:
    "Karyalo Store — belanja cepat, transparan, dan terpercaya. Prototype Fase 1.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

// PRD §33 PWA-01 — theme_color/background_color diambil dari Karyalo
// Design System §2 (Deep Pine, Warm White), sama seperti manifest.json.
export const viewport: Viewport = {
  themeColor: "#1E2F5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <ConvexClientProvider>
          <CartProvider>
            <WishlistProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-deep-pine focus:px-4 focus:py-2 focus:text-warm-white"
              >
                Lompat ke konten utama
              </a>
              <AnnouncementBar />
              <AppHeader />
              <main id="main-content" className="min-h-[60vh] pb-20 md:pb-0">
                {children}
              </main>
              <Footer />
              <BottomNavigation />
              <ServiceWorkerRegister />
            </WishlistProvider>
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
