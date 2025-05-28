import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { HomeStackParamList } from '@/navigation/MainStack';

export default function SendNFTAmountScreen() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute();
  // TODO: 실제 입력/전송 로직 구현
  const handleSend = () => {
    // 예시: 전송 후 Confirm으로 스택 리셋
    navigation.reset({
      index: 0,
      routes: [{ name: 'SendNFTConfirm', params: { txId: 'dummy-tx-id' } }],
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>NFT 전송량 입력 및 전송</Text>
      <Button title="전송" onPress={handleSend} />
    </View>
  );
}
