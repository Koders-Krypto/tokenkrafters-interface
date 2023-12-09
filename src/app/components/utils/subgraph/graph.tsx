import axios, { AxiosResponse, AxiosError } from "axios";
import { graphUrl } from "../../constants/tokens";

const apiUrl = graphUrl;

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getBucketList = async () => {
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
  const response = await axios.post(apiUrl, data, axiosConfig);
  return response.data.data.buckets;
};

export const getBucketDetailView = async (address: string) => {
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
  const response = await axios.post(apiUrl, graphqlQuery, axiosConfig);
  return response.data.data.bucket;
};

export const getBucketPortfolioView = async (
  bucketAddress: string,
  userAddress: string
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
  const response = await axios.post(apiUrl, graphqlQuery, axiosConfig);
  return response.data.data.investments;
};

export const getPortfolio = async (account: string) => {
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
}`, variables: { account: account }
  };

  const response = await axios.post(apiUrl, graphqlQuery, axiosConfig);
  return response.data.data.account.investments;
}