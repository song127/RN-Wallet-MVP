import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ActionButtonsProps {
  onSend: () => void;
  onTrade: () => void;
}

/**
 * 보내기/거래하기 등 주요 액션 버튼 컴포넌트
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({ onSend, onTrade }) => (
  <View className="w-[340px] mb-4">
    <View className="flex-row justify-between w-full gap-4">
      <TouchableOpacity
        className="flex-1 items-center py-3 rounded-lg bg-white border border-gray-100 mx-1 shadow-sm"
        activeOpacity={0.8}
        onPress={onSend}
      >
        <View className="w-12 h-12 rounded-lg bg-gray-50 items-center justify-center mb-2">
          <Ionicons name="arrow-up" size={24} color="#374151" />
        </View>
        <Text className="text-gray-900 font-medium text-base">보내기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center py-3 rounded-lg bg-white border border-gray-100 mx-1 shadow-sm"
        activeOpacity={0.8}
        onPress={onTrade}
      >
        <View className="w-12 h-12 rounded-lg bg-gray-50 items-center justify-center mb-2">
          <Ionicons name="swap-horizontal" size={24} color="#374151" />
        </View>
        <Text className="text-gray-900 font-medium text-base">거래하기</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ActionButtons;
