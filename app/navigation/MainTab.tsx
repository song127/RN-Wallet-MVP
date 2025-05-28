import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WalletScreen from "@/app/screens/Main/WalletScreen";
import HistoryScreen from "@/screens/Main/HistoryScreen";
import MenuScreen from "@/screens/Main/MenuScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <React.Fragment>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Wallet") {
              return <Ionicons name="wallet" size={size} color={color} />;
            }
            if (route.name === "History") {
              return <Ionicons name="time-outline" size={size} color={color} />;
            }
            if (route.name === "Menu") {
              return <Ionicons name="menu" size={size} color={color} />;
            }
            return null;
          },
        })}
      >
        <Tab.Screen
          name="Wallet"
          options={{ headerShown: false }}
          component={WalletScreen}
        />
        <Tab.Screen
          name="History"
          options={{ headerShown: false }}
          component={HistoryScreen}
        />
        <Tab.Screen
          name="Menu"
          options={{ headerShown: false }}
          component={MenuScreen}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
}
