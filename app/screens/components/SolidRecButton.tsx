// 메뉴 버튼: 아이콘+라벨+onPress를 받는 재사용 컴포넌트
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface SolidRectButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export default function SolidRectButton({
  children,
  onPress,
}: SolidRectButtonProps) {
  return (
    <TouchableOpacity
      className="w-full px-4 py-4 mx-auto border rounded-lg border-primary"
      onPress={onPress}
    >
      <Text className="text-center text-bodyBold text-primary">{children}</Text>
    </TouchableOpacity>
  );
}
