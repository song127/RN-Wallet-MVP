// 온보딩 플로우 전용 스택 네비게이터
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "@/screens/Onboarding/WelcomeScreen";
import MnemonicCreateScreen from "@/screens/Onboarding/MnemonicCreateScreen";
import MnemonicImportScreen from "@/screens/Onboarding/MnemonicImportScreen";
import PinSetupScreen from "@/screens/Onboarding/PinSetupScreen";
import { Ionicons } from "@expo/vector-icons";
import { ONBOARDING_STACK } from "@/navigation/routes";

export type OnboardingStackParamList = {
  Welcome: undefined;
  MnemonicCreate: undefined;
  MnemonicImport: undefined;
  MnemonicVerify: undefined;
  PinSetup: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator
      initialRouteName={ONBOARDING_STACK.Welcome}
      screenOptions={{
        headerShown: true,
        headerBackTitle: "",
        headerTintColor: "black",
        headerBackImage: () => (
          <Ionicons
            name="chevron-back"
            size={28}
            color="#000"
            style={{ marginLeft: 8 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name={ONBOARDING_STACK.Welcome}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ONBOARDING_STACK.MnemonicCreate}
        component={MnemonicCreateScreen}
      />
      <Stack.Screen
        name={ONBOARDING_STACK.MnemonicImport}
        component={MnemonicImportScreen}
      />
      <Stack.Screen
        name={ONBOARDING_STACK.PinSetup}
        component={PinSetupScreen}
      />
    </Stack.Navigator>
  );
}
