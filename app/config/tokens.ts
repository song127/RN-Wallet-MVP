import type { SupportedNetworkId } from "./networks";

export interface TokenConfig {
  id: string; // unique per network
  name: string;
  symbol: string;
  decimals: number;
  address: string; // contract address (native token은 '0x0' 등으로)
  icon?: string; // optional: url or base64
  // 기타 필요한 메타데이터 추가 가능
}

export type NetworkTokens = {
  [networkId in SupportedNetworkId]: TokenConfig[];
};

export const TOKENS: NetworkTokens = {
  "bifrost-testnet": [
    {
      id: "bfc",
      name: "Bifrost Testnet Token",
      symbol: "BFC",
      decimals: 18,
      address: "0x0",
      icon: "https://assets.coingecko.com/coins/images/4639/standard/BFC_Symbol.png?1696505208",
    },
  ],
  bifrost: [
    {
      id: "bfc",
      name: "Bifrost",
      symbol: "BFC",
      decimals: 18,
      address: "0x0",
      icon: "https://assets.coingecko.com/coins/images/4639/standard/BFC_Symbol.png?1696505208",
    },
  ],
  sepolia: [
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x0",
      icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // Sepolia USDC
      icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    },
  ],
  ethereum: [
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x0",
      icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
    },
    {
      id: "usdt",
      name: "Tether USD",
      symbol: "USDT",
      decimals: 6,
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
    },
  ],
};
