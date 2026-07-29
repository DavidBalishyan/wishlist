import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DEFAULT_CURRENCY, isCurrencyCode } from "../currency";
import type { CurrencyCode } from "../currency";

const CURRENCY_KEY = "@wishlist-currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const userChangedCurrency = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadCurrency() {
      try {
        const storedCurrency = await AsyncStorage.getItem(CURRENCY_KEY);
        if (
          isMounted &&
          !userChangedCurrency.current &&
          isCurrencyCode(storedCurrency)
        ) {
          setCurrencyState(storedCurrency);
        }
      } catch {
        // Keep the default currency when persisted preferences are unavailable.
      }
    }

    void loadCurrency();

    return () => {
      isMounted = false;
    };
  }, []);

  const setCurrency = useCallback((nextCurrency: CurrencyCode) => {
    userChangedCurrency.current = true;
    setCurrencyState(nextCurrency);
    void AsyncStorage.setItem(CURRENCY_KEY, nextCurrency).catch(() => {
      // The in-memory selection still applies for the current session.
    });
  }, []);


  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
