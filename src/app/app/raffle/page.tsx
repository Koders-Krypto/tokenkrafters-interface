import { Tokens } from "@/app/components/constants/tokens";
import truncate from "@/app/components/utils/truncate";
import {
  ArrowPathIcon,
  BanknotesIcon,
  BellAlertIcon,
  ChartBarIcon,
  QueueListIcon,
  TicketIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
export default function Page() {
  return (
    <section className="min-h-screen flex flex-col justify-start pt-28 gap-12 items-start px-6 py-4 lg:px-24 text-secondary">
      <div className="bg-primary flex flex-row justify-between items-center w-full rounded-lg shadow-md px-6 py-4">
        <div className="flex flex-row justify-start items-center gap-2">
          <TicketIcon className="h-6 w-6" />
          <h1 className="text-xl font-medium">
            Ongoing Raffle: Participate in the Ongoing raffle and get a chance
            to win $200
          </h1>
        </div>
        <button className=" bg-transparent border border-secondary text-secondary py-2 px-6 rounded-full text-lg font-medium">
          Enter Raffle
        </button>
      </div>
      <div className="flex flex-col justify-start gap-4 items-start w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row justify-start items-center gap-2">
            <TrophyIcon className="h-6 w-6 text-primary" />
            <h1 className="text-primary font-semibold text-xl">
              Raffle Winners
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 w-full">
          <div className="grid grid-cols-5 gap-6 px-6 py-2 text-white w-full">
            <div>ID</div>
            <div>Winner</div>
            <div>Amount ($)</div>
            <div>Tx Hash</div>
            <div>Explorer</div>
          </div>
          <div className="card grid grid-cols-5 gap-6 px-6 py-3 w-full">
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
    </section>
  );
}
