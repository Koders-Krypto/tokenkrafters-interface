"use client";
import {
  ArrowRightOnRectangleIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { useAccount, useEnsName } from "wagmi";
import truncate from "../utils/truncate";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({
    address: address,
    chainId: 1,
    enabled: !!address,
  });

  return (
    <>
      {isConnected ? (
        <button
          className="flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-full shadow-sm bg-primary text-black font-semibold"
          onClick={() => open()}
        >
          <span className="hidden md:block">
            {ensName ? ensName : truncate(address, 14, "...")}
          </span>

          <div className="w-5 h-5">
            <ArrowRightOnRectangleIcon />
          </div>
        </button>
      ) : (
        <button
          className="flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-full shadow-sm bg-primary text-black font-semibold"
          onClick={() => open()}
        >
          <WalletIcon className="w-5 h-5" />
          Connect Wallet
        </button>
      )}
    </>
  );
}
