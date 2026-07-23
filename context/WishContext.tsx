import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Wish, WishInput } from "../types";
import { getWishes, saveWishes } from "../storage";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

interface WishContextValue {
  wishes: Wish[];
  loading: boolean;
  addWish: (input: WishInput) => void;
  updateWish: (id: string, input: WishInput) => void;
  deleteWish: (id: string) => void;
  toggleComplete: (id: string) => void;
  restoreWish: (id: string) => void;
}

const WishContext = createContext<WishContextValue | null>(null);

export function WishProvider({ children }: { children: React.ReactNode }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWishes().then((data) => {
      setWishes(data);
      setLoading(false);
    });
  }, []);

  const persist = useCallback((updated: Wish[]) => {
    setWishes(updated);
    saveWishes(updated);
  }, []);

  const addWish = useCallback(
    (input: WishInput) => {
      const now = new Date().toISOString();
      const wish: Wish = {
        ...input,
        id: generateId(),
        completed: false,
        createdAt: now,
        updatedAt: now,
      };
      persist([wish, ...wishes]);
    },
    [wishes, persist]
  );

  const updateWish = useCallback(
    (id: string, input: WishInput) => {
      const updated = wishes.map((w) =>
        w.id === id ? { ...w, ...input, updatedAt: new Date().toISOString() } : w
      );
      persist(updated);
    },
    [wishes, persist]
  );

  const deleteWish = useCallback(
    (id: string) => {
      persist(wishes.filter((w) => w.id !== id));
    },
    [wishes, persist]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      const updated = wishes.map((w) =>
        w.id === id ? { ...w, completed: !w.completed, updatedAt: new Date().toISOString() } : w
      );
      persist(updated);
    },
    [wishes, persist]
  );

  const restoreWish = useCallback(
    (id: string) => {
      const updated = wishes.map((w) =>
        w.id === id ? { ...w, completed: false, updatedAt: new Date().toISOString() } : w
      );
      persist(updated);
    },
    [wishes, persist]
  );

  return (
    <WishContext.Provider
      value={{ wishes, loading, addWish, updateWish, deleteWish, toggleComplete, restoreWish }}
    >
      {children}
    </WishContext.Provider>
  );
}

export function useWishes(): WishContextValue {
  const ctx = useContext(WishContext);
  if (!ctx) throw new Error("useWishes must be used within WishProvider");
  return ctx;
}
