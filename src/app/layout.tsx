import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LinkExternal from "@/components/LinkExternal";
import MaintenanceMessage from "@/components/MaintenanceMessage";
import Providers from "@/providers";

import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compound Blue",
  description: "DeFi lending and borrowing interface for Compound-managed deployments on the Morpho protocol.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  openGraph: {
    url: process.env.NEXT_PUBLIC_URL!,
  },
};

const maintenanceModeEnabled = process.env.MAINTENANCE_MODE_ENABLED === "1";

function DeprecationBanner() {
  return (
    <div className="max-w-screen-xl flex items-center gap-2 rounded-[12px] p-4">
      <div className="bg-background-inverse rounded-[12px]">
        <div className={clsx(
          "label-md",
          "flex items-center gap-2 rounded-[12px] p-4"
        )}>
          <span>
          Compound Blue is being deprecated through governance. The DAO no longer supports Compound Blue and is not responsible for covering losses or distributing rewards. Users remain solely responsible for managing their positions. Users may access positions on 
          {" "}
          <LinkExternal href="https://app.morpho.org/polygon/earn" 
            className="inline underline" hideArrow
          >
            Morpho
          </LinkExternal>{" "}
          during and post Compound Blue deprecation. For continued lending activity, you are encouraged to use
          {" "}
          <LinkExternal href="https://app.compound.finance" 
            className="inline underline" hideArrow
          >
            Compound V3
          </LinkExternal>{" "}.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {maintenanceModeEnabled ? (
            <MaintenanceMessage />
          ) : (
            <>
              <div className="flex min-h-[100dvh] w-full flex-col items-center">
                <Header />
                {DeprecationBanner()}
                <main className="flex w-full max-w-screen-xl flex-grow flex-col gap-8 p-4 pb-20">{children}</main>
                <Footer />
              </div>
              <Analytics />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
