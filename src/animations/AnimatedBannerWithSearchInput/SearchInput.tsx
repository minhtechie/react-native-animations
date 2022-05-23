import React from 'react';
import {StyleSheet, TextInputProps, TextInput, View, Image} from 'react-native';

export default (props: TextInputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#909090"
        autoFocus
        {...props}
      />
      <Image
        source={require('../../images/food-app/search.png')}
        style={styles.searchIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    justifyContent: 'center',
  },
  input: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    color: '#333',
  },
  searchIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 16,
  },
});
