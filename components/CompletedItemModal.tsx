import { Modal, View, Text, TouchableOpacity } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onRestore: () => void;
  onDelete: () => void;
}

export default function CompletedItemModal({ visible, onClose, onRestore, onDelete }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/30">
        <View className="bg-white dark:bg-gray-900 rounded-lg p-5 w-4/5">
          <Text className="text-base font-medium text-gray-900 dark:text-white mb-4">
            What do you want to do?
          </Text>

          <TouchableOpacity
            className="py-3 rounded-lg bg-gray-900 dark:bg-white items-center mb-2"
            onPress={() => {
              onRestore();
              onClose();
            }}
          >
            <Text className="text-white dark:text-gray-900 text-sm font-medium">
              Move back to wishlist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3 rounded-lg border border-red-300 dark:border-red-800 items-center mb-3"
            onPress={() => {
              onDelete();
              onClose();
            }}
          >
            <Text className="text-red-500 text-sm font-medium">Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-2 items-center" onPress={onClose}>
            <Text className="text-gray-400 text-sm">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
