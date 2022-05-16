import React from 'react';
import {View, StyleSheet} from 'react-native';

export default () => {
  return <View style={styles.line}></View>;
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#222222',
    opacity: 0.2,
    marginVertical: 15,
  },
});
