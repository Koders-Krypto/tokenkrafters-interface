import Image from "next/image";
import Link from "next/link";
import Chains from "@/app/components/data/chains.json";
export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 pt-24 md:p-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 justify-center items-start">
            <div className="flex flex-col gap-8 justify-center items-start">
              <div className="flex flex-col gap-2 justify-center items-start">
                <h1 className="text-4xl md:text-7xl font-semibold gradient-title">
                  Unlocking Infinite Possibilities
                </h1>
                <h2 className=" text-xl md:text-2xl">
                  Your Gateway to Seamless Token Swaps and Diversified
                  Portfolios
                </h2>
              </div>

              <Link
                href={"/app"}
                className="bg-primary px-8 py-3 text-lg text-black rounded-lg shadow-lg font-semibold"
              >
                View Dapp
              </Link>
            </div>
            <div className="flex flex-row gap-4 justify-start items-center">
              {Chains.map((chain, i) => {
                return (
                  <div key={i}>
                    <Image
                      src={chain.logo}
                      alt={chain.name}
                      height={"40"}
                      width={"40"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-end items-center">
            <Image
              className=""
              src={"/hero-section1.svg"}
              alt="Hero Icon"
              height={"500"}
              width={"500"}
            />
          </div>
        </div>
      </main>
    </>
  );
}
