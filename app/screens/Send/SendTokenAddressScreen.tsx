import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { HomeStackParamList } from "@/navigation/MainStack";
import { HOME_STACK } from "@/app/navigation/routes";
import RectButton from "@/app/components/common/RectButton";

export default function SendTokenAddressScreen() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute();
  const [address, setAddress] = useState("");
  // tokenId는 route.params에서 받음
  const { tokenId, networkId } = route.params as {
    tokenId: string;
    networkId: string;
  };

  return (
    <View className="items-center justify-center flex-1 px-8 bg-white">
      <TextInput
        className="w-full px-4 py-4 mb-8 text-base text-black bg-white border border-black rounded-xl"
        placeholder="0x..."
        placeholderTextColor="#A3A3A3"
        value={address}
        onChangeText={setAddress}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <RectButton
        active={!!address}
        onPress={() =>
          navigation.navigate(HOME_STACK.SendTokenAmount, {
            tokenId,
            address,
            networkId,
          })
        }
      >
        <Text className="text-lg font-bold text-white">Next</Text>
      </RectButton>
    </View>
  );
}
