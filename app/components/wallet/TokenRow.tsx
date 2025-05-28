import React from "react";
import { View, Text, Image } from "react-native";
import { Token } from "@/domain/models/token";

interface TokenRowProps {
  token: Token;
}

/**
 * 토큰 1개를 렌더링하는 컴포넌트
 */
const TokenRow: React.FC<TokenRowProps> = ({ token }) => (
  <View className="flex-row items-center py-4 border-b-2 border-gray-200 bg-white rounded-xl mb-3 px-5 w-[340px]">
    {token.icon ? (
      <Image
        className="mr-4 bg-gray-100 rounded-full w-11 h-11"
        resizeMode="contain"
        source={{
          uri: token.icon,
        }}
      />
    ) : (
      <View className="mr-4 bg-gray-100 rounded-full w-11 h-11" />
    )}
    <View style={{ flex: 1 }}>
      <Text className="text-base font-bold text-gray-900">{token.symbol}</Text>
      <Text className="text-sm text-gray-600">{token.name}</Text>
    </View>
    <View style={{ alignItems: "flex-end" }}>
      <Text className="text-base font-bold text-gray-900">
        {token.balance ?? "-"}
      </Text>
    </View>
  </View>
);

export default TokenRow;
