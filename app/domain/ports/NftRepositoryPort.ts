// NftRepositoryPort: NFT 관련 외부 의존성 추상화
import { Nft } from "@/domain/models/nft";

export interface NftRepositoryPort {
  getNfts(address: string): Promise<Nft[]>;
  saveNft(address: string, nft: Nft): Promise<void>;
}
