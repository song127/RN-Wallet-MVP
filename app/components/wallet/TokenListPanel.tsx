import React from "react";
import { View, Text, FlatList } from "react-native";
import { useTokenList } from "@/hooks/useTokenList";

interface Props {
  address: string;
}

export function TokenListPanel({ address }: Props) {
  const { tokens, loading, error } = useTokenList(address);

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
