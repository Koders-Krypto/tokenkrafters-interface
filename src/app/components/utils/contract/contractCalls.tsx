import { publicClient } from './client'
import { factoryAbi } from './abi/TokenKrafterFactoryAbi';
import { BucketABI } from './abi/TokenKrafterBucketAbi';
import { writeContract, erc20ABI } from '@wagmi/core'



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
        return true;
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
        });
        const bucketDetailsArray = [];
        for (const bucketAddress of data) {
            const bucketDetails = await getBucketDetails(bucketAddress as `0x{string}`);
            bucketDetailsArray.push(bucketDetails);
        }
        return bucketDetailsArray;
    } catch (e) {
        console.log(e);
        return []; // Return an empty array in case of an error
    }
}

export const getBucketDetails = async (address: `0x{string}`) => {
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
        return {
            bucketAddress: address,
            bucketName,
            bucketDescription,
            bucketTokens
        }
    } catch (e) {
        console.log(e)
    }
}

export const investInBucket = async (bucketAddresss: `0x{string}`, address: `0x{string}`, amount: number) => {
    const { hash: approve } = await writeContract({
        address: address,
        abi: erc20ABI,
        functionName: 'approve',
        args: [bucketAddresss, BigInt(amount * 10 ** 6)]
    })
    const transaction = await publicClient.waitForTransactionReceipt({ hash: approve });
    console.log(transaction);
    const { hash } = await writeContract({
        address: bucketAddresss,
        abi: BucketABI,
        functionName: 'invest',
        args: [address, BigInt(amount * 10 ** 6)]
    })
    return hash;
}