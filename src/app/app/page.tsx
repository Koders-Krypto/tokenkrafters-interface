"use client";
import {
  BellAlertIcon,
  BoltIcon,
  ChartBarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ScaleIcon,
  Square3Stack3DIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Tokens } from "../components/constants/tokens";
import Image from "next/image";
import truncate from "../components/utils/truncate";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { createBucket, getDeployedBuckets, readContract } from "../components/utils/contract/contractCalls";
import { useAccount } from 'wagmi'


export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [tokens, setTokens] = useState(Tokens);
  const [selected, setSelected] = useState(Tokens[0]);
  const [selectedTokens, setSelectedTokens] = useState<any>([]);
  const [bucketDescription, setBucketDescription] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [bucketValue, setBucketValue] = useState<any>([]);

  const { address, isConnected, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      getDeployedBucketsWrapper();
    }
  }, [isConnected])

  const getDeployedBucketsWrapper = async () => {
    await getDeployedBuckets();
  }

  const handleTokenInput = (e: any, token: any) => {
    let updated = false;
    let _bucketValue = bucketValue;
    for (let i = 0; i < _bucketValue.length; i++) {
      if (_bucketValue[i].tokenAddress === token.address) {
        // update the bucket percentage
        _bucketValue[i].weightage = BigInt(e.target.value * 1000)
        updated = true;
      }
    }
    if (!updated) {
      console.log("called");
      _bucketValue.push({
        tokenAddress: token.address,
        weightage: BigInt(e.target.value * 1000),
      });
    }
    setBucketValue(_bucketValue);
  }

  const getTokenPercentage = (token: any) => {
    for (let i = 0; i < bucketValue.length; i++) {
      console.log(bucketValue[i][1]);
      if (bucketValue[i][0] === token.address && bucketValue[i][1] !== 0) {
        return bucketValue[i][1];
      }
    }
    return "";
  }

  const handleCreateBucket = async () => {
    if (isConnected) {
      await createBucket(bucketName, bucketDescription, "", bucketValue);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-start pt-28 gap-12 items-start px-6 py-4 lg:px-24 text-secondary">
      <div className="flex flex-col gap-6 w-full">
        <div className="bg-primary flex flex-row justify-between items-center w-full rounded-lg shadow-md px-6 py-4">
          <div className="flex flex-row justify-start items-center gap-2">
            <BellAlertIcon className="h-6 w-6" />
            <h1 className="text-xl font-medium">
              Craft Your Future: Build Your Crypto Kingdom, One Bucket at a
              Time.
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white text-secondary py-2 px-6 rounded-md text-lg font-medium"
          >
            Create now
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="flex flex-row justify-start items-center gap-2 bg-white rounded-full py-3 pl-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-secondary" />
            <input
              className="bg-transparent w-full focus:outline-none text-secondary"
              placeholder="Search for buckets (Ex: Bull Market, Token creator address etc)"
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 justify-start items-start">
              <div className="bg-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-secondary">
                <ChartBarIcon className="h-5 w-5" />
                <h2>Top gainers</h2>
              </div>
              <div className="bg-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-secondary">
                <BoltIcon className="h-5 w-5" />
                <h2>Popular</h2>
              </div>
              <div className="bg-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-secondary">
                <ScaleIcon className="h-5 w-5" />
                <h2>Recently rebalanced</h2>
              </div>
            </div>
            <select
              className="text-secondary bg-primary focus:outline-none rounded-full pl-4 input px-6 pr-8 py-1.5"
              name="Sort"
              id="Sort"
            >
              <option value={"Sort"}>Sort by</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start items-start w-full">
        <div className="flex flex-row justify-start items-center gap-2">
          <Square3Stack3DIcon className="h-6 w-6 text-primary" />
          <h2 className="text-primary font-semibold text-xl">All Collection</h2>
        </div>
        <div className="grid grid-cols-3 w-full gap-4">
          <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col gap-4">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="h-14 flex justify-center items-center rounded-md text-white w-14 bg-green-900">
                  <h2 className="text-5xl">B</h2>
                </div>
                <div className="flex flex-col justify-start items-start">
                  <h2 className="font-medium text-lg">Balanced Case</h2>
                  <h3 className="text-sm">
                    by{" "}
                    {truncate(
                      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                      12,
                      "..."
                    )}
                  </h3>
                </div>
              </div>
              <div className="bg-primary/20 text-secondary px-4 py-1 rounded-md shadow-sm font-medium">
                Trending
              </div>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
              {tokens.map((token, i) => {
                return (
                  <Image
                    key={i}
                    src={token.icon}
                    alt={token.name}
                    height={"30"}
                    width={"30"}
                  />
                );
              })}
              <h5>+2</h5>
            </div>
          </div>
        </div>
      </div>
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
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Full-screen scrollable container */}
          <div className="fixed inset-0 w-screen overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex min-h-full items-center justify-center p-4">
              {/* The actual dialog panel  */}
              <Dialog.Panel className="flex flex-col gap-2 mx-auto max-w-xl w-full rounded-lg bg-white p-6">
                <Dialog.Title className={"text-2xl font-semibold"}>
                  Create your own bucket
                </Dialog.Title>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 justify-start items-start">
                    <label htmlFor="">Name</label>
                    <input
                      className="px-2 py-2 border border-secondary rounded-md w-full"
                      value={bucketName}
                      onChange={(e) => setBucketName(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1 justify-start items-start">
                    <label htmlFor="">Description</label>
                    <textarea
                      className="px-2 py-2 border border-secondary rounded-md w-full"
                      name=""
                      id=""
                      value={bucketDescription}
                      onChange={(e) => setBucketDescription(e.target.value)}
                      cols={30}
                      rows={5}
                    ></textarea>
                  </div>
                  <Listbox
                    value={selected}
                    onChange={(token) => {
                      setSelectedTokens([...selectedTokens, token]);
                      let _tokens = tokens;
                      const index = _tokens.indexOf(token);
                      if (index > -1) {
                        _tokens.splice(index, 1);
                      }
                      setTokens([..._tokens]);
                    }}
                  >
                    <div className="flex flex-col gap-1 relative w-full">
                      <label htmlFor="">Select Token</label>
                      <div className="flex flex-row gap-4 justify-start items-center">
                        {tokens.map((token: any, i) => {
                          return (
                            <div
                              key={i}
                              className="bg-primary text-secondary px-2 py-0.5 text-sm rounded-full shadow-md"
                              onClick={() => {
                                setSelectedTokens([...selectedTokens, token]);
                                let _tokens = tokens;
                                const index = _tokens.indexOf(token);
                                if (index > -1) {
                                  _tokens.splice(index, 1);
                                }
                                setTokens([..._tokens]);
                              }}
                            >
                              {token.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Listbox>
                  {selectedTokens.map((token: any, i: any) => (
                    <div className="grid grid-cols-4 gap-4" key={i}>
                      <div className="flex flex-row justify-center items-center gap-1">
                        <Image
                          src={token.icon}
                          alt={token.name}
                          height={"20"}
                          width={"20"}
                        />
                        {token.name}
                      </div>
                      <div className="col-span-3 flex flex-row justify-center items-center gap-4">
                        <input
                          type="number"
                          // value={getTokenPercentage(token)} need to fix logic
                          onChange={(e) => handleTokenInput(e, token)}
                          className="px-4 py-1.5 border border-secondary rounded-md w-full"
                          placeholder={`% of ${token.name} in the bucket`}
                        />
                        <TrashIcon
                          className="h-5 w-5"
                          onClick={() => {
                            setTokens([...tokens, token]);
                            let _tokens = selectedTokens;
                            const index = _tokens.indexOf(token);
                            if (index > -1) {
                              _tokens.splice(index, 1);
                            }
                            setSelectedTokens([..._tokens]);
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-row justify-end items-center mt-8">
                    <button className="bg-primary px-6 py-1.5 rounded-md shadow-md text-lg" onClick={() => handleCreateBucket()}>
                      Create
                    </button>
                  </div>
                </div>
                {/* ... */}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
