import Image from "next/image";
import Link from "next/link";
import Chains from "@/app/components/data/chains.json";
export default function Home() {
  const Data = [
    {
      icon: "/icons/Investing.png",
      name: "Clear & Simple Investing:",
      desc: "Discover the clarity of modern crypto portfolios with TokenKrafters – where simplicity meets smart investing, making the crypto landscape accessible to all. Expert-Crafted Strategies:",
    },
    {
      icon: "/icons/Strategy.png",
      name: "Expert-Crafted Strategies:",
      desc: "Unlock the power of expert insights with TokenKrafters, as our crypto portfolios are meticulously crafted by industry professionals, ensuring a foundation rooted in comprehensive research.",
    },
    {
      icon: "/icons/Crypto.png",
      name: "Your Crypto, Your Way:",
      desc: "Experience the freedom of personalized crypto investments with TokenKrafters. Tailor your portfolio effortlessly, creating a unique strategy that aligns perfectly with your financial goals.",
    },
  ];
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 pt-24 md:p-24">
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
      <section className="md:px-24 p-6 flex flex-col justify-center items-center">
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
          <div className="flex flex-col gap-12">
            {Data.map((list, i) => {
              return (
                <div
                  className="flex flex-row gap-6 justify-center items-center"
                  key={i}
                >
                  <div>
                    <Image
                      src={list.icon}
                      alt={list.name}
                      width={"300"}
                      height={"300"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-medium text-2xl text-primary">
                      {list.name}
                    </h4>
                    <h5 className="text-base font-light">{list.desc}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
