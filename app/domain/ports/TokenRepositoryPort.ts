// TokenRepositoryPort: 토큰 관련 외부 의존성 추상화
import { Token } from "@/domain/models/token";

export interface TokenRepositoryPort {
  getTokens(address: string): Promise<Token[]>;
  saveToken(address: string, token: Token): Promise<void>;
}
