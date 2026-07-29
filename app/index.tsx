import { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useWishes } from "../context/WishContext";
import { Wish, WishInput } from "../types";
import WishItem from "../components/WishItem";
import WishModal from "../components/WishModal";

export default function WishlistScreen() {
  const { wishes, loading, addWish, updateWish, deleteWish, toggleComplete } = useWishes();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWish, setEditingWish] = useState<Wish | null>(null);

  const openWishes = wishes.filter((w) => !w.completed);

  const handleSave = (input: WishInput) => {
    if (editingWish) {
      updateWish(editingWish.id, input);
    } else {
      addWish(input);
    }
  };

  const handleDelete = () => {
    if (editingWish) {
      deleteWish(editingWish.id);
      setModalVisible(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-950">
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-950">
      {openWishes.length === 0 ? (
        <Animated.View
          entering={FadeIn.duration(300)}
          className="flex-1 justify-center items-center px-8"
        >
          <Text className="text-gray-900 dark:text-white text-base font-medium mb-1">
            Nothing here yet
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Tap + to add something you want
          </Text>
        </Animated.View>
      ) : (
        <FlatList
          data={openWishes}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-3 pt-2 pb-20"
          renderItem={({ item }) => (
            <WishItem wish={item} onToggleComplete={toggleComplete} onPress={(w) => {
              setEditingWish(w);
              setModalVisible(true);
            }} />
          )}
        />
      )}

      <Animated.View entering={FadeIn.delay(100)} className="absolute bottom-5 right-5">
        <TouchableOpacity
          className="w-11 h-11 rounded-full bg-gray-900 dark:bg-white items-center justify-center"
          onPress={() => {
            setEditingWish(null);
            setModalVisible(true);
          }}
          activeOpacity={0.7}
        >
          <Text className="text-white dark:text-gray-900 text-xl leading-none mb-0.5">+</Text>
        </TouchableOpacity>
      </Animated.View>

      <WishModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        onDelete={editingWish ? handleDelete : undefined}
        initial={editingWish ?? undefined}
        existingWishes={wishes}
        title={editingWish ? "Edit" : "New wish"}
      />
    </View>
  );
}
