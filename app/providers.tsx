"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { UserAgent } from "@/lib/userAgentContext";
import LayoutClient from "./layoutClient";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  reqUserAgent: UserAgent
}

export function Providers({ children, themeProps, reqUserAgent }: ProvidersProps) {
  const router = useRouter();

  return (
    <LayoutClient reqUserAgent={reqUserAgent}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </LayoutClient>

  );
}
