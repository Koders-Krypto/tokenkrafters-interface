const Tokens = [
  {
    name: "WBTC",
    icon: "/supported-tokens/wbtc.svg",
    address: "0x0eeb64ca7072f27506c44a2a9f08fd8cae5d8283",
    decimals: 18,
  },
  {
    name: "WETH",
    icon: "/supported-tokens/eth.svg",
    address: "0x0a03a0acba9677cf6b6750858a610ca2f2dd2200",
    decimals: 18,
  },
  {
    name: "WBNB",
    icon: "/supported-tokens/wbnb.svg",
    address: "0xd370874753260a6e95da818a7709360a0190c4d3",
    decimals: 18,
  },
  {
    name: "DAI",
    icon: "/supported-tokens/dai.svg",
    address: "0x38aa2e0972fb8f237a8bfbdd31ae0881594fa7a7",
    decimals: 18,
  },
  {
    name: "USDT",
    icon: "/supported-tokens/usdt.svg",
    address: "0xa37b75b9d0b69a424ef0e211c3507a5dfe9e0355",
    decimals: 6,
  },
  {
    name: "USDC",
    icon: "/supported-tokens/usdc.svg",
    address: "0x4b83ed13b388b126056fbd1f8518b8d9f904b7d5",
    decimals: 6,
  },
  {
    name: "ARB",
    icon: "/supported-tokens/arb.svg",
    address: "0xe19722febdd63148014bdc3e1f1ef40e97086af5",
    decimals: 18,
  },
  {
    name: "WMATIC",
    icon: "/supported-tokens/wmatic.svg",
    address: "0x768a6adeed7ac201adf3e19ffd4b65fd4472c261",
    decimals: 18,
  },
  {
    name: "OP",
    icon: "/supported-tokens/op.svg",
    address: "0x8f452dbebd0cfa94a4a76f57ace778108a9683ad",
    decimals: 18,
  },
  {
    name: "MNT",
    icon: "/supported-tokens/mantle.svg",
    address: "0xba17f81a8bd934f840062f29b6f9361fed07c0b5",
    decimals: 18,
  },
  {
    name: "AAVE",
    icon: "/supported-tokens/aave.svg",
    address: "0x94eefc6177e3b5bdb773e41df1c90d86dfcdc427",
    decimals: 18,
  },
  {
    name: "stETH",
    icon: "/supported-tokens/steth.svg",
    address: "0xa90a86b5a43e8dbd70aa43aad4e0424cccbd44e3",
    decimals: 18,
  },
  {
    name: "rETH",
    icon: "/supported-tokens/reth.svg",
    address: "0xe2d30126f4580dbc19990fbf45fe7e860c20e223",
    decimals: 18,
  },
  {
    name: "LDO",
    icon: "/supported-tokens/lido.svg",
    address: "0x089ce8d156c7e9b2066b04b7e905c78e83547379",
    decimals: 18,
  },
  {
    name: "RPL",
    icon: "/supported-tokens/rpl.svg",
    address: "0x575e857ffba2b0e27db0f603883aea8dfa2faa89",
    decimals: 18,
  },
];

const chainObj = {
  421613: [
    {
      name: "WBTC",
      icon: "/supported-tokens/wbtc.svg",
      address: "0x0eeb64ca7072f27506c44a2a9f08fd8cae5d8283",
    },
    {
      name: "WETH",
      icon: "/supported-tokens/eth.svg",
      address: "0x0a03a0acba9677cf6b6750858a610ca2f2dd2200",
    },
    {
      name: "WBNB",
      icon: "/supported-tokens/wbnb.svg",
      address: "0xd370874753260a6e95da818a7709360a0190c4d3",
    },
    {
      name: "DAI",
      icon: "/supported-tokens/dai.svg",
      address: "0x38aa2e0972fb8f237a8bfbdd31ae0881594fa7a7",
    },
    {
      name: "USDT",
      icon: "/supported-tokens/usdt.svg",
      address: "0xa37b75b9d0b69a424ef0e211c3507a5dfe9e0355",
    },
    {
      name: "USDC",
      icon: "/supported-tokens/usdc.svg",
      address: "0x4b83ed13b388b126056fbd1f8518b8d9f904b7d5",
    },
    {
      name: "ARB",
      icon: "/supported-tokens/usdc.svg",
      address: "0xe19722febdd63148014bdc3e1f1ef40e97086af5",
    },
    {
      name: "WMATIC",
      icon: "/supported-tokens/usdc.svg",
      address: "0x768a6adeed7ac201adf3e19ffd4b65fd4472c261",
    },
    {
      name: "OP",
      icon: "/supported-tokens/usdc.svg",
      address: "0x8f452dbebd0cfa94a4a76f57ace778108a9683ad",
    },
    {
      name: "MNT",
      icon: "/supported-tokens/usdc.svg",
      address: "0xba17f81a8bd934f840062f29b6f9361fed07c0b5",
    },
    {
      name: "AAVE",
      icon: "/supported-tokens/usdc.svg",
      address: "0x94eefc6177e3b5bdb773e41df1c90d86dfcdc427",
    },
    {
      name: "stETH",
      icon: "/supported-tokens/usdc.svg",
      address: "0xa90a86b5a43e8dbd70aa43aad4e0424cccbd44e3",
    },
    {
      name: "rETH",
      icon: "/supported-tokens/usdc.svg",
      address: "0xe2d30126f4580dbc19990fbf45fe7e860c20e223",
    },
    {
      name: "LDO",
      icon: "/supported-tokens/usdc.svg",
      address: "0x089ce8d156c7e9b2066b04b7e905c78e83547379",
    },
    {
      name: "RPL",
      icon: "/supported-tokens/usdc.svg",
      address: "0x575e857ffba2b0e27db0f603883aea8dfa2faa89",
    },
  ],
};

const getChainSvg = (chainId: number) => {
  switch (chainId) {
    case 80001: // mumbai
      return "/supported-tokens/dai.svg";
    case 421613: // arb goerli
      return "/supported-tokens/dai.svg";
    case 44787: // celo
      return "/supported-tokens/dai.svg";
    case 8453: // base
      return "/supported-tokens/dai.svg";
    case 534352: // scroll
      return "/supported-tokens/dai.svg";
    default:
      return "/supported-tokens/dai.svg";
  }
};

const tokenSvgImage = "/supported-tokens/dai.svg";

const factoryAddress = "0x795220dda80b598093f88c9f46ca044a13d6358d";

const paymentAddress = "0x4b83ed13b388b126056fbd1f8518b8d9f904b7d5";

const tokenCrafterRaffle = "0x39790dedfdc1460251980fcf6aefcacfb271889f";

const raffleTokenAddress = "0x0a03a0acba9677cf6b6750858a610ca2f2dd2200";

const graphUrl = "https://api.studio.thegraph.com/query/43740/token-krafter-subgraph/v0.0.4";

export { Tokens, chainObj, factoryAddress, paymentAddress, tokenSvgImage, getChainSvg, tokenCrafterRaffle, graphUrl, raffleTokenAddress };
