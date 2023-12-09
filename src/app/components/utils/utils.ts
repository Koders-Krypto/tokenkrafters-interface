import { Tokens } from "../constants/tokens";

export const getTokens = (address: string) => {
    const token = Tokens.find(token => token.address.toLowerCase() === address.toLowerCase());

    if (token) {
        return token;
    } else {
        return Tokens[0]; // Token not found
    }
}