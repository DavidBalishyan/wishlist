import "../global.css";
import { Tabs } from "expo-router";
import { WishProvider } from "../context/WishContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { CurrencyProvider } from "../context/CurrencyContext";

function TabLayout() {
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? "#e5e7eb" : "#111827",
        tabBarInactiveTintColor: isDark ? "#4b5563" : "#9ca3af",
        tabBarStyle: {
          backgroundColor: isDark ? "#111827" : "#ffffff",
          borderTopColor: isDark ? "#1f2937" : "#e5e7eb",
          height: 56,
          paddingBottom: 6,
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: isDark ? "#111827" : "#ffffff",
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: isDark ? "#f9fafb" : "#111827",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 17,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Wishlist",
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: "Done",
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <WishProvider>
          <TabLayout />
        </WishProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
