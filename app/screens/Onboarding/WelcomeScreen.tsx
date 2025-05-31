// 온보딩 시작/환영 화면: 네비게이션 버튼만 구현
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { OnboardingStackParamList } from "@/screens/Onboarding/OnboardingStack";
import { ONBOARDING_STACK } from "@/navigation/routes";
import SolidRectButton from "@/app/components/common/SolidRecButton";
import RectButton from "@/app/components/common/RectButton";

export default function WelcomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<OnboardingStackParamList, "Welcome">>();

  return (
    <View className="relative flex-1 px-16 bg-background">
      {/* 상단: 로고/앱명 - 항상 최상단 고정 */}
      <View className="absolute inset-x-0 items-center justify-center pt-[100px]">
        <Text className="text-center text-h1 text-text">MVP Wallet</Text>
      </View>
      {/* 중앙: 안내/버튼 - 화면 정중앙 */}
      <View className="items-center justify-center flex-1">
        <View className="w-full space-y-4">
          <Text className="mb-6 text-center text-body text-textSecondary">
            Your secure Web3 gateway
          </Text>
          <RectButton
            onPress={() => navigation.navigate(ONBOARDING_STACK.MnemonicCreate)}
          >
            <Text className="text-lg font-bold text-white">Create Wallet</Text>
          </RectButton>
          <SolidRectButton
            onPress={() => navigation.navigate(ONBOARDING_STACK.MnemonicImport)}
          >
            Import Wallet
          </SolidRectButton>
        </View>
      </View>
    </View>
  );
}
