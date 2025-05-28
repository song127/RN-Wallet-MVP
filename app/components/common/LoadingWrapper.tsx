import React from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { Spinner } from "@/components/common/Spinner";

interface LoadingWrapperProps {
  isLoading: boolean;
}

/**
 * 전체 로딩 상태를 표시하는 wrapper 컴포넌트
 * @param isLoading - 로딩 상태
 */
export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
}) => {
  return (
    <View className="absolute flex-1">
      <Modal transparent visible={isLoading} animationType="fade">
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner size="large" />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
