import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface TabBarProps {
  tab: "token" | "nft";
  onTabChange: (tab: "token" | "nft") => void;
}

/**
 * 토큰/NFT 탭 전환 UI 컴포넌트
 */
const TabBar: React.FC<TabBarProps> = ({ tab, onTabChange }) => (
  <View className="flex-row bg-gray-100 rounded-xl mb-6 w-[340px] justify-between p-1.5 h-14 items-center border-2 border-gray-200">
    <TouchableOpacity
      className={`flex-1 items-center justify-center rounded-lg h-11 mx-0.5 ${tab === "token" ? "bg-white" : ""}`}
      onPress={() => onTabChange("token")}
      activeOpacity={0.8}
    >
      <Text
        className={`text-base ${tab === "token" ? "font-bold text-gray-900" : "font-medium text-gray-600"}`}
      >
        토큰
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      className={`flex-1 items-center justify-center rounded-lg h-11 mx-0.5 ${tab === "nft" ? "bg-white" : ""}`}
      onPress={() => onTabChange("nft")}
      activeOpacity={0.8}
    >
      <Text
        className={`text-base ${tab === "nft" ? "font-bold text-gray-900" : "font-medium text-gray-600"}`}
      >
        NFT
      </Text>
    </TouchableOpacity>
  </View>
);

export default TabBar;
