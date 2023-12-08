export const abi = [
  {
    "inputs": [],
    "name": "CallerNotBucketCreator",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTotalWeightage",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotOwnerOfNFT",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "investor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Invested",
    "type": "event"
  }
] as const;
