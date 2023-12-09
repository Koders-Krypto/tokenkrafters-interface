import PieChartGraph from "@/app/components/Chart/PieChartGraph";
import truncate from "@/app/components/utils/truncate";
import {
  BriefcaseIcon,
  TicketIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

export default function Portfolio() {
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
              <div>Winner</div>
              <div>Amount ($)</div>
              <div>Tx Hash</div>
              <div>Explorer</div>
            </div>
            <div className="grid w-full grid-cols-2 gap-6 px-6 py-3 card md:grid-cols-5">
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
