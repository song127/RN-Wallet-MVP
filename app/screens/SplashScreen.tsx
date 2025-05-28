import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "@/navigation/types";
import { useWalletStore } from "@/stores/walletStore";
import { ROOT_STACK } from "@/navigation/routes";

export default function SplashScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { loadWallet } = useWalletStore();

  useEffect(() => {
    let mounted = true;

    const initializeWallet = async () => {
      try {
        await loadWallet();

        if (!mounted) return;
        if (useWalletStore.getState().address) {
          navigation.replace(ROOT_STACK.Home);
        } else {
          navigation.replace(ROOT_STACK.Onboarding);
        }
      } catch (error) {
        console.error("Failed to initialize wallet:", error);
        if (mounted) {
          navigation.replace(ROOT_STACK.Onboarding);
        }
      }
    };
    initializeWallet();

    return () => {
      mounted = false;
    };
  }, [navigation, loadWallet]);

  return (
    <View className="items-center justify-center flex-1">
      <ActivityIndicator size="large" />
    </View>
  );
}
