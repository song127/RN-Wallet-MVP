// 메인 기능(지갑, 트랜잭션 등) 전용 스택 네비게이터
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainTab from "@/navigation/MainTab";
import UniswapScreen from "@/screens/Uniswap/UniswapScreen";
import SendAssetSelectScreen from "@/screens/Send/SendAssetSelectScreen";
import { Ionicons } from "@expo/vector-icons";
import SendTokenListScreen from "@/screens/Send/SendTokenListScreen";
import SendTokenAddressScreen from "@/screens/Send/SendTokenAddressScreen";
import SendTokenAmountScreen from "@/screens/Send/SendTokenAmountScreen";
import SendTokenConfirmScreen from "@/screens/Send/SendTokenConfirmScreen";
import SendNFTListScreen from "@/screens/Send/SendNFTListScreen";
import SendNFTAddressScreen from "@/screens/Send/SendNFTAddressScreen";
import SendNFTAmountScreen from "@/screens/Send/SendNFTAmountScreen";
import SendNFTConfirmScreen from "@/app/screens/Send/SendNFTConfirmScreen";

export type HomeStackParamList = {
  MainTab: undefined;
  Uniswap: undefined;
  SendAssetSelect: { networkId: string };
  SendTokenList: { networkId: string };
  SendTokenAddress: { tokenId: string; networkId: string };
  SendTokenAmount: { tokenId: string; address: string; networkId: string };
  SendTokenConfirm: { txId: string; networkId: string };
  SendNFTList: { networkId: string };
  SendNFTAddress: { nftId: string; networkId: string };
  SendNFTAmount: { nftId: string; address: string; networkId: string };
  SendNFTConfirm: { txId: string; networkId: string };
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerShown: false,
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
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen
        name="Uniswap"
        component={UniswapScreen}
        options={{
          headerShown: true,
          title: "Uniswap",
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      />
      {/* Send Screens */}
      <Stack.Screen
        name="SendAssetSelect"
        component={SendAssetSelectScreen}
        options={{
          headerShown: true,
          title: "보낼 자산 선택",
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="SendTokenList"
        component={SendTokenListScreen}
        options={{
          headerShown: true,
          title: "보낼 토큰 선택",
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="SendTokenAddress"
        component={SendTokenAddressScreen}
        options={{
          headerShown: true,
          title: "받는 주소 입력",
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="SendTokenAmount"
        component={SendTokenAmountScreen}
        options={{
          headerShown: true,
          title: "보낼 자산 입력",
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="SendTokenConfirm"
        component={SendTokenConfirmScreen}
        options={{ headerLeft: () => null, gestureEnabled: false }}
      />
      <Stack.Screen
        name="SendNFTList"
        component={SendNFTListScreen}
        options={{
          headerShown: true,
          title: "보낼 NFT 선택",
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="SendNFTAddress"
        component={SendNFTAddressScreen}
        options={{
          headerShown: true,
          title: "받는 주소 입력",
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="SendNFTAmount"
        component={SendNFTAmountScreen}
        options={{
          headerShown: true,
          title: "보낼 자산 입력",
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="SendNFTConfirm"
        component={SendNFTConfirmScreen}
        options={{ headerLeft: () => null, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
