import { useState, useEffect } from "react";

/**
 * ETH-USD 시세를 CoinGecko에서 fetch하는 커스텀 훅
 * @returns price (number | null)
 */
const useEthUsdPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.ethereum?.usd) setPrice(Number(data.ethereum.usd));
      })
      .catch(() => setPrice(null));
  }, []);
  return price;
};

export default useEthUsdPrice;
