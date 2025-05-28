import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { HomeStackParamList } from "@/navigation/MainStack";

export default function SendNFTAddressScreen() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute();
  const [address, setAddress] = useState("");
  // nftId는 route.params에서 받음
  const { nftId } = route.params as { nftId: string };

  return (
    <View className="flex-1 bg-background p-6 items-center justify-center">
      <Text className="text-2xl font-bold text-text mb-6">받는 주소 입력</Text>
      <TextInput
        className="w-[280px] border border-border rounded-xl p-3.5 text-base mb-6 text-text bg-background"
        placeholder="0x..."
        value={address}
        onChangeText={setAddress}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        className={`w-[180px] bg-primary rounded-xl py-3.5 items-center ${!address ? "opacity-50" : ""}`}
        onPress={() => navigation.navigate("SendNFTAmount", { nftId, address })}
        disabled={!address}
      >
        <Text className="text-base font-bold text-textOnDark">다음</Text>
      </TouchableOpacity>
    </View>
  );
}
