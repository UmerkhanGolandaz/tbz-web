import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ChatBot from "@/components/ChatBot";
import InstallPrompt from "@/components/InstallPrompt";
import SplashScreen from "@/components/SplashScreen";
import { AuthProvider } from "@/components/AuthProvider";
import { AppointmentProvider } from "@/components/AppointmentProvider";
import { NotificationProvider } from "@/components/NotificationProvider";
import { DigitalGoldProvider } from "@/components/DigitalGoldProvider";
import { WishlistProvider } from "@/components/WishlistProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TBZ · The Original | Tribhovandas Bhimji Zaveri",
  description:
    "Heritage jewellery from TBZ · The Original. Explore gold, diamond, jadau & bridal collections. Book a personal appointment.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TBZ",
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#c5a572",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <AuthProvider>
          <NotificationProvider>
            <DigitalGoldProvider>
              <WishlistProvider>
              <AppointmentProvider>
                <SplashScreen />
                <Header />
                <main className="min-h-[60vh] pb-20 lg:pb-0">{children}</main>
                <Footer />
                <BottomNav />
                <ChatBot />
                <InstallPrompt />
                <script
                  dangerouslySetInnerHTML={{
                    __html:
                      "if ('serviceWorker' in navigator) { window.addEventListener('load', function(){ navigator.serviceWorker.register('/sw.js').catch(function(){}); }); }",
                  }}
                />
              </AppointmentProvider>
              </WishlistProvider>
            </DigitalGoldProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
