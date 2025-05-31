// 니모닉 생성 화면: 네비게이션 버튼만 구현
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { OnboardingStackParamList } from "@/screens/Onboarding/OnboardingStack";
import { ethers } from "ethers";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { Ionicons } from "@expo/vector-icons";
import { useWalletStore } from "@/stores/walletStore";
import * as Clipboard from "expo-clipboard";
import { ONBOARDING_STACK } from "@/navigation/routes";
import RectButton from "@/app/components/common/RectButton";

export default function MnemonicCreateScreen() {
  const navigation =
    useNavigation<
      StackNavigationProp<OnboardingStackParamList, "MnemonicCreate">
    >();
  const setMnemonic = useOnboardingStore((s) => s.setMnemonic);
  const [address, setAddress] = useState<string>("");
  const [mnemonic, setMnemonicState] = useState<string>("");
  const { setWallet } = useWalletStore();
  const isLoading = !mnemonic || !address;

  useEffect(() => {
    const wallet = ethers.Wallet.createRandom();
    setAddress(wallet.address);
    if (wallet.mnemonic && wallet.mnemonic.phrase) {
      setMnemonic(wallet.mnemonic.phrase);
      setMnemonicState(wallet.mnemonic.phrase);
    }
  }, [setMnemonic]);

  const handleCopy = async () => {
    if (mnemonic) {
      await Clipboard.setStringAsync(mnemonic);
      Alert.alert("Copied", "Mnemonic copied to clipboard.");
    }
  };

  const handleNext = async () => {
    setWallet(address ?? "", mnemonic ?? "").then(() => {
      navigation.navigate(ONBOARDING_STACK.PinSetup);
    });
  };

  const mnemonicWords = mnemonic ? mnemonic.split(" ") : [];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-12 bg-white">
        <View className="items-center flex-grow px-6 pt-16 pb-8">
          <Text className="mb-6 text-2xl font-bold text-center text-black">
            Your new wallet mnemonic
          </Text>

          {/* 복사 버튼 */}
          <View className="flex-row justify-end w-full">
            <TouchableOpacity
              className="rounded-2xl p-1.5"
              onPress={handleCopy}
            >
              <Ionicons name="copy-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {/* mnemonic board */}
          <View className="items-center w-full mb-6">
            <View className="bg-surface rounded-2xl p-6 w-80 min-h-[180px] shadow-md mb-3 relative border border-black/10">
              {/* 3x4 그리드 */}
              <View className="flex-row flex-wrap items-center justify-between mt-2">
                {mnemonicWords.map((word, idx) => (
                  <View
                    className="w-[30%] flex-row items-center mb-3"
                    key={idx}
                  >
                    <Text className="text-xs text-gray-400 mr-1.5">
                      {idx + 1}.
                    </Text>
                    <Text className="text-base font-bold text-white">
                      {word}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <Text className="text-xs text-gray-400 text-center mt-0.5 mb-0.5">
              Write down your 12 words in order. This is the only way to recover
              your wallet.
            </Text>
          </View>

          <View className="h-4" />
          <RectButton onPress={handleNext}>
            <Text className="text-lg font-bold text-white">Next</Text>
          </RectButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
