import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { renderIcon } from "@/app/utils/helpers";

interface NetworkOption {
  key: string;
  icon: string;
  label: string;
}

interface NetworkSelectorProps {
  visible: boolean;
  options: NetworkOption[];
  selectedKey: string;
  onSelect: (key: string) => void;
  onClose: () => void;
}

/**
 * 네트워크 선택 모달/드롭다운 컴포넌트
 */
const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  visible,
  options,
  selectedKey,
  onSelect,
  onClose,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <Pressable
      className="items-center justify-end flex-1 bg-black/30"
      onPress={onClose}
    >
      <View className="bg-white rounded-t-xl pt-6 pb-8 w-full max-w-[400px] shadow-lg items-center">
        <View className="w-[92%] mb-4 relative h-10 flex-row items-center justify-center self-center">
          <Text className="text-xl font-semibold text-center text-gray-900">
            네트워크 선택
          </Text>
          <TouchableOpacity
            className="absolute top-0 right-0 p-2"
            onPress={onClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        {options.map((n) => (
          <TouchableOpacity
            key={n.key}
            className={`flex-row items-center py-4 px-6 w-[92%] rounded-lg mb-2 border border-gray-100 bg-white ${n.key === selectedKey ? "bg-gray-50" : ""}`}
            onPress={() => onSelect(n.key)}
            activeOpacity={0.85}
          >
            {renderIcon(
              n.icon,
              20,
              n.key === selectedKey ? "#111827" : "#6B7280"
            )}
            <Text
              className={`flex-1 text-base ${n.key === selectedKey ? "text-gray-900 font-semibold" : "text-gray-700 font-medium"}`}
            >
              {n.label}
            </Text>
            {n.key === selectedKey && (
              <Ionicons
                name="checkmark"
                size={20}
                color="#111827"
                style={{ marginLeft: 8 }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  </Modal>
);

export default NetworkSelector;
