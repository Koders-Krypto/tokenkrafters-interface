import { publicClient } from './client'
import { factoryAbi } from './abi/TokenKrafterFactoryAbi';
import { BucketABI } from './abi/TokenKrafterBucketAbi';
import { writeContract, erc20ABI } from '@wagmi/core'
import { factoryAddress, raffleTokenAddress, tokenCrafterRaffle } from '../../constants/tokens';
import { raffleAbi } from './abi/TokenKrafterRaffle';



export const readContract = async () => {
    try {
        const data = await publicClient.readContract({
            address: factoryAddress,
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
            address: factoryAddress,
            abi: factoryAbi,
            functionName: 'createBucket',
            args: [name, description, bucketTokenURI, bucketValue]
        })
        const transaction = await publicClient.waitForTransactionReceipt({ hash: hash });
        return true;
    } catch (e) {
        console.log(e);
    }
}

export const getDeployedBuckets = async () => {
    try {
        const data = await publicClient.readContract({
            address: factoryAddress,
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

export const investInBucket = async (bucketAddress: `0x{string}`, address: `0x{string}`, amount: number) => {
    try {
        const { hash: approve } = await writeContract({
            address: address,
            abi: erc20ABI,
            functionName: 'approve',
            args: [bucketAddress, BigInt(amount * 10 ** 6)]
        })
        const transaction = await publicClient.waitForTransactionReceipt({ hash: approve });
        const { hash } = await writeContract({
            address: bucketAddress,
            abi: BucketABI,
            functionName: 'invest',
            args: [address, BigInt(amount * 10 ** 6)]
        })
        return hash;
    } catch (e) {
        console.log(e);
    }

}

export const enterRaffle = async (amount: number) => {
    try {
        const { hash: approve } = await writeContract({
            address: raffleTokenAddress,
            abi: erc20ABI,
            functionName: 'approve',
            args: [tokenCrafterRaffle, BigInt(amount * 10 ** 6)]
        })
        const transaction = await publicClient.waitForTransactionReceipt({ hash: approve });
        const { hash } = await writeContract({
            address: tokenCrafterRaffle,
            abi: raffleAbi,
            functionName: 'deposit',
            args: [[raffleTokenAddress], [BigInt(amount * 10 ** 6)]]
        })
        return hash;
    } catch (e) {
        console.log(e);
    }
}