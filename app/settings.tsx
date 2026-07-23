import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../context/ThemeContext";

type ThemeOption = "light" | "dark" | "system";

const THEME_OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950">
      <View className="px-4 pt-4">
        <View className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
          <Text className="text-xs font-medium text-gray-400 uppercase tracking-wide px-4 pt-3 pb-2">
            Theme
          </Text>

          {THEME_OPTIONS.map((opt, i) => (
            <TouchableOpacity
              key={opt.value}
              className={`flex-row items-center justify-between px-4 py-3 ${
                i < THEME_OPTIONS.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""
              }`}
              onPress={() => setTheme(opt.value)}
            >
              <Text className="text-[15px] text-gray-900 dark:text-white">{opt.label}</Text>
              {theme === opt.value ? (
                <Text className="text-gray-900 dark:text-white text-sm">✓</Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Text className="text-xs font-medium text-gray-400 uppercase tracking-wide px-4 pt-3 pb-2">
            Info
          </Text>

          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <Text className="text-[15px] text-gray-500 dark:text-gray-400">Version</Text>
            <Text className="text-[15px] text-gray-900 dark:text-white">1.0.0</Text>
          </View>

          <View className="flex-row justify-between items-center px-4 py-3">
            <Text className="text-[15px] text-gray-500 dark:text-gray-400">Built with</Text>
            <Text className="text-[15px] text-gray-900 dark:text-white">Expo + React Native</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
