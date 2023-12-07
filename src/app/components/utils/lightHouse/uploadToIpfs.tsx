const apiKey = "2fa66373.2858c97b7400495bbe8dbf9a5cd7d12d";

import lighthouse from '@lighthouse-web3/sdk'
import axios from 'axios';

export const uploadImageUsingBuffer = async (buffer: Buffer) => {
    const uploadResponse = await lighthouse.uploadBuffer(buffer, apiKey)
    const fileHash = await fetchActualHash(uploadResponse.data.Hash)
    return fileHash;
}

export const uploadJson = async (metadata: JSON) => {
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