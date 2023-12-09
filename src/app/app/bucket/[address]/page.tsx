"use client";
import { Tokens, paymentAddress } from "@/app/components/constants/tokens";
import { getRandomColor } from "@/app/components/data/randomColors";
import {
  getBucketDetails,
  investInBucket,
} from "@/app/components/utils/contract/contractCalls";
import truncate from "@/app/components/utils/truncate";
import { getTokens } from "@/app/components/utils/utils";
import Loading from "@/app/loading";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ChartBarIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: { address: `0x{string}` };
}) {
  const bucketAddress = params.address;
  const [isOpen, setIsOpen] = useState(false);
  const [bucket, setBucket] = useState<any>();
  const [value, setValue] = useState("");

  // const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    getBucketDetailsWrapper(bucketAddress);
  }, [bucketAddress, params.address]);

  const getBucketDetailsWrapper = async (address: `0x{string}`) => {
    const _bucket = await getBucketDetails(address);
    setBucket(_bucket);
  };

  const handleInvest = async () => {
    // if (isConnected) {
    if (value.length > 0) {
      const invest = await investInBucket(
        bucketAddress,
        paymentAddress as `0x{string}`,
        parseInt(value)
      );
      console.log(invest);
    } else {
      //toast
      console.log("Enter the USDC amount to Invest");
    }
    // }
  };

  if (!bucket) {
    return <Loading />;
  }

  return (
    <>
      <section className="min-h-screen flex flex-col justify-start pt-28 gap-12 items-start px-6 py-4 lg:px-24 text-secondary">
        <div className="card w-full flex flex-row justify-between items-center p-8">
          <div className="flex flex-col justify-between items-start gap-6">
            <div className="flex flex-row justify-center items-center gap-6">
              <div
                className={`h-36 flex justify-center items-center rounded-md text-white w-36 ${getRandomColor()}`}
              >
                <h2 className="text-7xl uppercase">
                  {bucket.bucketName.charAt(1)}
                </h2>
              </div>
              <div className="flex flex-col justify-start gap-4 items-start">
                <div className="flex flex-col gap-1">
                  <h2 className="font-medium text-2xl">{bucket.bucketName}</h2>
                  <h3 className="text-sm">
                    Bucket Address {truncate(bucket.bucketAddress, 12, "...")}
                  </h3>
                </div>
                <div className="flex flex-row justify-start items-center max-w-lg gap-2">
                  <p>{bucket.bucketDescription}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div
              onClick={() => {
                setIsOpen(true);
              }}
              className="bg-primary/90 text-secondary px-4 py-1 text-lg rounded-md shadow-sm font-medium"
            >
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
                  <h3 className="text-lg font-semibold">
                    {_token.name} ({Number(token.weightage) / 1000}%)
                  </h3>
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
            <div className="flex min-h-full items-center justify-center p-4">
              {/* The actual dialog panel  */}
              <Dialog.Panel className="flex flex-col gap-2 mx-auto max-w-xl w-full rounded-lg card p-6">
                <Dialog.Title className={"text-2xl font-semibold"}>
                  Invest
                </Dialog.Title>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4 justify-center items-center">
                    <div className="flex flex-row gap-1 justify-center items-center">
                      <Image
                        src={"/supported-tokens/usdc.svg"}
                        alt="USDC"
                        height={30}
                        width={30}
                      />
                      <div className="flex flex-row">USDC</div>
                    </div>
                    <input
                      className="px-2 py-2 border border-secondary rounded-md w-full text-secondary"
                      type="text"
                      placeholder="Enter the amount to invest"
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-row justify-end items-center mt-8">
                    <button
                      className="bg-primary text-secondary px-6 py-1.5 rounded-md shadow-md text-lg"
                      onClick={() => handleInvest()}
                    >
                      Submit
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
