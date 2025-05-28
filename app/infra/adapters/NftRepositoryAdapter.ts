// NftRepositoryAdapter: 실제 저장소 구현 예시
import { NftRepositoryPort } from "@/domain/ports/NftRepositoryPort";
import { Nft } from "@/domain/models/nft";

export class NftRepositoryAdapter implements NftRepositoryPort {
  private db = new Map<string, Nft[]>();

  async getNfts(address: string): Promise<Nft[]> {
    return this.db.get(address) || [];
  }

  async saveNft(address: string, nft: Nft): Promise<void> {
    const nfts = this.db.get(address) || [];
    nfts.push(nft);
    this.db.set(address, nfts);
  }
}
