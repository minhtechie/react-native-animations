import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import SearchInput from './SearchInput';

type SearchModalProps = {
  visible: boolean;
  onClose: () => void;
};
export default function SearchModal({visible, onClose}: SearchModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.content}>
        <SafeAreaView />
        <SearchInput />
      </View>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
