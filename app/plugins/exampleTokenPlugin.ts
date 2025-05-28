// 예시 플러그인: TokenRepositoryPort 구현을 동적으로 주입
import { Plugin, PluginRegistry } from "@/plugins/PluginRegistry";
import { TokenRepositoryPort } from "@/domain/ports/TokenRepositoryPort";
import { Token } from "@/domain/models/token";

class InMemoryTokenRepo implements TokenRepositoryPort {
  private db = new Map<string, Token[]>();
  async getTokens(address: string) {
    return this.db.get(address) || [];
  }
  async saveToken(address: string, token: Token) {
    const tokens = this.db.get(address) || [];
    tokens.push(token);
    this.db.set(address, tokens);
  }
}

export const exampleTokenPlugin: Plugin = {
  id: "example-token-plugin",
  register(reg: PluginRegistry) {
    reg.provide<TokenRepositoryPort>(
      "TokenRepositoryPort",
      new InMemoryTokenRepo()
    );
  },
};
