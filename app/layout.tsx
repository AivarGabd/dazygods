import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { userAgent } from "next/server";
import { headers } from "next/headers";

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
        <Providers
          themeProps={{ attribute: "class", defaultTheme: "light" }}
          reqUserAgent={reqUserAgent}
        >
          <div className="relative flex flex-col h-screen">
            {viewport == "desktop" ? <Navbar /> : null}
            <main className="container mx-auto max-w-7xl flex-grow px-4 lg:px-0 py-2">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
