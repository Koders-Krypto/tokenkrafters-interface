const apiKey = "c6da2639.48df819445774731bd05d0e61dafbdd3";

import lighthouse from '@lighthouse-web3/sdk'
import axios from 'axios';

export const uploadImageUsingBuffer = async (buffer: any) => {
    const uploadResponse = await lighthouse.uploadBuffer(buffer, apiKey);
    console.log(uploadResponse.data.Hash);
    // const fileHash = await fetchActualHash(uploadResponse.data.Hash)
    return uploadResponse.data.Hash;
}

export const uploadJson = async (metadata: any) => {
    console.log(metadata);
    const response = await lighthouse.uploadText(JSON.stringify(metadata), apiKey);
    return response.data.Hash;
}

const fetchActualHash = async (fileHash: string) => {
    try {
        const response = await axios
            .post(`https://gateway.lighthouse.storage/api/v0/ls?arg=${fileHash}`);
        console.log(response.data.Objects[0].Links[0].Hash)
        return {
            success: true,
            data: response.data.Objects[0].Links[0].Hash
        }
    } catch (error: any) {
        return {
            success: false,
            data: error.message
        }
    }
}