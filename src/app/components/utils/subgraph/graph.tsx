import axios, { AxiosResponse, AxiosError } from "axios";
import { getsSubGraph } from "../../constants/tokens";


const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getBucketList = async (chainId: any) => {
  const graphqlQuery = `query MyQuery {
        buckets {
            id
    name
    description
    tokenURI
    createdAt
    creator {
      id
    }
    tokenAllocations {
            token
      weightage
        }
}
}`;

  const data = {
    query: graphqlQuery,
  };
  const response = await axios.post(getsSubGraph(chainId), data, axiosConfig);
  return response.data.data.buckets;
};

export const getBucketDetailView = async (address: string, chainId: any) => {
  const graphqlQuery = {
    query: `query ($bucketId: ID!){
  bucket(id: $bucketId) {
    name
    description
    tokenAllocations {
      token
      weightage
    }
    creator {
      id
    }
    investments {
      investor {
        id
      }
    }
  }
}`,
    variables: { bucketId: address },
  };
  const response = await axios.post(getsSubGraph(chainId), graphqlQuery, axiosConfig);
  return response.data.data.bucket ? response.data.data.bucket : [];
};

export const getBucketPortfolioView = async (
  bucketAddress: string,
  userAddress: string,
  chainId: any
) => {
  const graphqlQuery = {
    query: `query ($bucket: String!, $investor: String!) {
  investments(where: { bucket: $bucket, investor: $investor }) {
    id
    investmentToken
    investmentAmount
    investedAt
    allocations {
      token
      amount
    }
  }
}`,
    variables: { bucket: bucketAddress, investor: userAddress },
  };
  const response = await axios.post(getsSubGraph(chainId), graphqlQuery, axiosConfig);
  return response.data.data.investments ? response.data.data.investments : [];
};

export const getPortfolio = async (account: string, chainId: any) => {
  const graphqlQuery = {
    query: `query MyQuery($account: ID!) {
  account(id: $account) {
    investments {
      bucket {
        id
        name
        description
        tokenURI
        createdAt
        creator {
          id
        }
      }
      allocations {
        token
        amount
      }
      investedAt
      investmentAmount
      investmentToken
    }
  }
}`,
    variables: { account: account },
  };

  const response = await axios.post(getsSubGraph(chainId), graphqlQuery, axiosConfig);
  return response.data.data.account ? response.data.data.account.investments : [];
};
