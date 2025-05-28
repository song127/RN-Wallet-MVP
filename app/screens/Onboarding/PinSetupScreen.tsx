// PIN 코드 설정 화면: 네비게이션 버튼만 구현
import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Keychain from "react-native-keychain";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "@/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROOT_STACK } from "@/navigation/routes";
import { Ionicons } from "@expo/vector-icons";
import { KEYCHAIN_KEYS } from "@/app/config/keychain";
import RectButton from "@/app/screens/components/RectButton";

export default function PinSetupScreen() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"pin" | "confirm">("pin");
  const [error, setError] = useState("");
  const [shakeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const inputRef = useRef<TextInput>(null);
  const [isKeychainAvailable, setIsKeychainAvailable] = useState(true);
  // 키패드 포커스용
  const pinBoxRef = useRef<View>(null);

  useEffect(() => {
    const checkKeychain = async () => {
      try {
        if (!Keychain.setGenericPassword)
          throw new Error("Keychain native module not available");
        setIsKeychainAvailable(true);
      } catch (error) {
        setIsKeychainAvailable(false);
        setError("Secure storage is not available on this device.");
      }
    };
    checkKeychain();
  }, []);

  // 흔들림 애니메이션
  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -1,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // PIN 입력/삭제 핸들러 (키패드)
  const handlePinPadInput = (num: string) => {
    if (step === "pin") {
      if (pin.length < 6) {
        setPin(pin + num);
        setError("");
      }
    } else {
      if (confirmPin.length < 6) {
        setConfirmPin(confirmPin + num);
        setError("");
      }
    }
  };
  const handlePinPadDelete = () => {
    if (step === "pin") {
      if (pin.length > 0) setPin(pin.slice(0, -1));
    } else {
      if (confirmPin.length > 0) setConfirmPin(confirmPin.slice(0, -1));
    }
    setError("");
  };

  // 네모칸 클릭 시 input 포커스
  const handleBoxPress = () => {
    inputRef.current?.focus();
  };

  // Next 버튼 핸들러 (step1 → step2)
  const handleNextStep = () => {
    setStep("confirm");
  };
  // PIN 저장
  const handleSavePin = async () => {
    if (!isKeychainAvailable) {
      alert("isKeychainAvailable");
      setError("Secure storage is not available on this device.");
      triggerShake();
      return;
    }
    if (pin.length !== 6 || confirmPin.length !== 6) {
      alert("Length");
      setError("PIN must be 6 digits.");
      triggerShake();
      return;
    }
    if (pin !== confirmPin) {
      alert("No Match");
      setError("PINs do not match.");
      triggerShake();
      return;
    }
    try {
      await Keychain.setGenericPassword("user", pin, {
        service: KEYCHAIN_KEYS.WalletPin,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      setError("");
      Alert.alert("Success", "PIN has been set successfully.");
      navigation.replace(ROOT_STACK.Home);
    } catch (e) {
      console.error(e);
      setError("Failed to save PIN. Please try again.");
      triggerShake();
    }
  };
  const isPinReady = pin.length === 6;
  const isConfirmReady = confirmPin.length === 6;
  // 단계별 안내
  const stepTitle =
    step === "pin" ? "Enter your 6-digit PIN" : "Confirm your PIN";
  const stepDesc =
    step === "pin"
      ? "This PIN protects your wallet. Never share it with anyone."
      : "Re-enter your PIN to confirm.";

  // 키패드 컴포넌트
  const PinPad = ({
    onPress,
    onDelete,
  }: {
    onPress: (n: string) => void;
    onDelete: () => void;
  }) => (
    <View className="w-full px-12 mt-2 mb-4">
      <View className="flex-row justify-between mb-2">
        {["1", "2", "3"].map((n) => (
          <TouchableOpacity
            key={n}
            className="flex-1 mx-1.5 h-14 bg-gray-100 rounded-2xl justify-center items-center"
            onPress={() => onPress(n)}
            accessibilityLabel={`PIN digit ${n}`}
          >
            <Text className="text-2xl font-semibold text-gray-900">{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row justify-between mb-2">
        {["4", "5", "6"].map((n) => (
          <TouchableOpacity
            key={n}
            className="flex-1 mx-1.5 h-14 bg-gray-100 rounded-2xl justify-center items-center"
            onPress={() => onPress(n)}
            accessibilityLabel={`PIN digit ${n}`}
          >
            <Text className="text-2xl font-semibold text-gray-900">{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row justify-between mb-2">
        {["7", "8", "9"].map((n) => (
          <TouchableOpacity
            key={n}
            className="flex-1 mx-1.5 h-14 bg-gray-100 rounded-2xl justify-center items-center"
            onPress={() => onPress(n)}
            accessibilityLabel={`PIN digit ${n}`}
          >
            <Text className="text-2xl font-semibold text-gray-900">{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row justify-between">
        <View className="flex-1 mx-1.5 h-14" />
        <TouchableOpacity
          className="flex-1 mx-1.5 h-14 bg-gray-100 rounded-2xl justify-center items-center"
          onPress={() => onPress("0")}
          accessibilityLabel="PIN digit 0"
        >
          <Text className="text-2xl font-semibold text-gray-900">0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 mx-1.5 h-14 bg-gray-100 rounded-2xl justify-center items-center"
          onPress={onDelete}
          accessibilityLabel="PIN delete"
        >
          <Ionicons name="backspace-outline" size={28} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // 입력 칸 렌더링 함수
  const renderPinBoxes = (
    value: string,
    isError: boolean,
    stepType: "pin" | "confirm"
  ) => {
    return (
      <TouchableWithoutFeedback onPress={handleBoxPress}>
        <Animated.View
          ref={pinBoxRef}
          className="flex-row justify-center items-center mb-2 min-h-[54px]"
          style={[
            isError && { marginBottom: 0 },
            {
              transform: [
                {
                  translateX: shakeAnim.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-8, 8],
                  }),
                },
              ],
            },
          ]}
        >
          {[...Array(6)].map((_, i) => {
            // 입력 중인 칸(다음 입력될 칸)에 초록색
            const isActive = value.length === i;
            return (
              <View
                key={i}
                className={`w-11 h-[54px] rounded-xl border-2 bg-white text-2xl text-center mx-1.5 flex justify-center items-center ${value[i] ? "border-blue-600" : "border-gray-300"} ${isActive ? "border-green-500" : ""} ${isError && step === stepType ? "border-red-500" : ""}`}
              >
                {value[i] ? (
                  <View className="w-3.5 h-3.5 rounded-full bg-gray-900" />
                ) : null}
              </View>
            );
          })}
          {/* TextInput은 숨김, 포커스만 */}
          <TextInput
            ref={inputRef}
            className="absolute opacity-0 w-0.5 h-0.5"
            value={value}
            editable={false}
            caretHidden
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="items-center justify-center flex-1 bg-white">
          <Ionicons
            name="lock-closed-outline"
            size={44}
            color={"#111111"}
            style={{ marginBottom: 18, marginTop: 32 }}
          />
          <Text className="text-xs text-gray-400 mb-1 mt-0.5">
            {step === "pin" ? "Step 1/2" : "Step 2/2"}
          </Text>
          <Text className="mb-2 text-2xl font-bold text-center text-gray-900">
            {stepTitle}
          </Text>
          <Text className="mb-4 text-base text-center text-gray-500">
            {stepDesc}
          </Text>
          {step === "pin"
            ? renderPinBoxes(pin, !!error, "pin")
            : renderPinBoxes(confirmPin, !!error, "confirm")}
          {error ? (
            <Text className="text-red-500 mt-0.5 mb-2 text-base text-center min-h-[22px]">
              {error}
            </Text>
          ) : (
            <View style={{ height: 22 }} />
          )}
          {/* 키패드 UI */}
          <PinPad onPress={handlePinPadInput} onDelete={handlePinPadDelete} />
          <View className="items-center w-full px-16 pb-6 mt-2">
            {step === "pin" ? (
              <RectButton active={isPinReady} onPress={handleNextStep}>
                <Text className="text-lg font-bold text-white">Next</Text>
              </RectButton>
            ) : (
              <RectButton active={isConfirmReady} onPress={handleSavePin}>
                <Text className="text-lg font-bold text-white">Save PIN</Text>
              </RectButton>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
