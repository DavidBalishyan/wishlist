import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { WishInput, Priority } from "../types";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (input: WishInput) => void;
  onDelete?: () => void;
  initial?: WishInput & { id?: string };
  title?: string;
}

const PRIORITIES: Priority[] = ["low", "medium", "high"];

const PRIORITY_STYLES: Record<Priority, { active: string; inactive: string }> = {
  low: { active: "bg-green-500", inactive: "border border-green-500/30" },
  medium: { active: "bg-yellow-500", inactive: "border border-yellow-500/30" },
  high: { active: "bg-red-500", inactive: "border border-red-500/30" },
};

export default function WishModal({ visible, onClose, onSave, onDelete, initial, title }: Props) {
  const [wishTitle, setWishTitle] = useState(initial?.title ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [imageUri, setImageUri] = useState(initial?.imageUri ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? "medium");

  useEffect(() => {
    if (visible) {
      setWishTitle(initial?.title ?? "");
      setPrice(initial?.price ?? "");
      setImageUri(initial?.imageUri ?? "");
      setLink(initial?.link ?? "");
      setNotes(initial?.notes ?? "");
      setPriority(initial?.priority ?? "medium");
    }
  }, [visible, initial]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!wishTitle.trim()) return;
    onSave({
      title: wishTitle.trim(),
      price: price.trim(),
      imageUri,
      link: link.trim(),
      notes: notes.trim(),
      priority,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/30"
      >
        <View className="bg-white dark:bg-gray-900 rounded-t-xl max-h-[85%]">
          <ScrollView contentContainerClassName="px-4 pt-3 pb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                {title ?? "New Wish"}
              </Text>
              <TouchableOpacity onPress={onClose} className="p-1">
                <Text className="text-gray-400 text-lg">Done</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-3"
              onPress={pickImage}
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} className="w-full h-full" />
              ) : (
                <View className="flex-1 justify-center items-center">
                  <Text className="text-xs text-gray-400">add image</Text>
                </View>
              )}
            </TouchableOpacity>

            {imageUri ? (
              <TouchableOpacity className="self-start mb-2" onPress={() => setImageUri("")}>
                <Text className="text-xs text-red-500">remove image</Text>
              </TouchableOpacity>
            ) : null}

            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 mt-1">
              Title
            </Text>
            <TextInput
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-[15px] text-gray-900 dark:text-white"
              value={wishTitle}
              onChangeText={setWishTitle}
              placeholder="What do you want?"
              placeholderTextColor="#999"
            />

            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 mt-3">
              Price
            </Text>
            <TextInput
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-[15px] text-gray-900 dark:text-white"
              value={price}
              onChangeText={setPrice}
              placeholder="$0.00"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />

            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 mt-3">
              Link
            </Text>
            <TextInput
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-[15px] text-gray-900 dark:text-white"
              value={link}
              onChangeText={setLink}
              placeholder="https://..."
              placeholderTextColor="#999"
              keyboardType="url"
              autoCapitalize="none"
            />

            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 mt-3">
              Notes
            </Text>
            <TextInput
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-[15px] text-gray-900 dark:text-white h-16 text-top"
              value={notes}
              onChangeText={setNotes}
              placeholder="optional notes"
              placeholderTextColor="#999"
              multiline
            />

            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 mt-3">
              Priority
            </Text>
            <View className="flex-row gap-2">
              {PRIORITIES.map((p) => (
                <TouchableOpacity
                  key={p}
                  className={`flex-1 py-2 rounded-lg items-center ${
                    priority === p ? PRIORITY_STYLES[p].active : PRIORITY_STYLES[p].inactive
                  }`}
                  onPress={() => setPriority(p)}
                >
                  <Text
                    className={`text-xs font-medium ${
                      priority === p ? "text-white" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {onDelete ? (
              <TouchableOpacity
                className="mt-5 py-3 rounded-lg border border-red-300 dark:border-red-800 items-center"
                onPress={onDelete}
              >
                <Text className="text-red-500 text-sm">Delete</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              className={`mt-3 py-3 rounded-lg items-center ${
                wishTitle.trim() ? "bg-gray-900 dark:bg-white" : "bg-gray-200 dark:bg-gray-700"
              }`}
              onPress={handleSave}
              disabled={!wishTitle.trim()}
            >
              <Text
                className={`text-sm font-medium ${
                  wishTitle.trim() ? "text-white dark:text-gray-900" : "text-gray-400"
                }`}
              >
                {initial?.id ? "Save" : "Add"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
