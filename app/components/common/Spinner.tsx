import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

/**
 * 로딩 상태를 표시하는 Spinner 컴포넌트
 * @param size - Spinner 크기 (small, large)
 * @param color - Spinner 색상
 */
export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'large', 
  color = '#ffffff' 
}) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
