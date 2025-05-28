import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { HomeStackParamList } from "@/navigation/MainStack";
import { Ionicons } from "@expo/vector-icons";
import { HOME_STACK, MAIN_TAB, ROOT_STACK } from "@/app/navigation/routes";

export default function SendTokenConfirmScreen() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, "SendTokenConfirm">>();

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ROOT_STACK.Home as never }],
    });
  };

  return (
    <View className="items-center justify-center flex-1 px-8 bg-black">
      <View className="items-center justify-center bg-white rounded-2xl px-8 py-10 shadow-lg w-full max-w-[340px]">
        <Ionicons
          name="checkmark-circle"
          size={72}
          color="#111"
          className="mb-4"
        />
        <Text className="mb-2 text-2xl font-bold text-black">전송 완료!</Text>
        <Text className="mb-8 text-base text-center text-gray-700">
          토큰이 성공적으로 전송되었습니다.
        </Text>
        <TouchableOpacity
          className="w-44 bg-black rounded-xl py-3.5 items-center border border-gray-900"
          onPress={handleGoHome}
          activeOpacity={0.85}
        >
          <Text className="text-lg font-bold text-white">홈으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
