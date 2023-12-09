"use client";
import { enterRaffle } from "@/app/components/utils/contract/contractCalls";
import truncate from "@/app/components/utils/truncate";
import { Dialog, Transition } from "@headlessui/react";
import { TicketIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleInvest = async () => {
    // if (isConnected) {
    if (value.length > 0) {
      const invest = await enterRaffle(parseInt(value));
      console.log(invest);
    } else {
      toast.error("Enter the USDC amount to Invest");
      console.log("Enter the USDC amount to Invest");
    }
    // }
  };

  return (
    <section className="min-h-screen flex flex-col justify-start pt-28 gap-12 items-start px-6 py-4 lg:px-24 text-secondary">
      <div className="bg-primary flex flex-col gap-4 md:flex-row justify-between items-center w-full rounded-lg shadow-md px-6 py-4">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="w-6 h-6">
            <TicketIcon className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-medium">
            Ongoing Raffle: Participate in the Ongoing raffle and get a chance
            to win $200
          </h1>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="md:w-44 w-full bg-transparent border border-secondary text-secondary py-2 px-6 rounded-full text-lg font-medium"
        >
          Enter Raffle
        </button>
      </div>
      <div className="flex flex-col justify-start gap-4 items-start w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row justify-start items-center gap-2">
            <TrophyIcon className="h-6 w-6 text-primary" />
            <h1 className="text-primary font-semibold text-xl">
              Raffle Participants
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 w-full">
          <div className=" hidden md:grid grid-cols-5 gap-6 px-6 py-2 text-white w-full">
            <div>ID</div>
            <div>Winner</div>
            <div>Amount ($)</div>
            <div>Tx Hash</div>
            <div>Explorer</div>
          </div>
          <div className="card grid grid-cols-2 md:grid-cols-5 gap-6 px-6 py-3 w-full">
            <div>1.</div>
            <div className="w-full truncate">
              {truncate(
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                18,
                "..."
              )}
            </div>
            <div>$2000</div>
            <div className="w-full truncate">
              {truncate(
                "0xfa9068fa87219f52b4017dfa0fcc9d5b2495017491f8533aa387f816cc2efaf5",
                22,
                "..."
              )}
            </div>
            <div>
              <button className="text-primary">Link</button>
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
          <div className="fixed inset-0 w-screen overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex items-center justify-center min-h-full p-4">
              {/* The actual dialog panel  */}
              <Dialog.Panel className="flex flex-col w-full max-w-xl gap-2 p-6 mx-auto rounded-lg card">
                <Dialog.Title className={"text-2xl font-semibold"}>
                  Enter Amount
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
    </section>
  );
}
