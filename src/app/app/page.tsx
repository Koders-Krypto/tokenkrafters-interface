/* eslint-disable @next/next/no-img-element */
"use client";
import {
  BellAlertIcon,
  BoltIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
  Square3Stack3DIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  getTokens,
  getChainSvg,
  getChainExplorer,
} from "../components/constants/tokens";
import Image from "next/image";
import truncate from "../components/utils/truncate";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { createBucket } from "../components/utils/contract/contractCalls";
import { useAccount } from "wagmi";
import { getActiveToken } from "../components/utils/utils";
import Link from "next/link";
import { getRandomColor } from "../components/data/randomColors";
import html2canvas from "html2canvas";
import {
  uploadImageUsingBuffer,
  uploadJson,
} from "../components/utils/lightHouse/uploadToIpfs";
import { getBucketList } from "../components/utils/subgraph/graph";
import { useNetwork } from "wagmi";
import toast from "react-hot-toast";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [tokens, setTokens] = useState<any>([]);
  const [selected, setSelected] = useState<any>([]);
  const [selectedTokens, setSelectedTokens] = useState<any>([]);
  const [bucketDescription, setBucketDescription] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [bucketValue, setBucketValue] = useState<any>([]);
  const [bucketList, setBucketList] = useState<any>([]);
  const [previewNft, setPreviewNft] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [loadingBucket, setLoadingBucket] = useState(false);

  const { chain, chains } = useNetwork();

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    if (previewNft === true) {
      // html2canvas(document.getElementById("nftImageBody")!).then(function (canvas) {
      handleCreateBucket();
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewNft]);

  useEffect(() => {
    if (isConnected && chain) {
      setTokens(getTokens(chain?.id || 0));
      setSelected(getTokens(chain?.id || 0)[0]);
      setLoadingBucket(true);
      getDeployedBucketsWrapper();
    }
  }, [isConnected, refreshData, chain]);

  const getDeployedBucketsWrapper = async () => {
    const deployedBuckets = await getBucketList(chain?.id!);
    setBucketList(deployedBuckets);
    setLoadingBucket(false);
  };

  const handleTokenInput = (e: any, token: any) => {
    let updated = false;
    let _bucketValue = bucketValue;
    for (let i = 0; i < _bucketValue.length; i++) {
      if (_bucketValue[i].tokenAddress === token.address) {
        // update the bucket percentage
        _bucketValue[i].weightage = BigInt(e.target.value * 1000);
        updated = true;
      }
    }
    if (!updated) {
      _bucketValue.push({
        tokenAddress: token.address,
        weightage: BigInt(e.target.value * 1000),
      });
    }
    setBucketValue(_bucketValue);
  };

  function getWeightageByTokenAddress(searchTokenAddress: string) {
    const foundObject = bucketValue.find(
      ({ tokenAddress }: { tokenAddress: string }) =>
        tokenAddress === searchTokenAddress
    );
    return foundObject ? Number(foundObject.weightage) / 1000 : null;
  }

  const handleCreateBucket = async () => {
    if (isConnected) {
      const htmlContent = document.getElementById("nftImageBody")!;
      const canvas = await html2canvas(htmlContent);
      canvas.toBlob(async (blob) => {
        const file = new File([blob!], "capturedImage.png", {
          type: "image/png",
        });
        const nftImageHash = await uploadImageUsingBuffer(file);
        let newArray = bucketValue.map(({ tokenAddress, weightage }: any) => ({
          name: getActiveToken(tokenAddress, chain?.id!).name,
          value: Number(weightage) / 1000,
        }));
        const metadata = {
          description: bucketDescription,
          external_url:
            "https://gateway.lighthouse.storage/ipfs/" + nftImageHash,
          image: "https://gateway.lighthouse.storage/ipfs/" + nftImageHash,
          name: bucketName,
          attributes: newArray,
        };
        const lightHouseHash = await uploadJson(metadata);
        const transactionHash = await createBucket(
          bucketName,
          bucketDescription,
          lightHouseHash,
          bucketValue,
          chain?.id!
        );

        if (transactionHash) {
          toast((t) => (
            <span className="flex flex-col justify-center items-center">
              Transaction Submitted Succesfullly!!!
              <Link
                href={`${getChainExplorer(chain?.id!)}${transactionHash}`}
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

        setPreviewNft(!previewNft);
        setIsOpen(false);
      });
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen gap-12 px-6 py-4 pt-28 lg:px-24 text-secondary">
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col items-center justify-between w-full gap-4 p-4 rounded-lg shadow-md bg-primary md:flex-row md:px-6 md:py-4">
          <div className="flex flex-row items-center justify-start gap-2">
            <div className="w-6 h-6">
              <BellAlertIcon className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-medium">
              Craft Your Future: Build Your Crypto Kingdom, One Bucket at a
              Time.
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-6 py-2 text-lg font-medium bg-transparent border rounded-full md:w-44 border-secondary text-secondary"
          >
            Create Now
          </button>
        </div>
        <div className="grid w-full grid-cols-1 gap-4">
          <div className="flex flex-row items-center justify-start gap-2 py-3 pl-2 rounded-full card">
            <MagnifyingGlassIcon className="w-5 h-5 text-white" />
            <input
              className="w-full text-white bg-transparent focus:outline-none"
              placeholder="Search for buckets (Ex: Bull Market, Token creator address etc)"
            />
          </div>
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex flex-row flex-wrap items-start justify-start gap-4">
              <div className="border border-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-primary">
                <ChartBarIcon className="w-5 h-5" />
                <h2>Top gainers</h2>
              </div>
              <div className="border border-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-primary">
                <BoltIcon className="w-5 h-5" />
                <h2>Popular</h2>
              </div>
              <div className="border border-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-primary">
                <ScaleIcon className="w-5 h-5" />
                <h2>Recently rebalanced</h2>
              </div>
            </div>
            <select
              className="text-primary bg-transparent border border-primary focus:outline-none rounded-full pl-4 px-6 pr-4 py-1.5"
              name="Sort"
              id="Sort"
            >
              <option value={"Sort"}>Sort by</option>
              <option value={"Sort"}>Newest</option>
              <option value={"Sort"}>Oldest</option>
              <option value={"Sort"}>Popular</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-2">
          <Square3Stack3DIcon className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-primary">All Collection</h2>
        </div>
        {isConnected ? (
          <>
            {loadingBucket ? (
              <>
                <svg
                  role="status"
                  className="inline w-10 h-10 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </>
            ) : (
              <>
                {bucketList.length <= 0 && (
                  <div className="text-white">
                    There are no buckets on this network!!! Create one now!!!
                  </div>
                )}
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                  {bucketList.map((bucket: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-4 p-6 rounded-lg shadow-xl cursor-pointer card"
                      >
                        <div className="flex flex-row items-start justify-between">
                          <div
                            className={`h-14 flex justify-center items-center rounded-md text-white w-14 ${getRandomColor()} `}
                          >
                            <h2 className="text-5xl uppercase">
                              {bucket?.name?.charAt(0)}
                            </h2>
                          </div>
                          <div className="flex flex-row items-center justify-start gap-2">
                            {bucket.tokenAllocations
                              .slice(0, 3)
                              .map((tokens: any, i: number) => {
                                const _token = getActiveToken(
                                  tokens.token,
                                  chain?.id!
                                );
                                return (
                                  <div
                                    className="bg-slate-200 rounded-full p-0.5 ml-[-1rem]"
                                    key={i}
                                  >
                                    <Image
                                      className=" rounded-full"
                                      src={_token!.icon}
                                      alt={_token!.name}
                                      height={"30"}
                                      width={"30"}
                                    />
                                  </div>
                                );
                              })}
                            {bucket?.tokenAllocations?.length > 3 && (
                              <h5>{bucket?.tokenAllocations?.length - 3}+</h5>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-col items-start justify-start gap-4">
                            <div className="flex flex-col items-start justify-start">
                              <h2 className="text-lg font-medium">
                                {bucket.name}
                              </h2>

                              <h3 className="text-sm">
                                by {truncate(bucket.creator.id, 12, "...")}
                              </h3>
                            </div>
                          </div>
                          <Link
                            href={`/app/bucket/${bucket.id}`}
                            className="px-6 py-2 font-medium rounded-md shadow-md bg-primary text-secondary"
                          >
                            Invest
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <h3 className="text-lg text-primary">
            Connect Wallet to load the buckets!!!
          </h3>
        )}
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
          <div className="fixed inset-0 bg-secondary/90" aria-hidden="true" />
          {/* Full-screen scrollable container */}
          <div className="fixed inset-0 w-screen overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex items-center justify-center min-h-full p-4">
              {/* The actual dialog panel  */}
              {!previewNft ? (
                <Dialog.Panel className="flex flex-col w-full max-w-xl gap-2 p-6 mx-auto rounded-lg card">
                  <Dialog.Title className={"text-2xl font-semibold"}>
                    Create your own bucket
                  </Dialog.Title>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start justify-start gap-1">
                      <label htmlFor="">Name</label>
                      <input
                        className="w-full px-2 py-2 border rounded-md border-secondary text-secondary"
                        value={bucketName}
                        onChange={(e) => setBucketName(e.target.value)}
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-1">
                      <label htmlFor="">Description</label>
                      <textarea
                        className="w-full px-2 py-2 border rounded-md border-secondary text-secondary"
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
                      <div className="relative flex flex-col w-full gap-1">
                        <label htmlFor="">Select Token</label>
                        <div className="flex flex-row flex-wrap items-center justify-start gap-4">
                          {tokens.map((token: any, i: any) => {
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
                        <div className="flex flex-row items-center justify-center gap-1">
                          <Image
                            src={token.icon}
                            alt={token.name}
                            height={"20"}
                            width={"20"}
                          />
                          {token.name}
                        </div>
                        <div className="flex flex-row items-center justify-center col-span-3 gap-4">
                          <input
                            type="number"
                            // value={getTokenPercentage(token)} need to fix logic
                            onChange={(e) => handleTokenInput(e, token)}
                            className="px-4 py-1.5 border border-secondary rounded-md w-full text-secondary"
                            placeholder={`% of ${token.name} in the bucket`}
                          />
                          <TrashIcon
                            className="w-5 h-5"
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

                    <div className="flex flex-row items-center justify-end mt-8">
                      <button
                        className="bg-primary text-secondary px-6 py-1.5 rounded-md shadow-md text-lg"
                        onClick={() => setPreviewNft(!previewNft)}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                  {/* ... */}
                </Dialog.Panel>
              ) : (
                <Dialog.Panel className="flex flex-col items-center justify-center w-full max-w-xl gap-2 p-6 mx-auto rounded-lg card">
                  <div
                    id="nftImageBody"
                    className="w-[500px] h-[500px] bg-secondary flex flex-col gap-8 justify-between items-center px-8 py-12"
                  >
                    <img
                      src={"/logo/TokenKrafters-Teal.png"}
                      alt={"TokenKrafter Logo"}
                      height="350"
                      width="350"
                    />
                    <div className="flex flex-col items-center justify-center gap-8">
                      <div className="text-2xl font-medium">
                        <h1 className="text-2xl font-medium">{bucketName}</h1>
                      </div>
                      <div className="grid items-center justify-center w-full grid-cols-2 gap-8">
                        {selectedTokens
                          .slice(0, 4)
                          .map((token: any, i: number) => {
                            return (
                              <div
                                key={i}
                                className="flex flex-row items-center justify-center gap-4 px-6 py-2 card"
                              >
                                <div>
                                  <img
                                    src={token.icon}
                                    alt={token.name}
                                    height={40}
                                    width={40}
                                  />
                                </div>
                                <div className="flex flex-row items-center justify-center gap-2">
                                  <h3>{token.name}</h3>
                                  <h3>
                                    (
                                    {getWeightageByTokenAddress(token.address) +
                                      "%"}
                                    )
                                  </h3>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      {selectedTokens.length > 4 && (
                        <div className="flex justify-center items-center">
                          +{selectedTokens.length - 4} more
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-md bg-primary">
                      <img
                        src={getChainSvg(chain?.id!)}
                        width={"40"}
                        height={"40"}
                        alt="Chain Icon"
                      />
                    </div>
                  </div>
                  <div>
                    Note: Please check your wallet for approving the
                    transaction.
                  </div>
                </Dialog.Panel>
              )}
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
