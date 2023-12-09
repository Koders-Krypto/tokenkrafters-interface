'use client'
import PieChartGraph from "@/app/components/Chart/PieChartGraph";
import { getPortfolio } from "@/app/components/utils/subgraph/graph";
import truncate from "@/app/components/utils/truncate";
import { getTokens } from "@/app/components/utils/utils";
import {
  BriefcaseIcon,
  TicketIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

export default function Portfolio() {

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [portfolio, setPortfolio] = useState<any>([]);


  useEffect(() => {
    if (isConnected && address) {
      getPortfolioWrapper();
    }

  }, [isConnected])

  const getPortfolioWrapper = async () => {
    const data = await getPortfolio(address!.toLowerCase());
    console.log(data)
    // Use a Map to store the combined data
    const combinedDataMap = new Map();

    // Iterate through the array
    data.forEach((item: any) => {
      const bucketId = item.bucket.id;

      // Check if the bucketId is already in the Map
      if (combinedDataMap.has(bucketId)) {
        // If yes, update the investmentAmount
        combinedDataMap.get(bucketId).investmentAmount += parseInt(formatUnits(
          item.investmentAmount,
          getTokens(item.investmentToken).decimals
        ));
      } else {
        // If not, add a new entry to the Map
        combinedDataMap.set(bucketId, {
          ...item, investmentAmount: parseInt(formatUnits(
            item.investmentAmount,
            getTokens(item.investmentToken).decimals
          ))
        });
      }
    });

    // Convert the Map values back to an array
    const combinedDataArray = Array.from(combinedDataMap.values());
    console.log(combinedDataArray);
    setPortfolio(combinedDataArray);
  }

  return (
    <section className="flex flex-col items-start justify-start min-h-screen gap-12 px-6 py-4 pt-28 lg:px-24 text-secondary">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="flex flex-col items-start justify-start w-full gap-4 md:col-span-3">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center justify-start gap-2">
              <BriefcaseIcon className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-semibold text-primary">
                Invested In
              </h1>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-2">
            <div className="hidden w-full grid-cols-5 gap-6 px-6 py-2 text-white md:grid">
              <div>ID</div>
              <div>Bucket</div>
              <div>Amount ($)</div>
              {/* <div>Tx Hash</div> */}
              {/* <div>Explorer</div>  */}
            </div>
            {portfolio.map((item: any, index: number) => {
              return <div
                key={index}
                className="grid w-full grid-cols-2 gap-6 px-6 py-3 card md:grid-cols-5">
                <div>{(index + 1) + " ."}</div>
                <div className="w-full truncate">
                  {item.bucket.name}
                </div>
                <div>${item.investmentAmount}</div>
                {/* <div className="w-full truncate">
                  {truncate(
                    "0xfa9068fa87219f52b4017dfa0fcc9d5b2495017491f8533aa387f816cc2efaf5",
                    22,
                    "..."
                  )}
                </div>
                <div>
                  <button className="text-primary">Link</button>
                </div> */}
              </div>
            })}

          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-full gap-0 px-6 py-4 rounded-lg shadow-md bg-primary">
          <div className="flex flex-col items-center justify-start gap-2">
            <h1 className="text-xl font-medium text-center">Breakdown</h1>
          </div>
          <PieChartGraph />
        </div>
      </div>
    </section>
  );
}
