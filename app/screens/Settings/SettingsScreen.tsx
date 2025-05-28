import React from "react";
import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <View className="bg-surface border border-gray-200 rounded-2xl p-8 w-80 shadow-md">
        <Text className="text-2xl font-bold mb-6">Settings</Text>
        <Text className="text-base">
          [Network selection and app settings placeholder]
        </Text>
      </View>
    </View>
  );
}
