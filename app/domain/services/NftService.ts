// NftService: 도메인 비즈니스 로직 예시
import { Nft } from "@/domain/models/nft";
import { NftRepositoryPort } from "@/domain/ports/NftRepositoryPort";

export class NftService {
  constructor(private readonly repo: NftRepositoryPort) {}

  async listNfts(address: string): Promise<Nft[]> {
    return this.repo.getNfts(address);
  }

  async addNft(address: string, nft: Nft): Promise<void> {
    // 비즈니스 규칙 예시: 중복 NFT 방지 등
    const nfts = await this.repo.getNfts(address);
    if (nfts.some((n) => n.tokenId === nft.tokenId))
      throw new Error("NFT already exists");
    await this.repo.saveNft(address, nft);
  }
}
