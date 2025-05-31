// 니모닉 임포트 화면: 불러오기 → PIN 설정로 바로 이동
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { OnboardingStackParamList } from "@/screens/Onboarding/OnboardingStack";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useWalletStore } from "@/stores/walletStore";
import { ethers } from "ethers";
import { ONBOARDING_STACK } from "@/navigation/routes";
import RectButton from "@/app/components/common/RectButton";

const WORD_COUNT = 12;

export default function MnemonicImportScreen() {
  const navigation =
    useNavigation<
      StackNavigationProp<OnboardingStackParamList, "MnemonicImport">
    >();
  const setMnemonic = useOnboardingStore((s) => s.setMnemonic);
  const [words, setWords] = useState<string[]>(Array(WORD_COUNT).fill(""));
  const { setWallet } = useWalletStore();

  // Paste 버튼 핸들러
  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    const normalized = text
      .replace(/[\n\r,]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const split = normalized.split(" ").slice(0, WORD_COUNT);
    setWords((prev) =>
      Array(WORD_COUNT)
        .fill("")
        .map((_, i) => split[i] || "")
    );
  };

  // 단어 직접 입력 핸들러
  const handleWordChange = (val: string, idx: number) => {
    setWords((prev) => {
      const next = [...prev];
      next[idx] = val.replace(/\s/g, "");
      return next;
    });
  };

  const handleImport = () => {
    const wallet = ethers.Wallet.fromMnemonic(words.join(" ").trim());
    setMnemonic(words.join(" ").trim());
    setWallet(wallet.address, words.join(" ").trim());
    navigation.navigate(ONBOARDING_STACK.PinSetup as never);
  };

  const isValid = words.every((w) => w.length > 0);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="items-center justify-center flex-grow px-8 py-8">
        <Text className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
          Import Wallet
        </Text>
        <Text className="mb-4 text-base font-normal leading-6 text-center text-gray-700">
          Paste or enter your 12-word mnemonic phrase below.
        </Text>
        <TouchableOpacity
          className="self-end mb-2.5 bg-gray-100 rounded-lg py-1.5 px-4"
          onPress={handlePaste}
        >
          <Text className="text-base font-semibold tracking-tight text-gray-900">
            Paste
          </Text>
        </TouchableOpacity>
        <View className="flex-row flex-wrap justify-center gap-2 mb-7">
          {words.map((word, i) => (
            <View key={i} className="w-[96px] m-1">
              <TextInput
                value={word}
                onChangeText={(val) => handleWordChange(val, i)}
                className="py-2 text-base font-medium text-center text-gray-900 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder={`${i + 1}`}
                placeholderTextColor="#B0B0B0"
                autoCapitalize="none"
                autoCorrect={false}
                textAlign="center"
              />
            </View>
          ))}
        </View>
        <RectButton onPress={handleImport} active={isValid}>
          <Text className="text-lg font-bold text-white">Continue</Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
}

const CARD_WIDTH = 340;
