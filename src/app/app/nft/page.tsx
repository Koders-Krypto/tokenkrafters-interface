import truncate from "@/app/components/utils/truncate";
import Image from "next/image";
export default function NFT() {
  const Data = [
    { icon: "/supported-tokens/dai.svg", name: "DAI", percentage: "20%" },
    { icon: "/supported-tokens/eth.svg", name: "WETH", percentage: "20%" },
    { icon: "/supported-tokens/usdc.svg", name: "USDC", percentage: "20%" },
    { icon: "/supported-tokens/usdt.svg", name: "USDT", percentage: "20%" },
    { icon: "/supported-tokens/wbnb.svg", name: "WBNB", percentage: "20%" },
    { icon: "/supported-tokens/wbnb.svg", name: "WBNB", percentage: "20%" },
  ];
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[800px] h-[800px] bg-secondary rounded-2xl flex flex-col gap-8 justify-between items-center relative px-8 py-16 shadow-lg">
        <Image
          src={"/logo/TokenKrafters-Teal.png"}
          alt={"TokenKrafter Logo"}
          height="350"
          width="350"
        />
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="text-2xl font-medium">
            <h1 className="text-2xl font-medium">Bucket Name</h1>
          </div>
          <div className="grid grid-cols-2 w-full gap-12 justify-center items-center">
            {Data.map((list, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-row gap-4 card px-6 py-2 items-center justify-center"
                >
                  <div>
                    <Image
                      src={list.icon}
                      alt={list.name}
                      height={40}
                      width={40}
                    />
                  </div>
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <h3>{list.name}</h3>
                    <h3>({list.percentage})</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute right-4 top-4">
          <div className="bg-primary h-16 w-16 rounded-full shadow-md flex justify-center items-center">
            <Image
              src={"/supported-chains/Arbitrum.svg"}
              width={"40"}
              height={"40"}
              alt="Chain Icon"
            />
          </div>
        </div>
        <h3 className="text-xl font-medium">
          {truncate("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 24, "...")}
        </h3>
      </div>
    </div>
  );
}
