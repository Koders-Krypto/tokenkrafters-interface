import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";
import {
  arbitrum,
  arbitrumGoerli,
  polygonMumbai,
  scrollSepolia,
  celoAlfajores,
} from "viem/chains";
import { Chain, configureChains, createConfig, mainnet } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

export const walletConnectProjectId = "9577531e389c799d54896f39e80d7bb0";

const {
  chains: [, ...chains],
  publicClient,
  webSocketPublicClient,
} = configureChains(
  [mainnet, arbitrumGoerli, polygonMumbai, scrollSepolia, celoAlfajores],
  [publicProvider()]
);

const metadata = {
  name: "TokenKrafters",
  description: "Scan and pay",
  url: "https://tokenkrafters-interface.vercel.app/",
  icons: [
    "https://tokenkrafters-interface.vercel.app/logo/TokenKrafters-Teal.png",
  ],
};

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
        showQrModal: false,
        metadata,
      },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export { chains };
