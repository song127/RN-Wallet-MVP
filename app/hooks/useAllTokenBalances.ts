import { useEffect, useState } from "react";
import { TokenConfig } from "@/config/tokens";
import useEthBalance from "@/hooks/useEthBalance";
import { ethers } from "ethers";

export function useAllTokenBalances(
  address: string | null,
  tokens: TokenConfig[],
  rpcUrl: string | undefined
) {
  const [balances, setBalances] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  // 네이티브 토큰 잔액
  const { balance: ethBalance, loading: loadingEth } = useEthBalance(
    address,
    rpcUrl
  );

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      setLoading(true);
      const results: Record<string, string | null> = {};
      await Promise.all(
        tokens.map(async (token) => {
          if (token.symbol === "ETH" || token.symbol === "BFC") {
            results[token.symbol] = ethBalance;
          } else {
            if (
              !address ||
              !rpcUrl ||
              !token.address ||
              token.address === "0x0"
            ) {
              results[token.symbol] = null;
              return;
            }
            try {
              const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
              const contract = new ethers.Contract(
                token.address,
                [
                  "function balanceOf(address owner) view returns (uint256)",
                  "function decimals() view returns (uint8)",
                ],
                provider
              );
              const bal = await contract.balanceOf(address);
              results[token.symbol] = ethers.utils.formatUnits(
                bal,
                token.decimals
              );
            } catch {
              results[token.symbol] = null;
            }
          }
        })
      );
      if (!cancelled) setBalances(results);
      setLoading(false);
    }
    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [address, tokens, rpcUrl, ethBalance]);

  return { balances, loading: loading || loadingEth };
}
