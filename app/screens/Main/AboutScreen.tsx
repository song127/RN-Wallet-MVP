import React from "react";
import { View, Text } from "react-native";

export default function AboutScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <View className="bg-white rounded-2xl p-6 w-[340px] shadow-md items-center">
        <Text className="text-2xl font-bold text-gray-900 mb-4">About</Text>
        <Text className="text-base text-gray-700 text-center">
          bifrost-wallet-copy v0.1.0{"\n"}[App info & OSS licenses placeholder]
        </Text>
      </View>
    </View>
  );
}
