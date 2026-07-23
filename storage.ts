import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wish } from "./types";

const STORAGE_KEY = "@wishlist";

export async function getWishes(): Promise<Wish[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveWishes(wishes: Wish[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}
