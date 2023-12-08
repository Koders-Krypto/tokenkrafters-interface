import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { polygonMumbai, arbitrumGoerli } from 'viem/chains'

export const publicClient = createPublicClient({
    chain: arbitrumGoerli,
    transport: http()
})