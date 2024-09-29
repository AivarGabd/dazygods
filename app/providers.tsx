"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { UserAgent } from "@/lib/userAgentContext";
import LayoutClient from "./layoutClient";
import { QueryClient, QueryClientProvider } from "react-query";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  reqUserAgent: UserAgent
}
const queryClient = new QueryClient();

export function Providers({ children, themeProps, reqUserAgent }: ProvidersProps) {
  const router = useRouter();

  return (
    <LayoutClient reqUserAgent={reqUserAgent}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </LayoutClient>

  );
}
