import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Appearance } from "react-native";
import { colorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark" | "system";

const THEME_KEY = "@wishlist-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
  isDark: false,
});

function getSystemDark(): boolean {
  return Appearance.getColorScheme() === "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(() => getSystemDark());

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === "system") {
        setIsDark(colorScheme === "dark");
      }
    });
    return () => sub.remove();
  }, [theme]);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((stored) => {
      const t = (stored as Theme) || "system";
      setThemeState(t);
      applyTheme(t);
    });
  }, []);

  const applyTheme = (t: Theme) => {
    colorScheme.set(t === "system" ? "system" : t);
    if (t === "system") {
      setIsDark(getSystemDark());
    } else {
      setIsDark(t === "dark");
    }
  };

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    AsyncStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
