import Image from "next/image";
import Link from "next/link";
import Chains from "@/app/components/data/chains.json";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
export default function Home() {
  const Section1 = [
    {
      icon: "/icons/section-1/Investing.png",
      name: "Clear & Simple Investing",
      desc: "Discover the clarity of modern crypto portfolios with TokenKrafters – where simplicity meets smart investing, making the crypto landscape accessible to all. Expert-Crafted Strategies:",
    },
    {
      icon: "/icons/section-1/Strategy.png",
      name: "Expert-Crafted Strategies",
      desc: "Unlock the power of expert insights with TokenKrafters, as our crypto portfolios are meticulously crafted by industry professionals, ensuring a foundation rooted in comprehensive research.",
    },
    {
      icon: "/icons/section-1/Crypto.png",
      name: "Your Crypto, Your Way",
      desc: "Experience the freedom of personalized crypto investments with TokenKrafters. Tailor your portfolio effortlessly, creating a unique strategy that aligns perfectly with your financial goals.",
    },
  ];
  const Section2 = [
    {
      icon: "/icons/section-2/stability.png",
      name: "Stability",
      desc: "Go for stable returns at low volatility levels",
    },
    {
      icon: "/icons/section-2/explore.png",
      name: "Explore",
      desc: "Explore portfolios on disruptive ideas & long-term trends",
    },
    {
      icon: "/icons/section-2/low.png",
      name: "Low Inv. Amount",
      desc: "Start with any amount of investment you desire",
    },
    {
      icon: "/icons/section-2/tracking.png",
      name: "Trackers",
      desc: "Take exposure to important sectors using buckets",
    },
  ];
  return (
    <>
      <main className="flex min-h-[95vh] flex-col items-center justify-center p-6 pt-24 md:p-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 justify-center items-start">
            <div className="flex flex-col gap-8 justify-center items-start">
              <div className="flex flex-col gap-2 justify-center items-start">
                <h1 className="text-6xl md:text-7xl font-semibold gradient-title">
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
              src={"/hero-section.svg"}
              alt="Hero Icon"
              height={"500"}
              width={"500"}
            />
          </div>
        </div>
      </main>
      <a href="#below" className="flex justify-center items-center">
        <ChevronDownIcon className="h-10 w-10 animate-bounce" />
      </a>
      <section
        className="md:px-24 p-6 flex flex-col justify-center items-center py-12 md:py-36"
        id="below"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center gap-12 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="gradient-title text-4xl md:text-5xl">
              Idea-Infused Crypto Portfolios For You
            </h2>
            <h3 className="text-lg md:text-xl">
              Your Ultimate Destination for Crypto Portfolios Aligned with
              Themes, Strategies and Objectives.
            </h3>
          </div>
          <div className="flex flex-col gap-20">
            {Section1.map((list, i) => {
              return (
                <div
                  className="flex flex-row gap-6 justify-center items-center"
                  key={i}
                >
                  <Image
                    src={list.icon}
                    alt={list.name}
                    width={"100"}
                    height={"100"}
                  />

                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-2xl text-primary">
                      {list.name}
                    </h4>
                    <h5 className="text-base">{list.desc}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="md:px-24 p-6 flex flex-col justify-center gap-8 items-center py-12 md:py-36">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="gradient-title text-3xl md:text-4xl">
            There is a Krafted Token Bucket for everyone
          </h2>
          <p className="text-xl">
            Looking to start with a small investment or thinking of low
            volatililty? Choose from a diverse menu
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full">
          {Section2.map((card, k) => {
            return (
              <div
                key={k}
                className="bg-secondary/50 border border-white rounded-xl flex flex-col gap-4 items-center md:text-left text-center md:items-start justify-center p-6"
              >
                <Image
                  src={card.icon}
                  alt={card.name}
                  height={"100"}
                  width={"100"}
                />
                <h3 className="font-medium text-xl text-primary">
                  {card.name}
                </h3>
                <h5 className="text-base font-light">{card.desc}</h5>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
