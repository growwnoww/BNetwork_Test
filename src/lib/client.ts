import { createThirdwebClient, defineChain } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chainId = defineChain({
  id: 56, // BNB Mainnet chain ID
  rpc: "https://bsc-dataseed.binance.org/", // RPC URL for BNB Mainnet
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});



export const MainnetChain = defineChain({
  id: 56, // BNB Mainnet chain ID
  rpc: "https://bsc-dataseed.binance.org/", // RPC URL for BNB Mainnet
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});

export const TestnetChain = defineChain({
  id: 97, // BNB Testnet chain ID
  rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/", // RPC URL for BNB Testnet
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});

export const blockchainId = TestnetChain;

