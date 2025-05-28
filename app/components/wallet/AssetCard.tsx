import React from "react";
import { View, Text } from "react-native";

interface AssetCardProps {
  loading: boolean;
  assetUsd: string | null;
}

/**
 * 총 자산(USD) 표시 카드 컴포넌트
 */
const AssetCard: React.FC<AssetCardProps> = ({ loading, assetUsd }) => (
  <View className="bg-white rounded-xl p-6 w-[340px] shadow-sm items-center mt-6 mb-3">
    <Text className="text-sm font-medium text-gray-500 mb-1">총 자산</Text>
    <Text className="text-3xl font-semibold tracking-tight text-gray-900">
      {loading || assetUsd === null ? "-" : `$${assetUsd}`}
    </Text>
  </View>
);

export default AssetCard;
