/**
 * 지원 네트워크 관련 유틸리티 함수 모음
 *
 * @author bifrost-wallet
 */
import {
  SUPPORTED_NETWORKS,
  NetworkConfig,
  DEFAULT_NETWORK_ID,
} from "@/config/networks";

/**
 * 지원 네트워크 전체 목록을 반환합니다.
 * @returns NetworkConfig[]
 */
export function getSupportedNetworks(): NetworkConfig[] {
  return SUPPORTED_NETWORKS as unknown as NetworkConfig[];
}

/**
 * 네트워크 id로 네트워크 정보를 반환합니다.
 * @param id 네트워크 고유 id
 * @returns NetworkConfig | undefined
 */
export function getNetworkById(id: string): NetworkConfig | undefined {
  return SUPPORTED_NETWORKS.find((network) => network.id === id);
}

/**
 * 기본 네트워크 정보를 반환합니다.
 * @returns NetworkConfig | undefined
 */
export function getDefaultNetwork(): NetworkConfig | undefined {
  return SUPPORTED_NETWORKS.find(
    (network) => network.id === DEFAULT_NETWORK_ID
  );
}

/**
 * 네트워크 key(id)로 네트워크 정보를 반환합니다. (id alias)
 * @param key 네트워크 고유 id
 * @returns NetworkConfig | undefined
 */
export function getNetworkByKey(key: string): NetworkConfig | undefined {
  return getNetworkById(key);
}

/**
 * 네트워크 선택 옵션(라벨, 아이콘 등) 배열을 반환합니다.
 * @returns { key: string; label: string; icon: string }[]
 */
export function getNetworkOptions(): {
  key: string;
  label: string;
  icon: string;
}[] {
  return SUPPORTED_NETWORKS.map((n) => ({
    key: n.id,
    label: n.name,
    icon: n.icon,
  }));
}

/**
 * 네트워크 id로 RPC URL을 반환합니다.
 * @param id 네트워크 고유 id
 * @returns string | undefined
 */
export function getNetworkRpcUrl(id: string): string | undefined {
  return getNetworkById(id)?.rpcUrl;
}

/**
 * 네트워크의 networkVersion(10진수 string)을 반환합니다.
 * @param network NetworkConfig
 * @returns string
 */
export function getNetworkVersion(network: NetworkConfig): string {
  return String(network.chainId);
}

/**
 * 네트워크의 chainHex(0x-prefixed string)를 반환합니다.
 * @param network NetworkConfig
 * @returns string
 */
export function getChainHex(network: NetworkConfig): string {
  return network.chainHex;
}
