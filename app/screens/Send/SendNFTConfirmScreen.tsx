import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { HomeStackParamList } from "@/navigation/MainStack";

export default function SendNFTConfirmScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, "SendNFTConfirm">>();
  // nft, address 등은 route.params에서 받음 (예시)
  const { nft, address } = (route.params ?? {}) as {
    nft?: { id: string; name: string; desc: string; image: string };
    address?: string;
  };

  const handleSend = () => {
    // TODO: 실제 전송 로직 후 홈 등으로 이동
    navigation.reset({ index: 0, routes: [{ name: "MainTab" as never }] });
  };

  return (
    <View className="flex-1 bg-white p-6 items-center justify-center">
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        NFT 전송 확인
      </Text>
      <View className="flex-row items-center bg-gray-50 rounded-xl p-3 mb-4 w-64">
        {nft?.image && (
          <Image
            source={{ uri: nft.image }}
            className="w-12 h-12 rounded-lg bg-gray-200 mr-3"
          />
        )}
        <View className="flex-1 ml-3">
          <Text className="text-base font-bold text-gray-900">{nft?.name}</Text>
          <Text className="text-xs text-gray-500">{nft?.desc}</Text>
        </View>
      </View>
      <Text className="text-xs text-gray-400 mb-0.5">받는 주소</Text>
      <Text className="text-base text-gray-900 mb-4 text-center">
        {address}
      </Text>
      <TouchableOpacity
        className="w-44 bg-blue-600 rounded-xl py-3.5 items-center"
        onPress={handleSend}
      >
        <Text className="font-bold text-white text-lg">보내기</Text>
      </TouchableOpacity>
    </View>
  );
}
