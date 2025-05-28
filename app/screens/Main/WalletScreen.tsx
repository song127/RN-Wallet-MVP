import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  Animated,
  ToastAndroid,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { HomeStackParamList } from "@/navigation/MainStack";
import { useWalletStore } from "@/stores/walletStore";
import * as Clipboard from "expo-clipboard";
import { ethers } from "ethers";
import {
  getNetworkOptions,
  getNetworkByKey,
  getDefaultNetwork,
} from "@/utils/networkUtils";
import { HOME_STACK } from "@/navigation/routes";
import TokenRow from "@/components/wallet/TokenRow";
import NftRow from "@/components/wallet/NftRow";
import AssetCard from "@/components/wallet/AssetCard";
import ActionButtons from "@/components/wallet/ActionButtons";
import TabBar from "@/components/wallet/TabBar";
import NetworkSelector from "@/components/wallet/NetworkSelector";
import useEthBalance from "@/hooks/useEthBalance";
import useEthUsdPrice from "@/hooks/useEthUsdPrice";
import useNfts from "@/hooks/useNfts";
import { LoadingWrapper } from "@/components/common/LoadingWrapper";
import { renderIcon } from "@/app/utils/helpers";
import * as Keychain from "react-native-keychain";
import { KEYCHAIN_KEYS } from "@/config/keychain";
import { TokenConfig, TOKENS } from "@/config/tokens";
import type { SupportedNetworkId } from "@/config/networks";
import { Token } from "@/app/domain/models/token";
import { useAllTokenBalances } from "@/hooks/useAllTokenBalances";

const NETWORK_OPTIONS = getNetworkOptions();
const ETH_ICON_URL =
  "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png";

type Nft = {
  id?: { tokenId: string };
  tokenId?: string;
  media?: { gateway?: string }[];
  title?: string;
  metadata?: { name?: string };
  contract?: { address?: string };
};

export default function WalletScreen() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const [networkKey, setNetworkKey] = useState(
    getDefaultNetwork()?.id ?? NETWORK_OPTIONS[0].key
  );
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [tab, setTab] = useState<"token" | "nft">("token");
  const [tabAnim] = useState(new Animated.Value(0));
  const address = useWalletStore((s) => s.address);
  const [networkInfo, setNetworkInfo] = useState<{
    name: string;
    chainId: number;
    latestBlock: number;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isPageFocusRefreshing, setIsPageFocusRefreshing] = useState(false);
  const network = getNetworkByKey(networkKey);
  const { balance: ethBalance, loading: loadingEth } = useEthBalance(
    address,
    network?.rpcUrl
  );
  const {
    nfts,
    loading: loadingNfts,
    loadingMore: loadingNftsMore,
    hasNextPage,
    fetchNextPage,
    refreshNfts,
  } = useNfts(address, network);
  const ethUsdPrice = useEthUsdPrice();
  const totalAssetUsd =
    ethBalance && ethUsdPrice
      ? (parseFloat(ethBalance) * ethUsdPrice).toFixed(2)
      : null;
  const tokens = TOKENS[networkKey as SupportedNetworkId] || [];
  const { balances, loading: loadingTokenBalances } = useAllTokenBalances(
    address,
    tokens,
    network?.rpcUrl
  );

  useEffect(() => {
    const loadSavedNetwork = async () => {
      try {
        const savedNetwork = await Keychain.getGenericPassword({
          service: KEYCHAIN_KEYS.SelectedNetwork,
        });
        if (savedNetwork) {
          setNetworkKey(savedNetwork.username);
        }
      } catch (error) {
        console.error("Failed to load saved network:", error);
      }
    };
    loadSavedNetwork();
  }, []);

  const handleNetworkSelect = async (key: string) => {
    try {
      await Keychain.setGenericPassword(KEYCHAIN_KEYS.SelectedNetwork, key);
      setNetworkKey(key);
      setShowNetworkModal(false);
    } catch (error) {
      console.error("Failed to save network selection:", error);
      setNetworkKey(key);
      setShowNetworkModal(false);
    }
  };

  const refreshAllData = useCallback(async () => {
    setRefreshing(true);
    try {
      const rpcUrl = network?.rpcUrl;
      if (rpcUrl) {
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const net = await provider.getNetwork();
        const blockNumber = await provider.getBlockNumber();
        setNetworkInfo({
          name: net.name,
          chainId: Number(net.chainId),
          latestBlock: blockNumber,
        });
      } else {
        setNetworkInfo(null);
      }
      await refreshNfts();
    } catch (e) {
      setNetworkInfo(null);
    } finally {
      setRefreshing(false);
    }
  }, [network, refreshNfts]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const doRefresh = async () => {
        if (!address || !network) return;
        setIsPageFocusRefreshing(true);
        setRefreshing(true);
        try {
          const rpcUrl = network.rpcUrl;
          if (rpcUrl) {
            const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
            const net = await provider.getNetwork();
            const blockNumber = await provider.getBlockNumber();
            if (isActive) {
              setNetworkInfo({
                name: net.name,
                chainId: Number(net.chainId),
                latestBlock: blockNumber,
              });
            }
          } else {
            if (isActive) setNetworkInfo(null);
          }
          await refreshNfts();
        } catch (e) {
          if (isActive) setNetworkInfo(null);
        } finally {
          if (isActive) {
            setIsPageFocusRefreshing(false);
            setRefreshing(false);
          }
        }
      };
      doRefresh();
      return () => {
        isActive = false;
      };
    }, [address, network, refreshNfts])
  );

  const isRefreshing = refreshing || isPageFocusRefreshing;

  const handleTab = (type: "token" | "nft") => {
    setTab(type);
    Animated.timing(tabAnim, {
      toValue: type === "token" ? 0 : 1,
      duration: 220,
      useNativeDriver: false,
    }).start();
  };

  const handleCopy = () => {
    if (address) {
      Clipboard.setStringAsync(address);
      if (Platform.OS === "android") {
        ToastAndroid.show("Address copied", ToastAndroid.SHORT);
      } else {
        Alert.alert("Copied", "Address copied");
      }
    }
  };

  const handleEndReached = () => {
    // Remove unnecessary refresh
  };

  const handleTrade = () => {
    setIsPageFocusRefreshing(true);
    navigation.navigate(HOME_STACK.Uniswap as never);
  };

  const handleNftEndReached = () => {
    if (hasNextPage && !loadingNftsMore) {
      fetchNextPage();
    }
  };

  const tokenList: Token[] = tokens.map((token) => ({
    symbol: token.symbol,
    name: token.name,
    balance: balances[token.symbol] ?? null,
    icon: token.icon ?? "",
  }));

  const tokenKeyExtractor = (_item: Token, idx: number) => `token-${idx}`;
  const nftKeyExtractor = (item: Nft, idx: number) =>
    item.id?.tokenId || item.tokenId || idx.toString();

  const renderHeader = () => (
    <>
      <View className="w-full items-center pb-0.5  z-20">
        <TouchableOpacity
          className="w-[340px] self-center flex-row items-center justify-between py-4 px-5 mb-6 mt-6 border-2 border-gray-200 min-w-[200px] bg-white rounded-xl"
          onPress={() => setShowNetworkModal(true)}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            {renderIcon(network?.icon, 22, "#111827")}
            <Text className="text-base font-bold text-gray-900">
              {network?.name}
            </Text>
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            className="ml-2 text-gray-700"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-center py-4 mb-2 bg-white border-b-2 border-gray-200">
        <View className="flex-row items-center justify-center">
          <Text className="text-[15px] text-gray-800 font-semibold tracking-[0.1px] text-center">
            {address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "지갑 주소 없음"}
          </Text>
          <TouchableOpacity onPress={handleCopy} className="ml-2">
            <Ionicons name="copy-outline" size={20} className="text-gray-700" />
          </TouchableOpacity>
        </View>
      </View>
      <AssetCard
        loading={loadingEth || ethUsdPrice === null}
        assetUsd={totalAssetUsd}
      />
      <ActionButtons
        onSend={() => {
          setIsPageFocusRefreshing(true);
          navigation.navigate(HOME_STACK.SendAssetSelect, {
            networkId: networkKey,
          });
        }}
        onTrade={handleTrade}
      />
      <TabBar tab={tab} onTabChange={handleTab} />
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        {tab === "token" ? (
          <FlatList
            ListHeaderComponent={renderHeader}
            data={tokenList}
            renderItem={({ item }) => <TokenRow token={item} />}
            keyExtractor={tokenKeyExtractor}
            className="w-full"
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 32,
            }}
            onRefresh={refreshAllData}
            refreshing={isRefreshing}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              loadingEth || isRefreshing ? (
                <Text className="mt-4 text-sm font-medium text-center text-gray-500">
                  잔액 불러오는 중...
                </Text>
              ) : (
                <Text className="mt-4 text-sm font-medium text-center text-gray-500">
                  잔액이 없습니다
                </Text>
              )
            }
          />
        ) : (
          <FlatList
            ListHeaderComponent={renderHeader}
            data={nfts as Nft[]}
            renderItem={({ item }) => <NftRow nft={item} />}
            keyExtractor={nftKeyExtractor}
            className="w-full"
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 32,
            }}
            onRefresh={refreshAllData}
            refreshing={isRefreshing}
            onEndReached={handleNftEndReached}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              loadingNfts || isRefreshing ? (
                <Text className="mt-4 text-sm font-medium text-center text-gray-500">
                  NFT 불러오는 중...
                </Text>
              ) : nfts.length === 0 ? (
                <Text className="mt-4 text-sm font-medium text-center text-gray-500">
                  NFT가 없습니다{"\n"}아래로 당겨서 새로고침 해보세요.
                </Text>
              ) : null
            }
            ListFooterComponent={
              loadingNftsMore ? (
                <Text className="mt-4 text-sm font-medium text-center text-gray-500">
                  추가 NFT 불러오는 중...
                </Text>
              ) : null
            }
          />
        )}
      </View>
      <NetworkSelector
        visible={showNetworkModal}
        options={NETWORK_OPTIONS}
        selectedKey={networkKey}
        onSelect={handleNetworkSelect}
        onClose={() => setShowNetworkModal(false)}
      />
    </SafeAreaView>
  );
}
