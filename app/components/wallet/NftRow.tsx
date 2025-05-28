import React from "react";
import { View, Text, Image } from "react-native";
import { Nft } from "@/domain/models/nft";

interface NftRowProps {
  nft: Nft;
}

/**
 * NFT 1개를 렌더링하는 컴포넌트
 */
const NftRow: React.FC<NftRowProps> = ({ nft }) => (
  <View className="items-center w-full">
    <View className="flex-row items-center py-4 border-b-2 border-gray-200 bg-white rounded-xl mb-3 px-5 w-[340px]">
      <View className="items-center justify-center mr-4 overflow-hidden bg-gray-100 rounded-xl w-11 h-11">
        {nft.media && nft.media[0]?.gateway ? (
          <Image
            source={{ uri: nft.media[0].gateway }}
            className="rounded-xl w-11 h-11"
          />
        ) : null}
      </View>
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-900">
          {nft.title || nft.metadata?.name || "NFT"}
        </Text>
        <Text className="text-sm text-gray-600">
          {nft.contract?.address?.slice(0, 8)}...#
          {parseInt(nft.id?.tokenId || nft.tokenId || "0", 16)}
        </Text>
      </View>
    </View>
  </View>
);

export default NftRow;
