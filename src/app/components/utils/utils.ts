import { getTokens } from "../constants/tokens";

export const getActiveToken = (address: string, chainId: number) => {
    const Tokens = getTokens(chainId);
    const token = Tokens.find(token => token.address.toLowerCase() === address.toLowerCase());

    if (token) {
        return token;
    } else {
        return Tokens[0]; // Token not found
    }
}