import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { HomeStackParamList } from "@/navigation/MainStack";
import { TOKENS } from "@/config/tokens";
import type { SupportedNetworkId } from "@/config/networks";

export default function SendTokenListScreen() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute();
  const { networkId = "ethereum" } = route.params as { networkId?: string };
  const tokens = TOKENS[networkId as SupportedNetworkId] ?? [];

  return (
    <View className="flex-1 p-6 bg-white">
      <FlatList
        data={tokens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center p-4 mb-4 bg-gray-100 rounded-xl"
            onPress={() =>
              navigation.navigate("SendTokenAddress", {
                tokenId: item.id,
                networkId,
              })
            }
          >
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">
                {item.name} ({item.symbol})
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
