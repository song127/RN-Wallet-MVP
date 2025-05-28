import React from "react";
import { View, Text, FlatList } from "react-native";
import { useTokenListWithPlugin } from "@/hooks/useTokenListWithPlugin";
import { PluginRegistry } from "@/plugins/PluginRegistry";
import { exampleTokenPlugin } from "@/plugins/exampleTokenPlugin";

// 실제 앱에서는 registry를 context/singleton으로 관리
const registry = new PluginRegistry();

// 플러그인 등록 (앱 부트스트랩 시 1회만)
exampleTokenPlugin.register(registry);

interface Props {
  address: string;
}

export function TokenListPanelWithPlugin({ address }: Props) {
  const { tokens, loading, error } = useTokenListWithPlugin(address);

  if (loading) return <Text>Loading tokens...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!tokens.length) return <Text>No tokens found.</Text>;

  return (
    <View>
      <FlatList
        data={tokens}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <View style={{ padding: 8 }}>
            <Text>
              {item.symbol}: {item.balance}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
