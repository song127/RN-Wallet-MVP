// 앱 전체 네비게이션 구조를 담당하는 컴포넌트
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import type { RootStackParamList } from "@/navigation/types";
import SplashScreen from "@/screens/SplashScreen";
import OnboardingStack from "@/navigation/OnboardingStack";
import HomeStack from "@/navigation/MainStack";
import { ROOT_STACK } from "@/app/navigation/routes";

const RootStack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={ROOT_STACK.Splash}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name={ROOT_STACK.Splash} component={SplashScreen} />
        <RootStack.Screen
          name={ROOT_STACK.Onboarding}
          component={OnboardingStack}
        />
        <RootStack.Screen name={ROOT_STACK.Home} component={HomeStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
