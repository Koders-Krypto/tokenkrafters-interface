import { publicClient } from './client'
import { factoryAbi } from './abi/TokenKrafterFactoryAbi';
import { BucketABI } from './abi/TokenKrafterBucketAbi';
import { writeContract } from '@wagmi/core'



export const readContract = async () => {
    try {
        const data = await publicClient.readContract({
            address: '0x465b5872fd5565f78cd723b08c686df4b5e85b3f',
            abi: factoryAbi,
            functionName: 'swapRouter',
        })
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

export const createBucket = async (name: string, description: string, bucketTokenURI: string, bucketValue: any) => {

    console.log(bucketValue);
    try {
        const { hash } = await writeContract({
            address: '0x465b5872fd5565f78cd723b08c686df4b5e85b3f',
            abi: factoryAbi,
            functionName: 'createBucket',
            args: [name, description, bucketTokenURI, bucketValue]
        })
        // const data = await publicClient.simulateContract({
        //     account,
        //     address: '0x465b5872fd5565f78cd723b08c686df4b5e85b3f',
        //     abi: factoryAbi,
        //     functionName: 'createBucket',
        //     args: [name, description, bucketTokenURI, bucketValue]
        // })
        console.log(hash);
    } catch (e) {
        console.log(e);
    }
}

export const getDeployedBuckets = async () => {
    try {
        const data = await publicClient.readContract({
            address: '0x465b5872fd5565f78cd723b08c686df4b5e85b3f',
            abi: factoryAbi,
            functionName: 'deployedBuckets',
        })
        console.log(data);
        await getBucketDetails(data[0] as `0x{string}`);
    } catch (e) {
        console.log(e)
    }
}

const getBucketDetails = async (address: `0x{string}`) => {
    try {
        const bucketName = await publicClient.readContract({
            address: address,
            abi: BucketABI,
            functionName: 'bucketName'
        })
        const bucketDescription = await publicClient.readContract({
            address: address,
            abi: BucketABI,
            functionName: 'bucketDescription'
        })
        const bucketTokens = await publicClient.readContract({
            address: address,
            abi: BucketABI,
            functionName: 'tokenAllocations',
        })
        console.log(bucketName);
        console.log(bucketDescription);
        console.log(bucketTokens);
    } catch (e) {
        console.log(e)
    }
}