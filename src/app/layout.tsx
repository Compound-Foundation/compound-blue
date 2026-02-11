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
          Compound Blue will be deprecated by March 6, 2026 after the approved governance
          {" "}
          <LinkExternal href="https://snapshot.box/#/s:comp-vote.eth/proposal/0x6da835802571f46985e5a6baf59a16acb3753de6046c4c7b54796b9dcc42f56b" 
            className="inline underline" hideArrow
          >
            snapshot vote
          </LinkExternal>
          {" "}
          . Please move your positions as soon as possible and use
          {" "}
          <LinkExternal href="https://app.compound.finance" 
            className="inline underline" hideArrow
          >
            Compound V3
          </LinkExternal>
          {" "}
          <span className="font-extrabold">
            moving forward
          </span>
          . Users are responsible for their funds and positions and can access them via
          {" "}
          <LinkExternal href="https://app.morpho.org/ethereum/earn" 
            className="inline underline" hideArrow
          >
            Morpho
          </LinkExternal>
          {" "}
          after the Compound Blue deprecation.
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
