export type Nft = {
  id?: { tokenId: string };
  tokenId?: string;
  media?: { gateway?: string }[];
  title?: string;
  metadata?: { name?: string };
  contract?: { address?: string };
};
