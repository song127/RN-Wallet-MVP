// useTokenListWithPlugin: 플러그인 레지스트리 기반 DI 예시
import { useEffect, useState } from "react";
import { Token } from "@/domain/models/token";
import { TokenService } from "@/domain/services/TokenService";
import { PluginRegistry } from "@/plugins/PluginRegistry";
import { TokenRepositoryPort } from "@/domain/ports/TokenRepositoryPort";

// 실제 앱에서는 PluginRegistry를 싱글턴/컨텍스트로 관리
const registry = new PluginRegistry();

export function useTokenListWithPlugin(address: string) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    const repo = registry.use<TokenRepositoryPort>("TokenRepositoryPort");
    if (!repo) {
      setError("No TokenRepositoryPort bound");
      setLoading(false);
      return;
    }
    const service = new TokenService(repo);
    service
      .listTokens(address)
      .then(setTokens)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [address]);

  return { tokens, loading, error };
}
