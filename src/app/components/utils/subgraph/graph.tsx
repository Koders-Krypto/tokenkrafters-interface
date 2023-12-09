import axios, { AxiosResponse, AxiosError } from 'axios';


const apiUrl = 'https://api.studio.thegraph.com/query/43740/token-krafter-subgraph/v0.0.3';

interface GraphQLResponse {
    data: any
}

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
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
    tokenAllocations {
            token
      weightage
        }
}
}`

    const data = {
        query: graphqlQuery,
    };
    const response = await axios.post(apiUrl, data, axiosConfig);
    return response.data.data.buckets;
}

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
    investments {
      investor {
        id
      }
    }
  }
}`, variables: { bucketId: address }
    }

    const data = {
        query: graphqlQuery,
    };
    const response = await axios.post(apiUrl, graphqlQuery, axiosConfig);
    return response.data.data.bucket;
}

export const getBucketPortfolioView = async (bucketAddress: string, userAddress: string) => {
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
}`, variables: { bucket: bucketAddress, investor: userAddress }
    }

    const data = {
        query: graphqlQuery,
    };
    const response = await axios.post(apiUrl, graphqlQuery, axiosConfig);
    return response.data.data.investments;
}
