"use client";
import PieChartGraph from "@/app/components/Chart/PieChartGraph";
import { getPortfolio } from "@/app/components/utils/subgraph/graph";
import { getActiveToken } from "@/app/components/utils/utils";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useNetwork } from "wagmi";

export default function Portfolio() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [portfolio, setPortfolio] = useState<any>([]);

  const { chain, chains } = useNetwork();

  useEffect(() => {
    if (isConnected && address && chain) {
      getPortfolioWrapper();
    }
  }, [isConnected, chain]);

  const getPortfolioWrapper = async () => {
    const data = await getPortfolio(address!.toLowerCase(), chain?.id!);
    const combinedDataMap = new Map();
    data.forEach((item: any) => {
      const bucketId = item.bucket.id;
      if (combinedDataMap.has(bucketId)) {
        combinedDataMap.get(bucketId).investmentAmount += parseInt(
          formatUnits(
            item.investmentAmount,
            getActiveToken(item.investmentToken, chain?.id!).decimals
          )
        );
      } else {
        combinedDataMap.set(bucketId, {
          ...item,
          investmentAmount: parseInt(
            formatUnits(
              item.investmentAmount,
              getActiveToken(item.investmentToken, chain?.id!).decimals
            )
          ),
        });
      }
    });
    const combinedDataArray = Array.from(combinedDataMap.values());
    setPortfolio(combinedDataArray);
  };

  return (
    <section className="flex flex-col items-start justify-start min-h-screen gap-4 px-6 py-4 pt-28 lg:px-24 text-secondary">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center justify-start gap-2">
          <BriefcaseIcon className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold text-primary">Invested In</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="flex flex-col items-start justify-start w-full gap-4 md:col-span-3">
          <div className="grid w-full grid-cols-1 gap-2">
            <div className="hidden w-full grid-cols-4 gap-6 px-6 py-2 text-white md:grid">
              <div>ID</div>
              <div>Bucket</div>
              <div>Amount ($)</div>
              <div className="flex items-center justify-center">Actions</div>
            </div>
            {portfolio.length <= 0 && (
              <div className="text-white">Porfolio is empty!!!</div>
            )}
            {portfolio?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="grid w-full grid-cols-2 gap-6 px-6 py-3 card md:grid-cols-4"
                >
                  <div>{index + 1 + ".)"}</div>
                  <div className="w-full truncate">{item.bucket.name}</div>
                  <div>${item.investmentAmount}</div>
                  <div className="flex items-center justify-center">
                    <button className="px-4 py-1 shadow-md bg-primary rounded-xl text-secondary">
                      Withdraw
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-start w-full gap-0 px-6 py-4 rounded-lg shadow-md bg-primary">
            <div className="flex flex-col items-center justify-start gap-2">
              <h1 className="text-xl font-medium text-center">Breakdown</h1>
            </div>
            <PieChartGraph />
          </div>
        </div>
      </div>
    </section>
  );
}
