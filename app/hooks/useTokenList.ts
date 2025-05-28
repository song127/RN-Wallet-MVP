// useTokenList: 도메인 서비스/포트/어댑터 DI 예시
import { useEffect, useState } from "react";
import { Token } from "@/domain/models/token";
import { TokenService } from "@/domain/services/TokenService";
import { TokenRepositoryAdapter } from "@/infra/adapters/TokenRepositoryAdapter";

// 실제 환경에서는 DI 컨테이너/플러그인 레지스트리에서 주입받도록 개선 가능
const tokenRepo = new TokenRepositoryAdapter();
const tokenService = new TokenService(tokenRepo);

export function useTokenList(address: string) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    tokenService
      .listTokens(address)
      .then(setTokens)
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, [address]);

  return { tokens, loading, error };
}
