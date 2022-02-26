import React from 'react';
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import SearchInput from './SearchInput';

type SearchModalProps = {
  visible: boolean;
  onClose: () => void;
};
export default function SearchModal({visible, onClose}: SearchModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.content}>
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
    height: 100,
    paddingHorizontal: 16,
    paddingTop: 16 + getStatusBarHeight(),
    backgroundColor: 'white',
  },
});
