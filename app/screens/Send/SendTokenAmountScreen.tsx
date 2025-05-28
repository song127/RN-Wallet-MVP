import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { HomeStackParamList } from "@/navigation/MainStack";
import { HOME_STACK } from "@/app/navigation/routes";
import RectButton from "@/app/screens/components/RectButton";
import { useWalletStore } from "@/stores/walletStore";
import useEthBalance from "@/hooks/useEthBalance";
import { getNetworkByKey } from "@/utils/networkUtils";
import { ethers } from "ethers";
import { Spinner } from "@/components/common/Spinner";

export default function SendTokenAmountScreen() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute();
  const { tokenId, address, networkId } = route.params as {
    tokenId: string;
    address: string;
    networkId: string;
  };
  const walletAddress = useWalletStore((s) => s.address);
  const network = getNetworkByKey(networkId);
  const { balance, loading: loadingEth } = useEthBalance(
    walletAddress,
    network?.rpcUrl
  );
  const { mnemonic } = useWalletStore();
  const [amount, setAmount] = useState("");
  const fee = "0.001";
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!mnemonic || !network?.rpcUrl) return;
    setLoading(true);
    setTimeout(async () => {
      try {
        const wallet = ethers.Wallet.fromMnemonic(mnemonic).connect(
          new ethers.providers.JsonRpcProvider(network.rpcUrl)
        );
        const tx = await wallet.sendTransaction({
          to: address,
          value: ethers.utils.parseEther(amount),
        });
        await tx.wait();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: HOME_STACK.SendTokenConfirm,
              params: { txId: tx.hash, networkId },
            },
          ],
        });
      } catch (e: any) {
        Alert.alert("전송 실패", e?.message || "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    }, 0);
  };

  return (
    <View className="items-center justify-center flex-1 px-12 bg-white">
      <Text className="mb-4 text-2xl font-bold text-gray-900">수량 입력</Text>
      <Text className="mb-2 text-base text-gray-500">
        보유: {loadingEth ? "불러오는 중..." : (balance ?? "-")}
      </Text>
      <TextInput
        className="w-full px-4 py-4 mb-8 text-base text-right text-black bg-white border border-black rounded-xl"
        placeholder="보낼 수량"
        placeholderTextColor="#A3A3A3"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
      />
      <Text className="mb-8 text-xs text-gray-400">예상 수수료: {fee} ETH</Text>
      <RectButton active={!!amount && !loading} onPress={handleSend}>
        <Text className="text-lg font-bold text-white">
          {loading ? <Spinner size="small" color="#fff" /> : "보내기"}
        </Text>
      </RectButton>
    </View>
  );
}
