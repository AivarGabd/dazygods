'use client'

import { UserAgent, UserAgentContext } from "@/lib/userAgentContext";


export default function LayoutClient({ reqUserAgent, children }: { reqUserAgent: UserAgent, children: React.ReactNode }) {
  return <UserAgentContext.Provider value={reqUserAgent}>{children}</UserAgentContext.Provider>;
}