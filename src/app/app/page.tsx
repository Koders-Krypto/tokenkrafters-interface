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
} from "@heroicons/react/24/solid";
import { Tokens } from "../components/constants/tokens";
import Image from "next/image";
import truncate from "../components/utils/truncate";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);
  const [tokens, setTokens] = useState(Tokens);
  const [selected, setSelected] = useState(Tokens[0]);

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
              {Tokens.map((token, i) => {
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
              <Dialog.Panel className="flex flex-col gap-2 mx-auto max-w-xl w-full rounded-lg bg-white px-6 py-4">
                <Dialog.Title className={"text-2xl font-semibold"}>
                  Create your own bucket
                </Dialog.Title>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 justify-start items-start">
                    <label htmlFor="">Name</label>
                    <input
                      className="px-2 py-2 border border-secondary rounded-md w-full"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1 justify-start items-start">
                    <label htmlFor="">Description</label>
                    <textarea
                      className="px-2 py-2 border border-secondary rounded-md w-full"
                      name=""
                      id=""
                      cols={30}
                      rows={5}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative">
                        <Listbox.Button className="relative flex flex-row border border-secondary justify-center items-center gap-1 w-full cursor-default rounded-lg bg-white py-1.5 pl-3 pr-4 text-left shadow-mdxw">
                          <Image
                            src={selected.icon}
                            alt={selected.name}
                            height={"25"}
                            width={"25"}
                          />
                          <span className="block truncate">
                            {selected?.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="h-5 w-5 text-secondary"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-50 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {Tokens.map((token: any, i) => (
                              <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                  `relative flex flex-row justify-start items-start cursor-default select-none py-2 px-6 ${
                                    active
                                      ? "bg-primary/10 text-primary"
                                      : "text-gray-900"
                                  }`
                                }
                                value={token}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`flex flex-row justify-center items-center gap-2 truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      <Image
                                        src={token.icon}
                                        alt={token.name}
                                        height={"20"}
                                        width={"20"}
                                      />
                                      {token.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    <input
                      className="px-4 py-1.5 border border-secondary col-span-2 rounded-md"
                      placeholder="% of the bucket"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative">
                        <Listbox.Button className="relative flex flex-row border border-secondary justify-center items-center gap-1 w-full cursor-default rounded-lg bg-white py-1.5 pl-3 pr-4 text-left shadow-mdxw">
                          <Image
                            src={selected.icon}
                            alt={selected.name}
                            height={"25"}
                            width={"25"}
                          />
                          <span className="block truncate">
                            {selected?.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="h-5 w-5 text-secondary"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-50 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {Tokens.map((token: any, i) => (
                              <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                  `relative flex flex-row justify-start items-start cursor-default select-none py-2 px-6 ${
                                    active
                                      ? "bg-primary/10 text-primary"
                                      : "text-gray-900"
                                  }`
                                }
                                value={token}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`flex flex-row justify-center items-center gap-2 truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      <Image
                                        src={token.icon}
                                        alt={token.name}
                                        height={"20"}
                                        width={"20"}
                                      />
                                      {token.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    <input
                      className="px-4 py-1.5 border border-secondary col-span-2 rounded-md"
                      placeholder="% of the bucket"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative">
                        <Listbox.Button className="relative flex flex-row border border-secondary justify-center items-center gap-1 w-full cursor-default rounded-lg bg-white py-1.5 pl-3 pr-4 text-left shadow-mdxw">
                          <Image
                            src={selected.icon}
                            alt={selected.name}
                            height={"25"}
                            width={"25"}
                          />
                          <span className="block truncate">
                            {selected?.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="h-5 w-5 text-secondary"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-50 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {Tokens.map((token: any, i) => (
                              <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                  `relative flex flex-row justify-start items-start cursor-default select-none py-2 px-6 ${
                                    active
                                      ? "bg-primary/10 text-primary"
                                      : "text-gray-900"
                                  }`
                                }
                                value={token}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`flex flex-row justify-center items-center gap-2 truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      <Image
                                        src={token.icon}
                                        alt={token.name}
                                        height={"20"}
                                        width={"20"}
                                      />
                                      {token.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    <input
                      className="px-4 py-1.5 border border-secondary col-span-2 rounded-md"
                      placeholder="% of the bucket"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative">
                        <Listbox.Button className="relative flex flex-row border border-secondary justify-center items-center gap-1 w-full cursor-default rounded-lg bg-white py-1.5 pl-3 pr-4 text-left shadow-mdxw">
                          <Image
                            src={selected.icon}
                            alt={selected.name}
                            height={"25"}
                            width={"25"}
                          />
                          <span className="block truncate">
                            {selected?.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="h-5 w-5 text-secondary"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-50 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {Tokens.map((token: any, i) => (
                              <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                  `relative flex flex-row justify-start items-start cursor-default select-none py-2 px-6 ${
                                    active
                                      ? "bg-primary/10 text-primary"
                                      : "text-gray-900"
                                  }`
                                }
                                value={token}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`flex flex-row justify-center items-center gap-2 truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      <Image
                                        src={token.icon}
                                        alt={token.name}
                                        height={"20"}
                                        width={"20"}
                                      />
                                      {token.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    <input
                      className="px-4 py-1.5 border border-secondary col-span-2 rounded-md"
                      placeholder="% of the bucket"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative">
                        <Listbox.Button className="relative flex flex-row border border-secondary justify-center items-center gap-1 w-full cursor-default rounded-lg bg-white py-1.5 pl-3 pr-4 text-left shadow-mdxw">
                          <Image
                            src={selected.icon}
                            alt={selected.name}
                            height={"25"}
                            width={"25"}
                          />
                          <span className="block truncate">
                            {selected?.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="h-5 w-5 text-secondary"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-50 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {Tokens.map((token: any, i) => (
                              <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                  `relative flex flex-row justify-start items-start cursor-default select-none py-2 px-6 ${
                                    active
                                      ? "bg-primary/10 text-primary"
                                      : "text-gray-900"
                                  }`
                                }
                                value={token}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`flex flex-row justify-center items-center gap-2 truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      <Image
                                        src={token.icon}
                                        alt={token.name}
                                        height={"20"}
                                        width={"20"}
                                      />
                                      {token.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    <input
                      className="px-4 py-1.5 border border-secondary col-span-2 rounded-md"
                      placeholder="% of the bucket"
                    />
                  </div>

                  <div className="flex justify-end items-center">
                    <button className="flex flex-row gap-1 text-white py-1 px-2 text-sm rounded-md shadow-sm bg-secondary">
                      <PlusIcon className="h-5 w-5" />
                      Add more
                    </button>
                  </div>
                  <div className="flex flex-row justify-end items-center">
                    <button className="bg-primary px-6 py-1.5 rounded-md shadow-md text-lg">
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
