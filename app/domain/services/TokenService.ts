// TokenService: 도메인 비즈니스 로직 예시
import { Token } from "@/domain/models/token";
import { TokenRepositoryPort } from "@/domain/ports/TokenRepositoryPort";

export class TokenService {
  constructor(private readonly repo: TokenRepositoryPort) {}

  async listTokens(address: string): Promise<Token[]> {
    return this.repo.getTokens(address);
  }

  async addToken(address: string, token: Token): Promise<void> {
    // 비즈니스 규칙 예시: 중복 토큰 방지 등
    const tokens = await this.repo.getTokens(address);
    if (tokens.some((t) => t.symbol === token.symbol))
      throw new Error("Token already exists");
    await this.repo.saveToken(address, token);
  }
}
