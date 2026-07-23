import { useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useWishes } from "../context/WishContext";
import { Wish } from "../types";
import WishItem from "../components/WishItem";
import CompletedItemModal from "../components/CompletedItemModal";

export default function CompletedScreen() {
  const { wishes, loading, deleteWish, restoreWish } = useWishes();
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);

  const completedWishes = wishes.filter((w) => w.completed);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-950">
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-950">
      {completedWishes.length === 0 ? (
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-gray-900 dark:text-white text-base font-medium mb-1">
            No completed wishes
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Check off items from your wishlist
          </Text>
        </View>
      ) : (
        <FlatList
          data={completedWishes}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-3 pt-2 pb-6"
          renderItem={({ item }) => (
            <WishItem
              wish={item}
              onToggleComplete={() => {
                setSelectedWish(item);
                setActionModalVisible(true);
              }}
              onPress={(w) => {
                setSelectedWish(w);
                setActionModalVisible(true);
              }}
            />
          )}
        />
      )}

      <CompletedItemModal
        visible={actionModalVisible}
        onClose={() => setActionModalVisible(false)}
        onRestore={() => {
          if (selectedWish) restoreWish(selectedWish.id);
        }}
        onDelete={() => {
          if (selectedWish) deleteWish(selectedWish.id);
        }}
      />
    </View>
  );
}
