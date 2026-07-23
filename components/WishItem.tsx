import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox } from "expo-checkbox";
import * as WebBrowser from "expo-web-browser";
import Animated, { Layout } from "react-native-reanimated";
import { Wish, Priority } from "../types";

interface Props {
  wish: Wish;
  onToggleComplete: (id: string) => void;
  onPress: (wish: Wish) => void;
}

const PRIORITY_DOT: Record<Priority, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export default function WishItem({ wish, onToggleComplete, onPress }: Props) {
  const openLink = async () => {
    if (wish.link) {
      await WebBrowser.openBrowserAsync(wish.link);
    }
  };

  return (
    <Animated.View layout={Layout.springify().damping(20).stiffness(250)}>
      <TouchableOpacity
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-2"
        onPress={() => onPress(wish)}
        activeOpacity={0.6}
      >
        <View className="flex-row items-center">
          <Checkbox
            value={wish.completed}
            onValueChange={() => onToggleComplete(wish.id)}
            color={wish.completed ? "#3b82f6" : undefined}
            className="mr-3"
          />

          <View className="flex-1">
            <View className="flex-row items-center mb-0.5">
              <View className={`w-1.5 h-1.5 rounded-full mr-2 ${PRIORITY_DOT[wish.priority]}`} />
              <Text
                className={`text-[15px] flex-1 ${
                  wish.completed
                    ? "text-gray-400 line-through dark:text-gray-500"
                    : "text-gray-900 dark:text-white"
                }`}
                numberOfLines={1}
              >
                {wish.title}
              </Text>
            </View>

            <View className="flex-row items-center gap-2 mt-0.5">
              {wish.link ? (
                <TouchableOpacity onPress={openLink}>
                  <Text className="text-xs text-blue-500">link</Text>
                </TouchableOpacity>
              ) : null}
              {wish.notes ? (
                <Text className="text-xs text-gray-400 flex-1" numberOfLines={1}>
                  {wish.notes}
                </Text>
              ) : null}
            </View>
          </View>

          {wish.price ? (
            <Text className="text-sm font-medium text-gray-900 dark:text-white ml-3">
              {wish.price}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
