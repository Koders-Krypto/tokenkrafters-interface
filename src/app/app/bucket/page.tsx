'use client'
import { Tokens } from "@/app/components/constants/tokens";
import { getBucketDetails, investInBucket } from "@/app/components/utils/contract/contractCalls";
import truncate from "@/app/components/utils/truncate";
import { getTokens } from "@/app/components/utils/utils";
import {
  ArrowPathIcon,
  ChartBarIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";



export default function Page({ address }: { address: `0x{string}` }) {

  const [bucket, setBucket] = useState<any>();

  // const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    getBucketDetailsWrapper("0x6b1bE435A9355C9EE173835e2A87Eb51b7727db9" as `0x{string}`);
  }, [])

  const getBucketDetailsWrapper = async (address: `0x{string}`) => {
    const _bucket = await getBucketDetails(address);
    setBucket(_bucket);
  }

  const handleInvest = async () => {
    // if (isConnected) {
    const invest = await investInBucket("0x6b1bE435A9355C9EE173835e2A87Eb51b7727db9" as `0x{string}`, "0x4b83ed13b388b126056fbd1f8518b8d9f904b7d5" as `0x{string}`, 1000);
    console.log(invest);
    // }
  }

  if (!bucket) {
    return (
      <div className="flex justify-center items-center text-2xl">
        LOADING ...
      </div>
    )
  }

  return (
    <section className="min-h-screen flex flex-col justify-start pt-28 gap-12 items-start px-6 py-4 lg:px-24 text-secondary">
      <div className="card w-full flex flex-row justify-between items-center p-8">
        <div className="flex flex-col justify-between items-start gap-6">
          <div className="flex flex-row justify-center items-center gap-6">
            <div className="h-36 flex justify-center items-center rounded-md text-white w-36 bg-green-900">
              <h2 className="text-7xl">B</h2>
            </div>
            <div className="flex flex-col justify-start gap-4 items-start">
              <div className="flex flex-col gap-1">
                <h2 className="font-medium text-2xl">{bucket.bucketName}</h2>
                <h3 className="text-sm">
                  Bucket Address {" "}
                  {truncate(
                    bucket.bucketAddress,
                    12,
                    "..."
                  )}
                </h3>
              </div>
              <div className="flex flex-row justify-start items-center max-w-lg gap-2">
                <p>
                  {bucket.bucketDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div onClick={() => handleInvest()} className="bg-primary/90 text-secondary px-4 py-1 text-lg rounded-md shadow-sm font-medium">
            Invest
          </div>
          <div className="bg-transparent border border-primary  text-primary px-4 py-1 text-lg rounded-md shadow-sm font-medium">
            Rebalance
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-4 items-start w-full">
        <div className="flex flex-row justify-start items-center gap-2">
          <QueueListIcon className="h-6 w-6 text-primary" />
          <h2 className="text-primary font-semibold text-xl">Tokens List</h2>
        </div>
        <div className="grid grid-cols-4 gap-4 w-full">
          {bucket.bucketTokens.map((token: any, i: number) => {
            const _token = getTokens(token.tokenAddress);
            return (
              <div
                className="card flex flex-col gap-2 justify-center items-center p-4"
                key={i}
              >
                <Image
                  key={i}
                  src={_token!.icon}
                  alt={_token!.name}
                  height={"30"}
                  width={"30"}
                />
                <h3 className="text-lg font-semibold">{token.name} ({Number(token.weightage) / 1000})</h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-start gap-4 items-start w-full">
        <div className="flex flex-row justify-start items-center gap-2">
          <ChartBarIcon className="h-6 w-6 text-primary" />
          <h2 className="text-primary font-semibold text-xl">Chart</h2>
        </div>
        <div className="card p-6 py-24 flex justify-center items-center font-bold text-2xl w-full">
          Coming Soon
        </div>
      </div>
      <div className="flex flex-col justify-start gap-4 items-start w-full">
        <div className="flex flex-row justify-start items-center gap-2">
          <ArrowPathIcon className="h-6 w-6 text-primary" />
          <h2 className="text-primary font-semibold text-xl">
            Rebalance History
          </h2>
        </div>
        <div className="card p-6 py-24 flex justify-center items-center font-bold text-2xl w-full">
          Coming Soon
        </div>
      </div>
    </section>
  );
}