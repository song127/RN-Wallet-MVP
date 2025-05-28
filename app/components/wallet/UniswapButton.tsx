import React from "react";
import { Button } from "react-native";
import { isUniswapEnabled } from "@/config/featureFlags/example";

export function UniswapButton({ onPress }: { onPress: () => void }) {
  if (!isUniswapEnabled()) return null;
  return <Button title="Uniswap" onPress={onPress} />;
}
