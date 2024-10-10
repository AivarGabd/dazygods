"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { UserAgent } from "@/lib/userAgentContext";
import LayoutClient from "./layoutClient";
import { QueryClient, QueryClientProvider } from "react-query";

export interface ProvidersProps {
  children: React.ReactNode;
  reqUserAgent: UserAgent;
}
const queryClient = new QueryClient();

export function Providers({
  children,
  reqUserAgent,
}: ProvidersProps) {
  const router = useRouter();

  return (
    <LayoutClient reqUserAgent={reqUserAgent}>
      <NextUIProvider navigate={router.push}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextUIProvider>
    </LayoutClient>
  );
}
