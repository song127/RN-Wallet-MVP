// 메뉴 버튼: 아이콘+라벨+onPress를 받는 재사용 컴포넌트
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

export default function MenuButton({ icon, label, onPress }: MenuButtonProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-4 px-2 border-b border-gray-200 bg-white rounded-lg mb-1"
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text className="text-base font-semibold text-gray-900 ml-2">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
