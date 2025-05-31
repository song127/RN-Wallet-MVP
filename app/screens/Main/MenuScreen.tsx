// 홈(메뉴) 화면: 주요 메뉴 진입점 및 네트워크 정보, 로그아웃 기능 제공
// - 네비게이션 메뉴, 지원 네트워크, 로그아웃 등 메인 진입 역할
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useWalletStore } from "@/stores/walletStore";
import { getSupportedNetworks } from "@/utils/networkUtils";
import { ROOT_STACK, HOME_STACK } from "@/navigation/routes";
import MenuButton from "@/app/components/common/MenuButton";

export default function MenuScreen() {
  const navigation = useNavigation();
  const resetOnboarding = useOnboardingStore((s) => s.reset);
  const { clearWallet } = useWalletStore();
  const networks = getSupportedNetworks();

  // 로그아웃: 상태 초기화 및 온보딩으로 이동
  const handleLogout = () => {
    resetOnboarding();
    clearWallet();
    navigation.reset({
      index: 0,
      routes: [{ name: ROOT_STACK.Onboarding as never }],
    });
  };

  return (
    <View className="items-center flex-1 bg-white">
      {/* 메뉴 리스트 */}
      <View className="w-[340px] bg-white rounded-2xl pt-20 pb-2 mb-2">
        <MenuButton
          icon={
            <Ionicons
              name="settings-outline"
              size={22}
              color="primary"
              style={{ marginRight: 14 }}
            />
          }
          label="Settings"
          onPress={() => navigation.navigate(HOME_STACK.Settings as never)}
        />
        <MenuButton
          icon={
            <MaterialIcons
              name="info-outline"
              size={22}
              color="primary"
              style={{ marginRight: 14 }}
            />
          }
          label="About"
          onPress={() => navigation.navigate(HOME_STACK.About as never)}
        />
        <TouchableOpacity
          className="flex-row items-center justify-center px-2 py-4 mt-2 bg-white border border-red-500 rounded-lg"
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="red"
            style={{ marginRight: 14 }}
          />
          <Text className="ml-2 text-base font-semibold text-red-500">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      {/* Footer: 버전 및 지원 네트워크 */}
      <View className="items-center mt-4">
        <Text className="text-xs text-gray-400">
          bifrost-wallet-copy v0.1.0
        </Text>
        <Text className="mt-2 text-xs font-semibold text-gray-400">
          Supported Networks:
        </Text>
        <View className="flex-col flex-wrap items-center mt-0.5">
          {networks.map((n) => (
            <Text key={n.id} className="block mr-2 text-xs text-blue-600">
              {n.name} ({n.symbol})
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
