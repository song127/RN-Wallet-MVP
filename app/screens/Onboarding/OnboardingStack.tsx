// 온보딩 플로우 Stack Navigator 구현
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "@/screens/Onboarding/WelcomeScreen";
import MnemonicCreateScreen from "@/screens/Onboarding/MnemonicCreateScreen";
import MnemonicImportScreen from "@/screens/Onboarding/MnemonicImportScreen";
import MnemonicVerifyScreen from "@/screens/Onboarding/MnemonicVerifyScreen";
import PinSetupScreen from "@/screens/Onboarding/PinSetupScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator<OnboardingStackParamList>();

// 온보딩 스택 네비게이션 파라미터 타입
export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  MnemonicCreate: undefined;
  MnemonicImport: undefined;
  MnemonicBackup: undefined;
  MnemonicVerify: undefined;
  PinSetup: undefined;
  Backup: undefined;
};

/**
 * 온보딩 플로우 Stack
 * - Welcome → MnemonicCreate/Import → Backup → Verify → PinSetup
 */
export default function OnboardingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerBackTitle: "",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0, // Android
          shadowOpacity: 0, // iOS
          borderBottomWidth: 0, // iOS
        },
        headerBackImage: ({ tintColor }: { tintColor: string }) => (
          <Ionicons
            name="chevron-back"
            size={28}
            color={tintColor ?? "#111"}
            style={{ marginLeft: 8 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MnemonicCreate" component={MnemonicCreateScreen} />
      <Stack.Screen name="MnemonicImport" component={MnemonicImportScreen} />
      <Stack.Screen name="MnemonicVerify" component={MnemonicVerifyScreen} />
      <Stack.Screen name="PinSetup" component={PinSetupScreen} />
    </Stack.Navigator>
  );
}
