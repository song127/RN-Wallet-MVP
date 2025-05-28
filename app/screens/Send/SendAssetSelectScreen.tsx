import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { HomeStackParamList } from "@/navigation/MainStack";
import { HOME_STACK } from "@/navigation/routes";
import { Ionicons } from "@expo/vector-icons";

export default function SendAssetSelectScreen() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute();
  const { networkId } = route.params as { networkId: string };

  return (
    <View className="items-center justify-center flex-1 px-4 bg-white">
      <TouchableOpacity
        className="flex-row items-center w-full px-6 py-6 mb-6 border shadow-lg max-w-260 bg-black/80 border-white/10 rounded-2xl"
        onPress={() =>
          navigation.navigate(HOME_STACK.SendTokenList, { networkId })
        }
        activeOpacity={0.85}
        style={{ transform: [{ scale: 1 }] }}
      >
        <Ionicons
          name="logo-bitcoin"
          size={28}
          color="#fff"
          style={{ marginRight: 16 }}
        />
        <Text className="text-lg font-semibold text-white">Token 보내기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center w-full px-6 py-6 mb-6 border shadow-lg max-w-260 bg-black/80 border-white/10 rounded-2xl"
        onPress={() =>
          navigation.navigate(HOME_STACK.SendNFTList, { networkId })
        }
        activeOpacity={0.85}
        style={{ transform: [{ scale: 1 }] }}
      >
        <Ionicons
          name="image-outline"
          size={28}
          color="#fff"
          style={{ marginRight: 16 }}
        />
        <Text className="text-lg font-semibold text-white">NFT 보내기</Text>
      </TouchableOpacity>
    </View>
  );
}
