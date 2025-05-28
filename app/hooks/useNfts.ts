import { useState, useEffect, useCallback } from "react";
import { NetworkConfig } from "@/config/networks";
import { ALCHEMY_API_KEY } from "@env";

/**
 * Alchemy NFT API를 사용해 NFT 목록 fetch (pagination 지원)
 * @param address 지갑 주소
 * @param network 네트워크 설정
 */
const useNfts = (
  address: string | null,
  network: NetworkConfig | undefined
) => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageKey, setPageKey] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  // 최초/네트워크 변경/주소 변경 시 전체 새로고침
  const fetchNfts = useCallback(async () => {
    if (!address || !network) {
      setNfts([]);
      setPageKey(null);
      setHasNextPage(false);
      return;
    }
    setLoading(true);
    try {
      const baseUrl =
        network.chainId === 1
          ? `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getNFTs/`
          : `https://eth-sepolia.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getNFTs/`;
      const res = await fetch(`${baseUrl}?owner=${address}`);
      const data = await res.json();
      setNfts(data.ownedNfts || []);
      setPageKey(data.pageKey || null);
      setHasNextPage(!!data.pageKey);
    } catch (e) {
      setNfts([]);
      setPageKey(null);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  }, [address, network]);

  // 추가 페이지 로딩
  const fetchNextPage = useCallback(async () => {
    if (!address || !network || !pageKey || loadingMore) return;
    setLoadingMore(true);
    try {
      const baseUrl =
        network.chainId === 1
          ? `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getNFTs/`
          : `https://eth-sepolia.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getNFTs/`;
      const res = await fetch(`${baseUrl}?owner=${address}&pageKey=${pageKey}`);
      const data = await res.json();
      setNfts((prev) => [...prev, ...(data.ownedNfts || [])]);
      setPageKey(data.pageKey || null);
      setHasNextPage(!!data.pageKey);
    } catch (e) {
      // 에러 시 pageKey 유지
    } finally {
      setLoadingMore(false);
    }
  }, [address, network, pageKey, loadingMore]);

  // pull-to-refresh
  const refreshNfts = useCallback(async () => {
    if (!address || !network) return;
    setRefreshing(true);
    try {
      await fetchNfts();
    } finally {
      setRefreshing(false);
    }
  }, [address, network, fetchNfts]);

  useEffect(() => {
    fetchNfts();
  }, [fetchNfts]);

  return {
    nfts,
    loading,
    loadingMore,
    refreshing,
    hasNextPage,
    fetchNextPage,
    refreshNfts,
  };
};

export default useNfts;
