"use client";
import Chart from "@/app/components/Chart/AreaChart";
import {
  getChainExplorer,
  getPaymentAddress,
} from "@/app/components/constants/tokens";
import { getRandomColor } from "@/app/components/data/randomColors";
import { investInBucket } from "@/app/components/utils/contract/contractCalls";
import {
  getBucketDetailView,
  getBucketPortfolioView,
} from "@/app/components/utils/subgraph/graph";
import truncate from "@/app/components/utils/truncate";
import { getActiveToken } from "@/app/components/utils/utils";
import Loading from "@/app/loading";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ChartBarIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useNetwork } from "wagmi";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: { address: `0x{string}` };
}) {
  const bucketAddress = params.address;
  const [isOpen, setIsOpen] = useState(false);
  const [bucket, setBucket] = useState<any>();
  const [portfolio, setPortfolio] = useState<any>();
  const [value, setValue] = useState("");
  const [totalInvestedAmount, setTotalInvestedAmount] = useState(0);
  const { address, isConnected } = useAccount();
  const [refreshData, setRefreshData] = useState(false);
  const [investButtonLabel, setInvestButtonLabel] = useState("Invest");

  const { chain, chains } = useNetwork();

  useEffect(() => {
    if (isConnected && address && chain) {
      getBucketDetailsWrapper(bucketAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketAddress, params.address, isConnected, chain, refreshData]);

  const getBucketDetailsWrapper = async (bucketAddress: string) => {
    const _bucket = await getBucketDetailView(
      bucketAddress.toLowerCase(),
      chain?.id!
    );
    const _portfolio = await getBucketPortfolioView(
      bucketAddress.toLowerCase(),
      address!.toLocaleLowerCase(),
      chain?.id!
    );

    if (_portfolio.length > 0) {
      const totalAmount = _portfolio.reduce(
        (sum: number, investment: any) =>
          sum +
          parseInt(
            formatUnits(
              investment.investmentAmount,
              getActiveToken(investment.investmentToken, chain?.id!).decimals
            )
          ),
        0
      );
      console.log(totalAmount);
      setTotalInvestedAmount(totalAmount);
    }

    setBucket(_bucket);
    setPortfolio(_portfolio);
  };

  const handleInvest = async () => {
    // if (isConnected) {
    if (value.length > 0) {
      setInvestButtonLabel("Continue in metamask ...");
      const invest = await investInBucket(
        bucketAddress,
        getPaymentAddress(chain?.id!) as `0x{string}`,
        parseInt(value)
      );
      if (invest) {
        toast((t) => (
          <span className="flex flex-col justify-center items-center">
            Transaction Submitted Succesfullly!!!
            <Link
              href={`${getChainExplorer(chain?.id!)}${invest}`}
              target="_blank"
              className="underline"
            >
              View on explorer
            </Link>
          </span>
        ));

        setTimeout(() => {
          setRefreshData(!refreshData);
        }, 6000);
      } else {
        toast.error("Something went wrong!!! Try again!!!");
      }
      console.log(invest);
    } else {
      toast.error("Enter the USDC amount to Invest");
      console.log("Enter the USDC amount to Invest");
    }
    setInvestButtonLabel("Invest");
    setIsOpen(false);
    // }
  };

  if (!bucket) {
    return <Loading />;
  }

  return (
    <>
      <section className="flex flex-col items-start justify-start min-h-screen gap-12 px-6 py-4 pt-28 lg:px-24 text-secondary">
        <div className="flex flex-col items-start justify-between w-full gap-8 p-8 md:items-center md:flex-row card">
          <div className="flex flex-col items-start justify-between gap-6">
            <div className="flex flex-col items-start justify-center gap-6 md:items-center md:flex-row">
              <div
                className={`h-36 flex justify-center items-center rounded-md text-white w-36 ${getRandomColor()}`}
              >
                <h2 className="uppercase text-7xl">{bucket.name.charAt(0)}</h2>
              </div>
              <div className="flex flex-col items-start justify-start gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-medium">{bucket.name}</h2>
                  <h3 className="text-sm">
                    Bucket Address {truncate(bucket.creator.id, 12, "...")}
                  </h3>
                </div>
                <div className="flex flex-row items-center justify-start max-w-lg gap-2">
                  <p>{bucket.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-8">
            <div>
              {portfolio.length > 0 && totalInvestedAmount && (
                <div className="flex flex-col items-center justify-center px-4 py-2 text-lg font-semibold shadow-xl border border-primary rounded-xl text-primary">
                  <h3 className="text-sm font-normal">You Invested</h3>
                  <h4>$ {totalInvestedAmount}</h4>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center justify-center gap-4 md:flex-col">
              <div
                onClick={() => {
                  setIsOpen(true);
                }}
                className="px-4 py-1 text-lg font-medium rounded-md shadow-sm bg-primary/90 text-secondary"
              >
                Invest
              </div>
              <div className="px-4 py-1 text-lg font-medium text-center bg-transparent border rounded-md shadow-sm border-primary text-primary">
                Rebalance
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-12 md:col-span-2">
            <div className="flex flex-col items-start justify-start w-full gap-4">
              <div className="flex flex-row items-center justify-start gap-2">
                <QueueListIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-primary">
                  Tokens List
                </h2>
              </div>
              <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
                {bucket.tokenAllocations.map((token: any, i: number) => {
                  const _token = getActiveToken(token.token, chain?.id!);
                  return (
                    <div
                      className="flex flex-col items-center justify-center gap-2 p-4 card"
                      key={i}
                    >
                      <Image
                        key={i}
                        src={_token!.icon}
                        alt={_token!.name}
                        height={"30"}
                        width={"30"}
                      />
                      <h3 className="text-lg font-semibold">
                        {_token.name} ({parseInt(token.weightage) / 1000}%)
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-4">
              <div className="flex flex-row items-center justify-start gap-2">
                <ChartBarIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-primary">Chart</h2>
              </div>
              <div className="w-full">
                <Chart />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-4">
            <div className="flex flex-row items-center justify-start gap-2">
              <ArrowPathIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-primary">
                Rebalance History
              </h2>
            </div>
            <div className="flex items-start justify-start w-full p-6 py-12 text-2xl font-bold card">
              <div className="flex flex-col items-start justify-start">
                <div className="my-2 ps-2 first:mt-0">
                  <h3 className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Dec 8, 2023
                  </h3>
                </div>

                <div className="flex gap-x-3">
                  <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
                    <div className="relative z-10 flex items-center justify-center w-7 h-7">
                      <div className="w-2 h-2 bg-gray-400 rounded-full dark:bg-gray-600"></div>
                    </div>
                  </div>

                  <div className="grow pt-0.5 pb-8">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                      Bucket Created
                    </h3>

                    <button
                      type="button"
                      className="inline-flex items-center p-1 mt-1 text-xs text-gray-500 border border-transparent rounded-lg -ms-1 gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      by {truncate(bucket.creator.id, 24, "...")}
                    </button>
                  </div>
                </div>

                <div className="my-2 ps-2 first:mt-0">
                  <h3 className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    10 Dec, 2023
                  </h3>
                </div>

                <div className="flex gap-x-3">
                  <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
                    <div className="relative z-10 flex items-center justify-center w-7 h-7">
                      <div className="w-2 h-2 bg-gray-400 rounded-full dark:bg-gray-600"></div>
                    </div>
                  </div>

                  <div className="grow pt-0.5 pb-8">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                      First Investment
                    </h3>
                    <button
                      type="button"
                      className="inline-flex items-center p-1 mt-1 text-xs text-gray-500 border border-transparent rounded-lg -ms-1 gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      by {truncate(bucket.creator.id, 24, "...")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Transition
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 text-secondary"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-secondary/90" aria-hidden="true" />

          {/* Full-screen scrollable container */}
          <div className="fixed inset-0 w-screen overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex items-center justify-center min-h-full p-4">
              {/* The actual dialog panel  */}
              <Dialog.Panel className="flex flex-col w-full max-w-xl gap-2 p-6 mx-auto rounded-lg card">
                <Dialog.Title className={"text-2xl font-semibold"}>
                  Invest
                </Dialog.Title>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center justify-center gap-4">
                    <div className="flex flex-row items-center justify-center gap-1">
                      <Image
                        src={"/supported-tokens/usdc.svg"}
                        alt="USDC"
                        height={30}
                        width={30}
                      />
                      <div className="flex flex-row">USDC</div>
                    </div>
                    <input
                      className="w-full px-2 py-2 border rounded-md border-secondary text-secondary"
                      type="text"
                      placeholder="Enter the amount to invest"
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-row items-center justify-end mt-8">
                    <button
                      className="bg-primary text-secondary px-6 py-1.5 rounded-md shadow-md text-lg"
                      onClick={() =>
                        investButtonLabel === "Invest" && handleInvest()
                      }
                    >
                      {investButtonLabel}
                    </button>
                  </div>
                </div>
                {/* ... */}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
