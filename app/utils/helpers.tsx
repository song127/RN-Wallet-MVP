import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export function renderIcon(
  icon: string | undefined,
  size: number,
  color: string
) {
  const iconStyle = { marginRight: 12 };

  if (!icon) {
    return (
      <Ionicons
        name="help-circle-outline"
        size={size}
        color={color}
        style={iconStyle}
      />
    );
  }

  if (icon.startsWith("url:")) {
    return (
      <Image
        source={{ uri: icon.slice(4) }}
        style={{
          width: size,
          height: size,
          marginRight: 12,
          borderRadius: size / 2,
        }}
        resizeMode="contain"
      />
    );
  }

  const iconName = icon.startsWith("ion:")
    ? icon.slice(4)
    : "help-circle-outline";
  return (
    <Ionicons
      name={iconName as any}
      size={size}
      color={color}
      style={iconStyle}
    />
  );
}
