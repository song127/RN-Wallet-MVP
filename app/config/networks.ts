/**
 * 지원 네트워크 목록 및 정보 정의
 * 네트워크 추가/수정/삭제는 이 파일에서 관리
 *
 * @author bifrost-wallet
 */

import { INFURA_KEY } from "@env";
import { Ionicons } from "@expo/vector-icons";

export type IoniconName = keyof typeof Ionicons.glyphMap;
export type NetworkIcon = `ion:${IoniconName}` | `url:${string}`;

export interface NetworkConfig {
  id: string; // unique key (e.g., 'ethereum')
  name: string; // 네트워크 이름
  symbol: string; // 토큰 심볼 (예: ETH, MATIC)
  chainId: number; // EVM chainId
  chainHex: string; // 0x-prefixed chainId
  rpcUrl: string; // 기본 RPC URL
  explorerUrl: string; // 블록 익스플로러 URL
  icon: NetworkIcon;
}

export const SUPPORTED_NETWORKS = [
  {
    id: "bifrost-testnet",
    name: "Bifrost Testnet",
    symbol: "BFC",
    chainId: 49088,
    chainHex: "0xbfc0",
    rpcUrl: "https://public-01.testnet.thebifrost.io/rpc",
    explorerUrl: "https://explorer.testnet.thebifrost.io",
    icon: "ion:flask-outline",
  },
  {
    id: "bifrost",
    name: "Bifrost Mainnet",
    symbol: "BFC",
    chainId: 3068,
    chainHex: "0xbfc",
    rpcUrl: "https://bifrost-rpc.liebi.com/ws",
    explorerUrl: "https://explorer.bifrost.finance",
    icon: "url:https://assets.coingecko.com/coins/images/4639/standard/BFC_Symbol.png?1696505208",
  },
  {
    id: "sepolia",
    name: "Sepolia Testnet",
    symbol: "ETH",
    chainId: 11155111,
    chainHex: "0xaa36a7",
    rpcUrl: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    explorerUrl: "https://sepolia.etherscan.io",
    icon: "ion:flask-outline",
  },
  {
    id: "ethereum",
    name: "Ethereum Mainnet",
    symbol: "ETH",
    chainId: 1,
    chainHex: "0x1",
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    explorerUrl: "https://etherscan.io",
    icon: "url:https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
  },
] as const;

export type SupportedNetworkId = (typeof SUPPORTED_NETWORKS)[number]["id"];
export type SupportedNetwork = (typeof SUPPORTED_NETWORKS)[number];

/**
 * 앱의 기본 네트워크 id (테스트넷 우선)
 */
export const DEFAULT_NETWORK_ID: SupportedNetworkId = "bifrost-testnet";
