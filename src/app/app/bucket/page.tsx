import { Tokens } from "@/app/components/constants/tokens";
import truncate from "@/app/components/utils/truncate";
import {
  ArrowPathIcon,
  ChartBarIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
export default function Page() {
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
                <h2 className="font-medium text-2xl">Balanced Case</h2>
                <h3 className="text-sm">
                  Managed by{" "}
                  {truncate(
                    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    12,
                    "..."
                  )}
                </h3>
              </div>
              <div className="flex flex-row justify-start items-center max-w-lg gap-2">
                <p>
                  A portfolio of stocks, which will get benefit from the RE
                  sector development. Rec amount {">"} 4 lac
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-primary/90 text-secondary px-4 py-1 text-lg rounded-md shadow-sm font-medium">
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
          {Tokens.map((token, i) => {
            return (
              <div
                className="card flex flex-col gap-2 justify-center items-center p-4"
                key={i}
              >
                <Image
                  src={token.icon}
                  alt={token.name}
                  height={"30"}
                  width={"30"}
                />
                <h3 className="text-lg font-semibold">{token.name} (20%)</h3>
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
