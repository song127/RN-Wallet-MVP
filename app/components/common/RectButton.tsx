// 메뉴 버튼: 아이콘+라벨+onPress를 받는 재사용 컴포넌트
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface RectButtonProps {
  active?: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export default function RectButton({
  active = true,
  onPress,
  children,
}: RectButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full px-4 py-4 mx-auto mb-3 rounded-lg ${active ? "bg-primary" : "bg-gray-300"}`}
      disabled={!active}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center min-h-[24px]">
        {children}
      </View>
    </TouchableOpacity>
  );
}
