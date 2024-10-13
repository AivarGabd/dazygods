import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import MobileNavbar from "@/components/MobileNavbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reqUserAgent = userAgent({ headers: headers() });
  const viewport = reqUserAgent.device.type === "mobile" ? "mobile" : "desktop";
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers reqUserAgent={reqUserAgent}>
          <div className="relative flex flex-col h-screen">
            {viewport == "desktop" ? <Navbar /> : null}
            <main className="container mx-auto max-w-7xl flex-grow px-0 lg:mt-[70px]">
              {children}
            </main>
            {viewport == "mobile" ? <MobileNavbar /> : null}
          </div>
        </Providers>
      </body>
    </html>
  );
}
