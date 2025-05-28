// TokenRepositoryAdapter: 실제 저장소 구현 예시
import { TokenRepositoryPort } from "@/domain/ports/TokenRepositoryPort";
import { Token } from "@/domain/models/token";

export class TokenRepositoryAdapter implements TokenRepositoryPort {
  private db = new Map<string, Token[]>();

  async getTokens(address: string): Promise<Token[]> {
    return this.db.get(address) || [];
  }

  async saveToken(address: string, token: Token): Promise<void> {
    const tokens = this.db.get(address) || [];
    tokens.push(token);
    this.db.set(address, tokens);
  }
}
