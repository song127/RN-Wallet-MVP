import { useState, useEffect } from "react";
import { ethers } from "ethers";

/**
 * ETH 잔액을 조회하는 커스텀 훅
 * @param address 지갑 주소
 * @param rpcUrl RPC 엔드포인트 URL
 * @returns { balance, loading }
 */
const useEthBalance = (address: string | null, rpcUrl: string | undefined) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!address || !rpcUrl) {
      setBalance(null);
      return;
    }
    setLoading(true);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    provider
      .getBalance(address)
      .then((bal) => {
        setBalance(ethers.utils.formatEther(bal));
      })
      .catch(() => setBalance(null))
      .finally(() => setLoading(false));
  }, [address, rpcUrl]);
  return { balance, loading };
};

export default useEthBalance;
