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
import { Tokens, tokenSvgImage } from "../components/constants/tokens";
import Image from "next/image";
import truncate from "../components/utils/truncate";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  createBucket,
  getDeployedBuckets,
} from "../components/utils/contract/contractCalls";
import { useAccount } from "wagmi";
import { getTokens } from "../components/utils/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getRandomColor } from "../components/data/randomColors";
import Loading from "../loading";
import { slice } from "viem";
import html2canvas from "html2canvas";
import {
  uploadImageUsingBuffer,
  uploadJson,
} from "../components/utils/lightHouse/uploadToIpfs";
import { createCanvas } from "canvas";
import {
  getBucketList,
  getBucketPortfolioView,
} from "../components/utils/subgraph/graph";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [tokens, setTokens] = useState(Tokens);
  const [selected, setSelected] = useState(Tokens[0]);
  const [selectedTokens, setSelectedTokens] = useState<any>([]);
  const [bucketDescription, setBucketDescription] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [bucketValue, setBucketValue] = useState<any>([]);
  const [bucketList, setBucketList] = useState<any>([]);
  const [previewNft, setPreviewNft] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [loadingBucket, setLoadingBucket] = useState(false);

  const router = useRouter();

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    if (previewNft === true) {
      // html2canvas(document.getElementById("nftImageBody")!).then(function (canvas) {
      handleCreateBucket();
      // });
    }
  }, [previewNft]);

  useEffect(() => {
    if (isConnected) {
      setLoadingBucket(true);
      getDeployedBucketsWrapper();
    }
  }, [isConnected, refreshData]);

  const getDeployedBucketsWrapper = async () => {
    const deployedBuckets = await getBucketList();
    console.log(deployedBuckets);
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
          name: getTokens(tokenAddress).name,
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
          bucketValue
        );
        // TODO : Add Toast

        setPreviewNft(!previewNft);
        setRefreshData(!refreshData);
        setIsOpen(false);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start pt-28 gap-12 items-start px-6 py-4 lg:px-24 text-secondary">
      <div className="flex flex-col gap-6 w-full">
        <div className="bg-primary flex flex-col gap-4 md:flex-row justify-between items-center w-full rounded-lg shadow-md md:px-6 p-4 md:py-4">
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="w-6 h-6">
              <BellAlertIcon className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-medium">
              Craft Your Future: Build Your Crypto Kingdom, One Bucket at a
              Time.
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full md:w-44 bg-transparent border border-secondary text-secondary py-2 px-6 rounded-full text-lg font-medium"
          >
            Create Now
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="flex flex-row justify-start items-center gap-2 card rounded-full py-3 pl-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            <input
              className="bg-transparent w-full focus:outline-none text-white"
              placeholder="Search for buckets (Ex: Bull Market, Token creator address etc)"
            />
          </div>
          <div className="flex flex-row flex-wrap justify-between items-center gap-4">
            <div className="flex flex-row flex-wrap gap-4 justify-start items-start">
              <div className="border border-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-primary">
                <ChartBarIcon className="h-5 w-5" />
                <h2>Top gainers</h2>
              </div>
              <div className="border border-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-primary">
                <BoltIcon className="h-5 w-5" />
                <h2>Popular</h2>
              </div>
              <div className="border border-primary px-6 py-1.5 rounded-full shadow-md flex gap-2 flex-row justify-center items-center text-primary">
                <ScaleIcon className="h-5 w-5" />
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
      <div className="flex flex-col gap-4 justify-start items-start w-full">
        <div className="flex flex-row justify-start items-center gap-2">
          <Square3Stack3DIcon className="h-6 w-6 text-primary" />
          <h2 className="text-primary font-semibold text-xl">All Collection</h2>
        </div>
        {isConnected ? (
          <>
            {loadingBucket ? (
              <>
                <svg
                  role="status"
                  className="inline h-10 w-10 animate-spin text-white"
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
                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
                  {bucketList.map((bucket: any, index: number) => {
                    return (
                      <Link
                        href={`/app/bucket/${bucket.id}`}
                        key={index}
                        className="card p-6 rounded-lg shadow-xl flex flex-col gap-4 cursor-pointer"
                      >
                        <div className="flex flex-row justify-between items-start">
                          <div className="flex flex-col justify-start items-start gap-4">
                            <div
                              className={`h-14 flex justify-center items-center rounded-md text-white w-14 ${getRandomColor()} `}
                            >
                              <h2 className="text-5xl uppercase">
                                {bucket?.name?.charAt(1)}
                              </h2>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                              <h2 className="font-medium text-lg">
                                {bucket.name}
                              </h2>

                              <h3 className="text-sm">
                                by {truncate(bucket.creator.id, 12, "...")}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row justify-start items-center gap-2">
                            {bucket.tokenAllocations
                              .slice(0, 5)
                              .map((tokens: any, i: number) => {
                                const _token = getTokens(tokens.token);
                                return (
                                  <Image
                                    key={i}
                                    src={_token!.icon}
                                    alt={_token!.name}
                                    height={"30"}
                                    width={"30"}
                                  />
                                );
                              })}
                            {bucket?.tokenAllocations?.length > 5 && (
                              <h5>{bucket?.tokenAllocations?.length - 5}+</h5>
                            )}
                          </div>
                        </div>
                      </Link>
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
            <div className="flex min-h-full items-center justify-center p-4">
              {/* The actual dialog panel  */}
              {!previewNft ? (
                <Dialog.Panel className="flex flex-col gap-2 mx-auto max-w-xl w-full rounded-lg card p-6">
                  <Dialog.Title className={"text-2xl font-semibold"}>
                    Create your own bucket
                  </Dialog.Title>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 justify-start items-start">
                      <label htmlFor="">Name</label>
                      <input
                        className="px-2 py-2 border border-secondary rounded-md w-full text-secondary"
                        value={bucketName}
                        onChange={(e) => setBucketName(e.target.value)}
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-1 justify-start items-start">
                      <label htmlFor="">Description</label>
                      <textarea
                        className="px-2 py-2 border border-secondary rounded-md w-full text-secondary"
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
                        <div className="flex flex-row gap-4 flex-wrap justify-start items-center">
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
                            className="px-4 py-1.5 border border-secondary rounded-md w-full text-secondary"
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
                <Dialog.Panel className="flex flex-col gap-2 mx-auto justify-center items-center max-w-xl w-full rounded-lg card p-6">
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
                    <div className="flex flex-col justify-center items-center gap-8">
                      <div className="text-2xl font-medium">
                        <h1 className="text-2xl font-medium">{bucketName}</h1>
                      </div>
                      <div className="grid grid-cols-2 w-full gap-8 justify-center items-center">
                        {selectedTokens.map((token: any, i: number) => {
                          return (
                            <div
                              key={i}
                              className="flex flex-row gap-4 card px-6 py-2 items-center justify-center"
                            >
                              <div>
                                <img
                                  src={token.icon}
                                  alt={token.name}
                                  height={40}
                                  width={40}
                                />
                              </div>
                              <div className="flex flex-row gap-2 justify-center items-center">
                                <h3>{token.name}</h3>
                                <h3>
                                  ({getWeightageByTokenAddress(token.address)})
                                </h3>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-primary h-16 w-16 rounded-full shadow-md flex justify-center items-center">
                      <img
                        src={tokenSvgImage}
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
