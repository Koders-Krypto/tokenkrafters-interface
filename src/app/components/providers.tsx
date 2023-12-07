"use client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { chains, config, walletConnectProjectId } from "./wagmi";

createWeb3Modal({
  wagmiConfig: config,
  projectId: walletConnectProjectId,
  chains,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
}
