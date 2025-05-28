import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { TokenConfig } from "@/config/tokens";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const useTokenBalance = (
  address: string | null,
  token: TokenConfig,
  rpcUrl: string | undefined
) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address || !rpcUrl || !token.address || token.address === "0x0") {
      setBalance(null);
      return;
    }
    setLoading(true);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
    contract
      .balanceOf(address)
      .then((bal: ethers.BigNumber) => {
        setBalance(ethers.utils.formatUnits(bal, token.decimals));
      })
      .catch(() => setBalance(null))
      .finally(() => setLoading(false));
  }, [address, rpcUrl, token]);

  return { balance, loading };
};

export default useTokenBalance;
